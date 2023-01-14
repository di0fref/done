import express from "express"
import i18next from "i18next";
import * as i18nextMiddleware from "i18next-express-middleware";
import FilesystemBackend from "i18next-fs-backend"
import cors from "cors";

const app = express()
app.use(express.json())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, accept, access-control-allow-origin');

    if ('OPTIONS' === req.method) res.send(200);
    else next();
});// i18next = require('i18next'),
// FilesystemBackend = require('i18next-fs-backend'),
// i18nextMiddleware = require('i18next-http-middleware'),
const port = 3001

i18next
    // .use(i18nextMiddleware.LanguageDetector)
    .use(FilesystemBackend)
    .init({preload: ['en']}, () => {

    })
app.post('/locales/add/en/common', (req, res) => {
    console.log(req.body)
    res.send('POST request to the homepage')
})
app.post('/locales/add/en/translation', (req, res) => {
    console.log(req.body)
    res.send('POST request to the homepage')
})
app.use(i18nextMiddleware.handle(i18next))
app.listen(port, () => {
    console.log('Server listening on port', port)
})


