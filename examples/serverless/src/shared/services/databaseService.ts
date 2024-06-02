import "reflect-metadata";
import { Service } from "lambda-forge";
import * as AWS from 'aws-sdk';

const TABLE_NAME = "example-blog-app";

@Service
export default class DatabaseService {

  public dbClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

  constructor() {
  }

  public scan(params: AWS.DynamoDB.DocumentClient.ScanInput | undefined) {
    const defaultParams: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: TABLE_NAME
    };
    return this.dbClient.scan({ ...defaultParams, ...params }).promise();
  }

  // public get(params: AWS.DynamoDB.DocumentClient.GetItemInput) {
  //   const defaultParams: AWS.DynamoDB.DocumentClient.GetItemInput = {
  //     TableName: TABLE_NAME
  //   };
  //   return this.dbClient.get({ ...defaultParams, ...params }).promise();
  // }
}