import { v1 } from 'uuid';
import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';
import { Context } from 'aws-lambda';

export async function main(event: any, context: Context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      postId: v1(),
      content: data.content,
      createdAt: Date.now(),
      title: data.title,
      desc: data.desc,
      tag: data.tag,
    },
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
