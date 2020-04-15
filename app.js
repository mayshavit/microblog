const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const microBlogsRouts = require('./api/routes/microblogs');

mongoose.connect(
    'mongodb://maysh:nRWUdRmd3NmDJ9pq@microblogrestfulapiproject-shard-00-00-rfdup.mongodb.net:27017,microblogrestfulapiproject-shard-00-01-rfdup.mongodb.net:27017,microblogrestfulapiproject-shard-00-02-rfdup.mongodb.net:27017/test?ssl=true&replicaSet=MicroBlogRESTfulApiProject-shard-0&authSource=admin&retryWrites=true&w=majority'
, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected to mongod')).catch(err => console.log('err in connecting ' + err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/microblogs', microBlogsRouts);

//handling errors
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);

});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;