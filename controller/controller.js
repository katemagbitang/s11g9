const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },
    getIndex: function (req, res) {

        // render `../views/index.hbs`
        res.render('index');
    }
}
module.exports = controller;