import { readFile } from 'node:fs/promises';
import * as path from 'path';
import dynDb from './dynamo.util.js';
import { CreateTableCommand, type CreateTableCommandInput } from "@aws-sdk/client-dynamodb";

const getPathFile = (fileName: string) => path.join("docker", "dynamodb", fileName);

const getDataTable = async (pathFile: string) => JSON.parse(await readFile(pathFile, "utf8"));

const pathFile: string = getPathFile("init.json");
const dataTable: CreateTableCommandInput = await getDataTable(pathFile);

const createTable = async (input: CreateTableCommandInput) => {
  try {
    const command = new CreateTableCommand(input);
    await dynDb.send(command)
    console.log("Table created successfully")
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createTable(dataTable);