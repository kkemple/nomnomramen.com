import { ApolloServer } from "apollo-server";
import fs from "fs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);
const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

const resolvers = {
  Query: {
    products: async () => {
      const products = await stripe.products.list();
      return {
        hasMore: products.has_more,
        items: products.data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          images: item.images,
        })),
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4242).then(async () => {
  console.log("server started on port 4242");
});
