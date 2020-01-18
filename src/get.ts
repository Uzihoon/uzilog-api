import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';
import { Context } from 'aws-lambda';

interface Result {
  Item: any;
}

export async function main(event: any, context: Context) {
  const params = {
    TableName: process.env.tableName as string,
    Key: {
      userId: event.requestContext.identity.cognitsoIdentityId,
      analysisId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('get', params) as Result;

    if (result.Item) return success(result.Item);
    return failure({ status: false, error: 'Item not found.' });
  } catch (e) {
    console.error(e);
    return failure({ status: false });
  }
}
