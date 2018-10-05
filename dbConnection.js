const 
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    url = 'mongodb://localhost:27017',
    dbName = 'mtg';


module.exports.connection = (callback) => {
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);

        callback(client.db(dbName));
        // client.close();
    });
};

module.exports.insert = (db, collection, obj, callback) => {
    db.collection(collection).insert(obj, function(err, results) {
        if(results.result.ok === 1)
            callback(true)
        else throw err;
    });
};

module.exports.find = (db, collection, condition, callback) => {
    db.collection(collection).find(condition).toArray(function(err, results) {
        if (err) throw err;

        callback(results);
    });
};
