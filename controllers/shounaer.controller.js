const result = require('../util/result');
const Daos = require('../daos');
const Shounaerapi = require('../models/shounaerapi.model');

/**
 * 收哪儿 -- Mock 接口
 */
function shounaer (req, res, next) {
  Daos.getOne(Shounaerapi, { apiPath: req.params[0] }, { apiResponse: 1 })
    .then(data => {
      return result.success(res, JSON.parse(data.apiResponse || '{}'));
    })
    .catch(e => {
      return result.failed(res, result.SYSTEM_ERROR);
    });
  /* const ok = {ok: 1};
  const apiPath = req.params[0];
  let d = null;
  switch (apiPath) {
    case 'api/app/v350/remind':
      d = addRemind;
      break;
    case 'api/app/v350/remind-list':
      d = remindList;
      break;
      case 'api/app/v350/remind-detail':
      d = remindDetail;
      break;
      case 'api/app/v350/categories':
      d = categories;
      break;
      case 'api/app/v350/object-list':
      d = objectList;
      break;
      case 'api/app/v350/remind-auto':
      d = remindAuto;
      break;
    case 'api/app/v350/remind-delete':
    case 'api/app/v350/remind-update':
    case 'api/app/v350/remind-done':
    case 'api/app/v350/remind-dialog':
      d = ok;
      break;
    default:
      break;
  }
  return result.success(res, d); */
}

/**
 * 管理后台 - 获取接口列表
 * @param {*} req 
 * @param {*} res 
 */
function managementApiList (req, res) {
  const { limit = 10, currentPage = 1 } = req.query;
  Daos.list(Shounaerapi, +limit, (currentPage - 1) * limit, null, { apiName: 1, apiPath: 1, apiResponse: 1, createdAt: 1, updatedAt: 1 })
      .then(datas => {
        result.success(res, {
          list: datas[1],
          currentPage: +currentPage,
          limit: limit,
          pageSize: Math.ceil(datas[0] / limit)
        });
      })
      .catch(e => { 
        console.log(`获取列表报错了：${e}`);
        next(e);
      });
}

/**
 * 添加
 * @param {*} req 
 * @param {*} res 
 */
function managementAddApi (req, res) {
  const shounaerApi = new Shounaerapi(req.body.params);
  shounaerApi.save()
    .then(api => {
      return result.success(res, api);
    })
    .catch(e => {
      return result.failed(res, result.SYSTEM_ERROR);
    })
}

/**
 * 修改
 * @param {*} req 
 * @param {*} res 
 */
function managementUpdateApi (req, res) {
  const now = new Date();
  Shounaerapi.update(
    {
      _id: req.body.params._id
    }, {
      apiName: req.body.params.apiName,
      apiPath: req.body.params.apiPath,
      apiResponse: req.body.params.apiResponse,
      updatedAt: now
    }
  )
  .then(data => {
    if (data.nModified === 1) {
      result.success(res, { updatedAt: now });
    }
  })
  .catch(e => {
    return result.failed(res, result.SYSTEM_ERROR);
  });
}


module.exports =  { shounaer, managementApiList, managementAddApi, managementUpdateApi };
