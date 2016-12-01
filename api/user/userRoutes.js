var router = require('express').Router();
var controller = require('./userController');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function (req, res) {
    if(req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

/* GET users listing. */
router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/authenticate')
    .post(controller.auth);

router.route('/:id')
    .get(controller.verify);


module.exports = router;
