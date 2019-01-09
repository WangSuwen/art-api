const Promise = require('bluebird');

const Daos = {
  save (model, ) {

  },
  getById(model, id) {
    return model.findById(id).exec();
  },
  list (model, limit, skip, sort = {createdAt: -1}) {
    return Promise.all([
      model.estimatedDocumentCount(),
      model.find().sort(sort).skip(skip).limit(limit).exec()
    ]);
  },
  /**
   * @param {*} model 
   * @param {*Object} query 
   */
  getOne(model, query) {
    return model.findOne(query).exec();
  }
};

module.exports = Daos;