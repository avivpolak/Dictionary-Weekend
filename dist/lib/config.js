"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamodb = void 0;
const AWS = require("aws-sdk");
require("dotenv").config();
AWS.config.update({
    region: 'us-west-1',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    endpoint: new AWS.Endpoint('http://localhost:8000'),
});
const dynamodb = new AWS.DynamoDB();
exports.dynamodb = dynamodb;
