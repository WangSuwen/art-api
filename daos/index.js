const Promise = require('bluebird');

const Daos = {
  save (model, ) {

  },
  getById(model, id) {
    return model.findById(id);
  },
  list (model, limit, skip, sort = {createdAt: -1}) {
    return Promise.all([
      model.estimatedDocumentCount(),
      model.find().sort(sort).skip(skip).limit(limit).exec()
    ]);
  }
};

module.exports = Daos;