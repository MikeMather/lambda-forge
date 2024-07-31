import * as AWS from 'aws-sdk';

export type ScanQuery = Omit<AWS.DynamoDB.DocumentClient.ScanInput, 'TableName'>;

export type GetItemQuery = Omit<AWS.DynamoDB.DocumentClient.GetItemInput, 'TableName'>;

export type PutItemQuery = Omit<AWS.DynamoDB.DocumentClient.PutItemInput, 'TableName'>;

export type QueryQuery = Omit<AWS.DynamoDB.DocumentClient.QueryInput, 'TableName'>;