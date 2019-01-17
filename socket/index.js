let server = null;
let io = null;
let _socket = null;
let chat = null;
const socketIO = {
  init(app) {
    server = require('http').Server(app);
    io = require('socket.io')(server);
    server.listen(8008);
    io.on('connection', this.onConnect.bind(this));
    chat = io.of('chat');
    chat.on('connection', this.onChatConnect.bind(this))
  },
  /**
   * 根链接
   * @param {Socket} socket 
   */
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
   * 聊天链接
   * @param {Socket} socket 
   */
  onChatConnect (socket) {
    const that = this;
    socket.emit('hello-client', { 'server-msg': '聊天链接--与服务器连接成功' });
    // 接收到用户发来的消息
    socket.on('chat:user-sendMsg', function (msg) {
      that.receiveUserSendMsg(socket, msg);
    });
    socket.on('hello-server', function (data) {
      socket.emit('server-response', `聊天链接--服务端接收到消息：${data.my}`);
    });
  },
  receiveUserSendMsg (socket, msg) {
    const socketType = `chat:server-sendMsg-to-user:${msg.receiveUserId}`;
    console.log('将信息发送给目标用户：', socketType);
    /**
     * 必须通过 broadcast  进行广播，才能将消息发送出去
     */
    socket.broadcast.emit(socketType, msg.content);
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