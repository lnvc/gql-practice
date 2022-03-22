const { ApolloServer, gql } = require('apollo-server');

const RickAndMortyAPI = require('./src/datasources/rick-and-morty-api');


const typeDefs = gql`
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
  addTodo(name: String): [Todo]
}
`;

let todos = [
  {
    id: 1,
    name: 'angkas aliased imports intellisense',
    checked: true,
  },
  {
    id: 2,
    name: 'gql + hasura',
    checked: false,
  },
];

const resolvers = {
  Query: {
    todos: () => todos,
    getCharacters: (_, __, { dataSources }) => {
      return dataSources.rickAndMortyAPI.getCharacters();
    }
  },
  Mutation: {
    addTodo: (_, { name }) => {
      if (name && name.length) {
        const newTodo = {
          id: todos.length + 1,
          name,
          checked: false,
        };
        todos = [...todos, newTodo];
        console.log(todos);
        return todos;
      }
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    rickAndMortyAPI: new RickAndMortyAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
