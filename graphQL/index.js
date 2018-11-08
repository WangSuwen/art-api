const { GraphQLServer } = require('graphql-yoga');
// const typeDefs = require('./schema/index.graphql');

// 定义一个 Link 实例组成的数组
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},{
  id: 'link-1',
  url: 'www.howtographql1.com',
  description: '1Fullstack tutorial for GraphQL'
}]

// 定义一个 query-type，一个 Link-type


// 2
const resolvers = {
  Query: {
    info: () => 'this is a String info',
    feed: () => links,
  },
  // 3
  Link: {
    id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url,
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './schema/index.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))