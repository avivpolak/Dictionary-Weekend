"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="aws-sdk" />
const config_1 = require("../lib/config");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
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
        const data = await config_1.dynamodb.send(new client_dynamodb_1.CreateTableCommand(params));
        {
            console.log('Table Created', data);
            return data;
        }
    }
    catch (err) {
        console.log('Error', err);
    }
}
createTable(params);
// module.exports = putWordInDynamo;
