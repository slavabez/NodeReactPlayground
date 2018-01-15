

module.exports = (app) => {
    // Routes declared here

    app.get('/api', (req, res) => {
        res.send({message: 'Hello world'});
    });

    app.post('/api/file', (req, res) => {
        // console.log('POST request received', req);
        res.send(req.body);
    });
};