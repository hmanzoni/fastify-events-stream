import { readFile } from 'node:fs/promises';
import path from 'node:path';
import dynDb from "../../src/utils/dynamo.util.js";

const pathFile = path.join("docker", "dynamodb", "init.json");
let data = JSON.parse(await readFile(pathFile, "utf8"));

await dynDb.createTable(data)
  .then(() => console.log("Table created successfully"))
  .catch((error) => console.error("Error creating table:", error));
