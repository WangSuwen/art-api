const result = require('../util/result');
const Daos = require('../daos');

const addRemind = require('../mock/add-remind');
const remindList = require('../mock/remind-list');
const remindDetail = require('../mock/remind-detail');
const categories = require('../mock/categories');
const remindAuto = require('../mock/remind-auto');
const objectList = require('../mock/object-list');

/**
 * 收哪儿
 */
function shounaer(req, res, next) {
  const ok = {ok: 1};
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
  return result.success(res, d);
}


module.exports =  { shounaer };
