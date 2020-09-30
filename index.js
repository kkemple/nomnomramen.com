import { ApolloServer } from "apollo-server";
import fs from "fs";

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4242).then(() => console.log("server started on port 4242"));
