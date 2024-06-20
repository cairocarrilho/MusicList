exports.login = function (req, res) {
    res.render('telaCadastro');
}
exports.cadastro = (req, res) => {
    const { name, usuario, email, phone } = req.body;
    const responseData = { name, usuario, email, phone };

    res.send(responseData);


}