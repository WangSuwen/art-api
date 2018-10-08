const codeMap = {
  CUSTOM_ERROR: { code: 10000, msg: '自定义错误'}
};

const Result = {
  success: function(res, data, msg) {
    return res.json({
      code: 200,
      data,
      msg: msg || '操作成功'
    });
  },
  failed: function(res, errMsg, code) {
    return res.json({
      code: code.code,
      msg: errMsg || (code && codeMap[code]['msg']) || '操作失败'
    });
  },
  ...codeMap
};

module.exports = Result;