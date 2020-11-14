const knex = require('knex');
const app = require('./app');
const { PORT, DB_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: DB_URL,
});

// adds a property-name 'db' with the value of db(knex instance) to the express encapsulated 'app' object.
// allows accessing the knex instance (db) through reading the express/app object (app) as to avoid making a dependency loop from requiring server.js wherever the service object and or it's methods are being used
app.set('db', db);
// How to Read this property-   req.app.get('property-name')


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});