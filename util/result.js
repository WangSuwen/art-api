const codeMap = {
  CUSTOM_ERROR: { code: 10000, msg: '自定义错误'},
  SYSTEM_ERROR: { code: 10001, msg: '系统错误'},
};

const Result = {
  success: function(res, data, msg) {
    return res.json({
      code: 200,
      data,
      msg: msg || '操作成功'
    });
  },
  failed: function(res, errMsg, errStatus) {
    return res.json({
      code: errStatus['code'],
      msg: errMsg || (errStatus && errStatus['msg']) || '操作失败'
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