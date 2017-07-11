var jwt = require('jsonwebtoken');

module.exports.authenticate = function (req, res){
  var user = {
    username: 'Administrator',
    email: 'test@test.com',
    password: 'Password#1'
  }
  var token = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: 4000
  });

  res.json({
    success:true,
    token: token
  })
}
