const Promise = require('bluebird');

const Daos = {
  getById(model, id) {
    return model.findById(id).exec();
  },
  list (model, limit, skip, sort = {createdAt: -1}, fields) {
    return Promise.all([
      model.estimatedDocumentCount(),
      model.find({}, fields).sort(sort).skip(skip).limit(limit).exec()
    ]);
  },
  /**
   * @param {Model} model 
   * @param {Object} query 
   */
  getAll(model, query) {
    return model.find(query).exec();
  },
  /**
   * @param {*} model 
   * @param {*Object} query 
   * @param {*Object} fields 需要查询的字段 
   */
  getOne(model, query, fields) {
    return model.findOne(query, fields).exec();
  }
};

module.exports = Daos;