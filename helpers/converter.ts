/// <reference types="aws-sdk" />
import { dynamodb } from '../lib/config';
import { CreateTableCommand } from '@aws-sdk/client-dynamodb';

// function putWordInDynamo(wordDef) {
//   const {pos,word,defenition}=wordDef
//   const params = {
//     Item: {
//      "word": {
//        S: word
//       },
//      "pos": {
//        S:pos
//       },
//      "defenition": {
//        S: defenition
//       }
//     },
//     ReturnConsumedCapacity: "INDEXES",
//     TableName: "Dictionary"
//    };
//    ddbClient.putItem(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });
// }

const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'word',
      AttributeType: 'S',
    },
    {
      AttributeName: 'pos',
      AttributeType: 'S',
    },
    {
      AttributeName: 'definition',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'word',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'definition',
      KeyType: 'RANGE',
    },
  ],
  TableName: 'Dictionary',
};
async function createTable(params) {
  try {
    const data = await dynamodb.send(new CreateTableCommand(params));
    {
      console.log('Table Created', data);
      return data;
    }
  } catch (err) {
    console.log('Error', err);
  }
}
createTable(params);
// module.exports = putWordInDynamo;
