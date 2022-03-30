const { ApolloServer, gql } = require('apollo-server');

const RickAndMortyAPI = require('./src/datasources/rick-and-morty-api');
const TodosAPI = require('./src/db/todos-api');
const pool = require('./src/db/todos-db');
// sequelize
// const { createStore } = require('./utils');

const typeDefs = gql`
type Status {
  code: Int
  message: String
}

type Todo {
  id: Int!
  name: String
  checked: Boolean
}

type ILocation {
  name: String
  url:  String
}

type Character {
  id: Int
  name: String
  status: String
  species: String
  type: String
  gender: String
  origin: ILocation
  location: ILocation
  image: String
  episode: [String]
  url: String
  created: String
}

type Query {
  todos: [Todo]
  getCharacters: [Character]
}

type Mutation {
  addTodo(name: String): Status
  deleteTodo(id: String): Status
  checkOrUncheck(id: String): Status
}
`;

const resolvers = {
  Query: {
    todos: (_, __, { dataSources }) => dataSources.todosAPI.getAllTodos(),
    getCharacters: (_, __, { dataSources }) => {
      return dataSources.rickAndMortyAPI.getCharacters();
    }
  },
  Mutation: {
    addTodo: (_, { name }, { dataSources }) => {
      if (name && name.length) {
        return dataSources.todosAPI.createTodo({ name });
      }
    },
    deleteTodo: (_, { id }, { dataSources }) => {
      if (id && id.length) {
        return dataSources.todosAPI.deleteTodo({ id });
      }
    },
    checkOrUncheck: (_, { id }, { dataSources }) => {
      if (id && id.length) {
        return dataSources.todosAPI.checkOrUncheck({ id });
      }
    },
  },
};

// sequelize
// const store = createStore();
// raw sql
const store = pool;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    rickAndMortyAPI: new RickAndMortyAPI(),
    todosAPI: new TodosAPI({ store }),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
