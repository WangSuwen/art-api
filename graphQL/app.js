/*  例子一：

// Import the required libraries
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');

// Import the data you created above
var data = require('./data.json');

// 用“id”和“name”两个字符串字段定义User类型。User的类型是GraphQLObjectType，他的子字段具有自己的类型（在这种情况下，GraphQLString）。
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

// 定义一个顶级字段架构“User”，它接收一个参数“id”，并根据ID，来返回用户。请注意，`query`是GraphQLObjectType，就像“User”。然而我们在上面定义的“user”这个字段，是一个userType。
var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        // `args` describes the arguments that the `user` query accepts：` args `描述参数，接受` user`查询。
        args: {
          id: { type: graphql.GraphQLString }
        },
        // 怎么去"resolve" 或者实现解决函数的描述？传入查询，在这种情况下，我们使用从上面的“ID”参数作为一个key，获取来自'data'的'User'
        resolve: function (_, args) {
          return data[args.id];
        }
      }
    }
  })
});

express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql'); */

var express = require('express');
var app = express();

var schema = require('./schema');
var graphql = require('graphql');
var bodyParser = require('body-parser');

app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  // execute GraphQL!
  graphql.graphql(schema, req.body)
  .then((result) => {
    res.send(JSON.stringify(result, null, 2));
  });
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});