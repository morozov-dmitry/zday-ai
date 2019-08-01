const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let MongoClient = require('mongodb').MongoClient;

const config = {
    name: 'ai-zday-api',
    port: 3003,
    host: '0.0.0.0',
};

const app = express();

app.use(bodyParser.json());
app.use(cors());

const SUMMARY_COLLECTION = 'summary_collection';
const STATISTIC_COLLECTION = 'statistic_collection';

const dsn = "mongodb://mongo:27017";

MongoClient.connect(dsn, (err, mongoClient) => {
    const db = mongoClient.db("local");
    app.get('/', (req, res) => {
        db.collection(SUMMARY_COLLECTION).find().toArray((err, summaryArray) => {
            db.collection(STATISTIC_COLLECTION).find().toArray((err, statistic) => {
                const summary = summaryArray[0];
                res.status(200).send({
                    summary,
                    statistic
                });
            });    
        });
    });
});

/*
(async () => {
    let client = await MongoClient.connect(dsn,{ poolSize: 10, reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000 });

    let db = client.db('local');
    try {
       app.get('/', async (req, res) => {
            const summaryCursor = await ;
            const statisticCusrsor = await db.collection(STATISTIC_COLLECTION).find();
            const statistic = [];
            statisticCusrsor.forEach(stat => statistic.push(stat))
            console.log('summary', summary);
            console.log('statistic', statistic);
            res.status(200).send({
                statistic
            });
        });
    }
    finally {
        client.close();
    }
})()
.catch(err => console.error(err));
*/

app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }
});