import "reflect-metadata";
import { Service } from "lambda-forge";
import * as AWS from 'aws-sdk';
import * as types from '../types/database';

const TABLE_NAME = "example-blog-app";

@Service
export default class DatabaseService {

  public dbClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

  constructor() {
  }

  public scan(params: types.ScanQuery = {}) {
    const defaultParams: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: TABLE_NAME,
      ...params
    };
    return this.dbClient.scan({ ...defaultParams, ...params }).promise();
  }

  public query(params: types.QueryQuery) {
    const defaultParams: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: TABLE_NAME,
      ...params
    };
    return this.dbClient.query({ ...defaultParams, ...params }).promise();
  }

  public put(params: types.PutItemQuery) {
    const defaultParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: TABLE_NAME,
      ...params
    };
    return this.dbClient.put({ ...defaultParams, ...params }).promise();
  }
}