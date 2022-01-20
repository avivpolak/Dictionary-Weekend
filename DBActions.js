const {dynamodb,client} = require("./config");

async function createTable(params) {
    try {
        const data = await dynamodb.createTable(params).promise();
        console.log("Table Created", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
}
async function getItem(params) {
    try {
        const data = await dynamodb.query(params).promise();
        return data.Items;
    } catch (err) {
        console.log("Error", err);
    }
}
async function putItem(params) {
    try {
        const data = await client.put(params).promise();
        return data;
    } catch (err) {
        console.log("Error", err);
    }
}
async function insertMany (dictinary) {
    try {
       let i = 0;
    for (let item of dictinary) {
        if (i % 100 === 0) {
            console.log(i);
        }
        i++;
        const word = Object.keys(item)[0];
        const value =  Object.values(item)[0];
        const params = {
            TableName: "Dictionary",
            Item: { word,value },
        };
        await putItem(params);
    }
    console.log("finished upload"); 
    } catch (error) {
        throw new Error (error)
    }
}
module.exports={getItem,createTable,putItem,insertMany}