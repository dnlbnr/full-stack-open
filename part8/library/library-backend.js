require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
// const { v1: uuid } = require("uuid");
const Book = require("./models/book.model");
const Author = require("./models/author.model");
const User = require("./models/user.model");

const MONGO_URI = process.env.MONGO_URI;
const TOKEN_SECRET = "secret";

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(author: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("not authed");
      return await Book.collection.countDocuments();
    },
    authorCount: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("not authed");
      return await Author.collection.countDocuments();
    },
    allBooks: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("not authed");
      return await Book.find({});
      // const books = await Book.find({});
      // const filteredByAuthor = args.author
      //   ? books.filter((b) => b.author.name === args.author)
      //   : books;
      // const filteredByGenre = args.genre
      //   ? filteredByAuthor.filter((b) => b.genres.includes(args.genre))
      //   : filteredByAuthor;
      // return filteredByGenre;
    },
    allAuthors: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("not authed");
      return await Author.find({});
    },
    me: async (_, __, context) => {
      const { user } = context;
      if (!user) throw new AuthenticationError("Not authenticated");

      return user;
    },
  },

  Book: {
    author: async (root) => {
      return await Author.findById(root.author);
    },
  },

  Author: {
    bookCount: async (root) => {
      const booksFromAuthor = await Book.find({ author: root.id });
      return booksFromAuthor.length;
    },
  },

  Mutation: {
    addBook: async (_, args, { user }) => {
      if (!user) throw new AuthenticationError("not authed");
      if (
        !(
          args.author &&
          args.author.length >= 4 &&
          args.title &&
          args.title.length >= 2
        )
      ) {
        throw new UserInputError("invalid input");
      }

      const existingBook = await Book.findOne({ title: args.title });
      if (existingBook) throw new UserInputError("book already exists");

      const existingAuthor = await Author.findOne({ name: args.author });
      let authorId;
      if (existingAuthor) {
        authorId = existingAuthor.id;
      } else {
        const newAuthor = await new Author({ name: args.author }).save();
        authorId = newAuthor.id;
      }
      const newBook = await new Book({ ...args, author: authorId }).save();
      return newBook;
    },

    editAuthor: async (_, args, { user }) => {
      if (!user) throw new AuthenticationError("not authed");

      const { author, setBornTo } = args;
      if (!author || !setBornTo) throw new UserInputError("invalid input");

      const updatedAuthor = await Author.findOneAndUpdate(
        { name: author },
        { born: setBornTo },
        { runValidators: true, context: "query", new: true }
      );
      return updatedAuthor;
    },

    createUser: async (_, args) => {
      const { username, favouriteGenre } = args;
      if (!username || !favouriteGenre)
        throw new UserInputError("missing fields");

      const newUser = await new User({ username, favouriteGenre }).save();
      return newUser;
    },

    login: async (_, args) => {
      const { username, password } = args;
      if (!username || !password || password !== "secret")
        throw new UserInputError("wrong credentials");

      const user = await User.findOne({ username });
      if (!user) throw new UserInputError("wrong credentials");

      const token = jwt.sign(
        { user: user.username, id: user.id },
        TOKEN_SECRET
      );

      return { value: token };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
      const token = authHeader.split(" ")[1];
      const tokenPayload = jwt.verify(token, TOKEN_SECRET);
      const user = await User.findById(tokenPayload.id);
      return { user };
    }
  },
});

const setup = () => {
  mongoose.connect(MONGO_URI, () => console.log("DB connected"));

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

setup();
