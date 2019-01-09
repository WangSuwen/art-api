// TODO: 这个地方需要重写
function loginCheck(req, res, next) {
  if (req.headers['x-token']) {
    next();
  } else {
    console.log('登录已过期！！！！');
  }
}
module.exports = { loginCheck };