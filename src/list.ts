import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';
import { Context } from 'aws-lambda';

interface Result {
  Items: any;
}

export async function main(event: any, context: Context) {
  const params = {
    TableName: process.env.tableName,
  };

  try {
    const result = (await dynamoDbLib.call('scan', params)) as Result;
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
