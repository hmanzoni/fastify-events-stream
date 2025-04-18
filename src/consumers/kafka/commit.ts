import { Consumer } from "kafkajs";
import { logError, logInfo } from "../../utils/logger.util.js";
import { CommitData } from "../../types/common/consumer.js";

export const commitTopic = async (consumer: Consumer, commitData: CommitData) => {
  const { topic, partition, offset } = commitData;
  const newOffset: string = (Number(offset) + 1).toString();
  try {
    await consumer.commitOffsets([{ topic, partition, offset: newOffset }]);
    logInfo("Topic commited successfully");
  } catch (err) {
    logError("Error commitTopic: ");
    console.error(err);
    throw err;
  }
};