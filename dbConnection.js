const
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    url = 'mongodb://localhost:27017',
    dbName = 'mtg';


module.exports.connection = (callback) => {
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);

        callback(client.db(dbName));
    });
};

module.exports.insert = (db, collection, card, callback) => {
    try {
        db.collection(collection).replaceOne({
            id: card.id
        }, card, {
            upsert: true
        }, callback(true));
    } catch (e) {
        throw e;
    }
};

module.exports.find = (db, collection, condition, callback) => {
    db.collection(collection).find(condition).toArray(function (err, results) {
        if (err) throw err;

        callback(results);
    });
};

module.exports.close = (db) => {
    db.close();
}