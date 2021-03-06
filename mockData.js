const createTableParams = {
    AttributeDefinitions: [
        {
            AttributeName: "word",
            AttributeType: "S",
        },
    ],
    KeySchema: [
        { AttributeName: "word", KeyType: "HASH" },
    ],
    TableName: "Dictionary",
    ProvisionedThroughput: {
        ReadCapacityUnits: 25,
        WriteCapacityUnits: 25,
    },
};
const queryParams=(word) =>{  return {
    ExpressionAttributeValues: {
        ":v1": {
          S: word
         }
       }, 
       KeyConditionExpression: "word = :v1", 
           
       TableName: "Dictionary"
}}
// const randWordQueryParams=() =>{  return {
//     ExpressionAttributeValues: {
//         ":v1": {
//           S: word
//          }
//        }, 
//        KeyConditionExpression: "word = :v1", 
//        TableName: "Dictionary"
// }}

//defining dynamoDb scan query params
const scanParams = {
    TableName: "Dictionary",
    Limit: 100,
};



const putItemParams = {
    Item: {
        word: {
            S: "Somewhat",
        },
        pos: {
            S: "n.",
        },
        definitions: {
            L: "Call Me Today",
        },
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "Dictionary",
};

module.exports = { queryParams, createTableParams, putItemParams,scanParams };
