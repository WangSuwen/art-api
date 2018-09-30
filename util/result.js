const codeMap = {

};

const Result = {
  success: function(res, data, msg) {
    return res.json({
      code: 200,
      data,
      msg: msg[codeMap[code]]
    });
  }
};

module.exports = Result;