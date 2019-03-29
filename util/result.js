const codeMap = {
  CUSTOM_ERROR: { code: 10000, msg: '自定义错误'},
  SYSTEM_ERROR: { code: 10001, msg: '系统错误'},
  AUTH_FAILED: { code: 20000, msg: '登录已过期'},
  DELETE_FAILED: { code: 30000, msg: '删除失败'},
  REMIND_NOT_EXIST: { code: 6001, msg: '该提醒不存在'}
};

const Result = {
  success: function(res, data, msg) {
    return res.json({
      code: 200,
      data,
      msg: msg || '操作成功'
    });
  },
  /**
   * 
   * @param {*} res 
   * @param {msg: 'errmsg'} errMsg 
   */
  failed: function(res, errMsg) {
    return res.json({
      code: errMsg && errMsg['code'] || codeMap.SYSTEM_ERROR.code,
      msg: errMsg && errMsg.msg || codeMap.SYSTEM_ERROR.msg
    });
  },
  ...codeMap,
  /**
   * 
   * @param {*} data 
   * @param {Array} formater 
   */
  formatResData: function(data, formater = []) {
    if (formater.length) {
      const result = {};
      formater.forEach(f => {
        result[f] = data._doc[f];
      });
      return result;
    } else {
      return data._doc;
    }
  }
};

module.exports = Result;