var graphql = require('graphql');

let count = 0;

let schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: graphql.GraphQLInt,
        resolve: function() {
          return count++;
        }
      }
    }
  })
});

//把当前模块的路由暴露出去
module.exports = schema;