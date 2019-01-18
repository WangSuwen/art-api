let server = null;
let io = null;
let _socket = null;
let chat = null;
const socketIO = {
  /**
   * 
   * @param {ExpressServer} app express()
   */
  init(app) {
    server = require('http').Server(app);
    io = require('socket.io')(server);
    server.listen(8008);

    io.on('connection', this.onConnect.bind(this));
    /**
     * 创建 聊天专用 namespace
     */
    chat = io.of('chat');
    chat.on('connection', this.onChatConnect.bind(this))
  },
  /**
   * 根链接
   * @param {Socket} socket 
   */
  onConnect (socket) {
    _socket = socket;
    // 通知客户端，已与服务端建立链接
    socket.emit('hello-client', { 'server-msg': '与服务器连接成功' });
    // 客户端 向服务端打招呼
    socket.on('hello-server', function (data) {
      console.log(data);
      socket.emit('server-response', `服务端接收到消息：${data.my}`);
    });
  },
  /**
   * 聊天 namespace
   * @param {Socket} socket 
   */
  onChatConnect (socket) {
    const that = this;
    socket.emit('hello-client', { 'server-msg': '聊天链接--与服务器连接成功' });
    // 接收到用户发来的消息
    socket.on('chat:user-sendMsg', function (msg) {
      that.receiveUserSendMsg(socket, msg);
    });
  },
  /**
   * 接收到用户发来的信息
   * @param {Socket} socket 
   * @param {Object} msg 
   */
  receiveUserSendMsg (socket, msg) {
    const socketType = `chat:server-sendMsg-to-user:${msg.receiveUserId}`;
    console.log('将信息发送给目标用户：', socketType);
    /**
     * 必须通过 broadcast  进行广播，才能将消息发送出去
     */
    socket.broadcast.emit(socketType, msg);
  }
}

module.exports = socketIO;