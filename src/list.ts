import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';
import { Context } from 'aws-lambda';

interface Result {
  Items: any;
}

export async function main(event: any, context: Context) {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const result = await dynamoDbLib.call('query', params) as Result;
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
