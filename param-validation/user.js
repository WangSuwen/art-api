const Joi = require('joi');

module.exports =  {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.number().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.number().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  menu: {
    body: {
      userId: Joi.string().required(),
      menus: Joi.array().required()
    }
  },
  menuList: {
    query: {
      userId: Joi.string().required()
    }
  }
};
