const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    const messages = [];
    const path = './messages';
    const files = fs.readdirSync(path);
    files.forEach(file => {
        const pathFile = `${path}/${file}`;
        messages.push(JSON.parse(fs.readFileSync(pathFile)));
    });
    if(messages.length <= 5) {
        res.send(messages);
    } else {
        res.send(messages.slice(-5));
    }
});

router.post('/', (req, res) => {
    const filename = `./messages/${new Date().toISOString()}.json`;
    req.body.datetime = new Date().toISOString();
    fs.writeFile(filename, JSON.stringify(req.body), err => {
        err ? console.log(err) : console.log('File created');
    });
    res.send('Message send');
});

module.exports = router;