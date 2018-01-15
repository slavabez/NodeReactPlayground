const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));



require('./routes')(app);

// Error handling middleware
app.use(function (err, req, res, next) {
    if (err === 'Error: incorrect file type. Only images can be uploaded'){
        res.status(400).send({error: 'Only images allowed. Check the file type'})
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log(`Application listening on port ${PORT}`);