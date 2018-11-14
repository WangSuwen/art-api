const { GraphQLServer } = require('graphql-yoga');

// 定义一个 Link 实例组成的数组
/* let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},{
  id: 'link-1',
  url: 'www.howtographql1.com',
  description: '1Fullstack tutorial for GraphQL'
}] */

// let idCount = links.length;

// 2
const resolvers = {
  Query: {
    info: () => 'this is a String info',
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    }
  },
  // 3
  Link: {
    id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url,
  },
  /* Mutation: {
    // 2
    post: (root, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      console.log(root);
      links.push(link);
      return link;
    }
  }, */
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info)
    },
  },
}

// 3
const server = new GraphQLServer({
  typeDefs: './graphQL/schema/index.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))