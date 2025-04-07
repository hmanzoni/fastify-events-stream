import { Kafka, type Consumer } from "kafkajs";
import { kafkaConfig } from "../config/kafka.config.js";
import { registerUser } from "../services/users.service.js";
import { saveLogs } from "../services/logs.service.js";
import { createEvent } from "../services/eventsDyn.service.js";
import { insertEvent } from "../services/eventsCh.service.js";

const kafka: Kafka = new Kafka({
  clientId: kafkaConfig.appName_1,
  brokers: [`${kafkaConfig.host_1}:${kafkaConfig.port_1}`],
});

const kafkaConsumer = async (groupName: string | undefined) => {
  // Crear una instancia del consumidor
  const consumer: Consumer = kafka.consumer({
    groupId: groupName || "default",
  });
  try {
    // Conectar el consumidor al broker de Kafka
    await consumer.connect();
    console.log("Consumidor conectado - 🔗");

    // Suscribirse al tópico
    // fromBeginning: true - atributo para leer mensajes desde el inicio
    await consumer.subscribe({
      topic: kafkaConfig.topicEvent_1,
      fromBeginning: true,
    });
    console.log("Suscrito al tópico - 📥");

    // Ejecutar el consumidor y procesar mensajes
    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        const offset = (Number(message.offset) + 1).toString();
        await kafkaConsumerHandler(message);
        await consumer.commitOffsets([{ topic, partition, offset }]);
      },
    });
  } catch (err) {
    console.error("Error en el consumidor:", err);
  }
};

const kafkaConsumerHandler = async (message: any) => {
  if (!message.value) return;
  const eventValue = JSON.parse(message.value.toString());
  const action_type = eventValue?.action_type;
  let resp = null;
  let userId = null;

  // Procesar acción: crear usuario
  if (action_type === "create_user") {
    const { username, password_hash, email } = eventValue;
    userId = username;
    try {
      resp = await registerUser({ username, password_hash, email });
    } catch (err: any) {
      if (err.message.includes("User already exists")) {
        console.warn("🟡 Usuario ya existía, continuando...");
      } else {
        throw err;
      }
    }
  }

  // Procesar acción: guardar logs
  if (action_type === "save_logs") {
    const { event_type, user_id, metadata } = eventValue;
    userId = user_id;
    try {
      resp = await saveLogs({ event_type, user_id, metadata });
    } catch (error) {
      throw error;
    }
    try {
      const respDyn = await createEvent(event_type, user_id);
      console.log("Respuesta de Dyn:", respDyn);
    } catch (error) {
      throw error;
    }
  }

  // Insertar evento en ClickHouse
  try {
    const respCh = await insertEvent([
      {
        event_type: action_type,
        user_id: userId,
        metadata: JSON.stringify(eventValue),
      },
    ]);
    console.log("Respuesta de ClickHouse:", respCh);
  } catch (error) {
    throw error;
  }

  // Log de procesamiento
  console.log({
    offset: message.offset,
    action_type,
    response: resp,
    metadata: JSON.stringify(eventValue),
  });
};

// Iniciar el consumidor con un grupo de prueba
kafkaConsumer("test_group");