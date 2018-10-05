const
    request = require("request"),
    fs = require('fs'),
    Stream = require('stream').Transform,
    http = require("http"),
    mongoDb = require("./dbConnection.js");

mongoDb.connection((db) => {
    downloadCardsImages({
        db: db
    });
});

function downloadCardsImages({
    cont = 47,
    db = null
}) {
    let mongoCursor = (typeof db !== undefined) ? db : null;
    let baseUrl = `https://api.magicthegathering.io/v1/cards/${cont}`;

    return new Promise((resolve, reject) => {
        request(baseUrl, {
            json: true
        }, (err, res, body) => {
            if (err)
                reject(err);

            if (body === undefined)
                resolve(downloadCardsImages({
                    cont: ++cont,
                    db: mongoCursor
                }));

            saveCardsImages({
                    name: body.card.name,
                    url: body.card.imageUrl,
                    db: mongoCursor,
                    card: body.card
                })
                .then(saved => {
                    if (saved)
                        resolve(downloadCardsImages({
                            cont: ++cont,
                            db: mongoCursor
                        }));
                    else
                        console.error('Insert failed.');
                }, err => {
                    console.error(err);
                });
        });
    });
}

function saveCardsImages({
    name = "",
    url = "",
    db = null,
    card = null
}) {
    return new Promise((resolve, reject) => {
        http.request(url, (res) => {
            let data = new Stream();

            res.on('data', (chunk) => {
                data.push(chunk);
            });

            res.on('error', (err) => {
                throw err;
            });

            res.on('end', () => {
                let date = new Date();
                name += '_' + date.getFullYear() +
                    '-' + (date.getMonth() + 1) +
                    '-' + date.getHours() +
                    '-' + date.getMinutes() +
                    '-' + date.getSeconds() +
                    '-' + date.getMilliseconds();

                console.log(name, url);

                mongoDb.insert(db, "cards", card, (saved) => {
                    if (saved) {
                        fs.writeFileSync(`./img/${name}.jpg`, data.read());
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        }).end();
    });
}