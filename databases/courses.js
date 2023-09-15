// var MongoClient = require('mongodb').MongoClient;
// const url = "mongodb+srv://credit_management:9mWyPFf8TY9FNh8@cluster0.ar9wxoy.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

// console.log("entered into file to enter data");

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("connected to database to enter");
//     var dbo = db.db("Credit-Management");

//     const loginData = require("./LOGIN_DATA");
//     const courseData = require('./COURSE_DATA');

//     dbo.collection("Password-Details").insertMany(loginData, function(err, res) {
//         if (err) throw err;
//         console.log("Collection items created");
//         console.log("Number of documents inserted: " + res.insertedCount);
//         db.close();
//     });

//     dbo.collection("Course-Details").insertMany(courseData, function(err, res) {
//         if (err) throw err;
//         console.log("Collection items created");
//         console.log("Number of documents inserted: " + res.insertedCount);
//         db.close();
//     });

// });


const { MongoClient } = require('mongodb');
const url = "mongodb+srv://credit_management:9mWyPFf8TY9FNh8@cluster0.ar9wxoy.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

(async() => {
    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        console.log("Connected to the database");

        const db = client.db("Credit-Management");

        const loginData = require("./LOGIN_DATA");
        const courseData = require('./COURSE_DATA');

        const loginCollection = db.collection("Password-Details");
        const courseCollection = db.collection("Course-Details");

        const loginResult = await loginCollection.insertMany(loginData);
        console.log("Number of login documents inserted:", loginResult.insertedCount);

        const courseResult = await courseCollection.insertMany(courseData);
        console.log("Number of course documents inserted:", courseResult.insertedCount);

        client.close();
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
})();