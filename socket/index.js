let server = null;
let io = null;
let _socket = null;
const socketIO = {
  init(app) {
    server = require('http').Server(app);
    io = require('socket.io')(server);
    server.listen(8008);
    io.on('connection', this.onConnect.bind(this));
  },
  onConnect (socket) {
    _socket = socket;
    socket.emit('hello-client', { 'server-msg': '与服务器连接成功' });
    socket.on('user-to-user', this.onUserToUser);
    socket.on('hello-server', function (data) {
      console.log(data);
      socket.emit('server-response', `服务端接收到消息：${data.my}`);
    });
  },
  /**
   * 单用户发给单用户的
   * @param {*} data 
   * {
   *  fromUid: '发送用户的ID'
   *  toUid: '目标用户的ID'
   *  msg: '发送的消息'
   * }
   */
  onUserToUser (data) {
    console.log(`接收到某个用户发送给另一个用户的信息：${data}`);
    _socket.emit(`user-to-user_${data.toUid}`, {
      fromUid: data.fromUid,
      msg: data.msg
    });
  }
}

module.exports = socketIO;