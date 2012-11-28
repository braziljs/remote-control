exports.index = function (req, res) {
	req.app.set('token', req.params.token);
	console.log('TOKEN ACTION >>> ' + req.app.get('token'));
	res.render('index', { title: 'Remote Control' });
};