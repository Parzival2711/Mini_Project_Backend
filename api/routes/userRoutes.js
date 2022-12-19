module.exports = function(app){
    var userHandlers = require('../controllers/userController.js');
    app.route('/auth/register').post(userHandlers.register);
    app.route('/auth/sign_in').post(userHandlers.sign_in);
    app.route('/profile').post(userHandlers.loginRequired,userHandlers.get_profile);
};

