const csvtojson = require("./helpers/converter");
const path = require("path");
const Broker = require("./models/database");

let convertedArray;
async function convert() {
    convertedArray = await csvtojson(
        path.join(__dirname, "./assets/realEstate.csv")
    );
}
convert();