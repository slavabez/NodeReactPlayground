

module.exports = (app) => {
    // Routes declared here

    app.get('/api', (req, res) => {
        res.send({message: 'Hello world'});
    });
};