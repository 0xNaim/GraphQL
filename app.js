require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();

// Allow cross-origin requests
app.use(cors());

// Port
const PORT = process.env.PORT;

// Connect to MongoDB
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.k2olu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => console.log('Successfully Connected to MongoDb Database'))
  .catch((err) => console.log(err.message));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
