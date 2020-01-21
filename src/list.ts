import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';
import { Context } from 'aws-lambda';
import { IPost } from './types';

interface Result {
  Items: any;
}

export async function main(event: any, context: Context) {
  const params = {
    TableName: process.env.tableName,
  };

  try {
    const result = (await dynamoDbLib.call('scan', params)) as Result;
    const item = result.Items.map((item: IPost) =>
      Object.keys(item)
        .filter(k => k !== 'content')
        .reduce((res, key) => ((res[key] = item[key]), res), {}),
    );
    return success(item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
