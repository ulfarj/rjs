import fs from 'fs';
import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';
import {MongoClient} from 'mongodb';

let app = express();
app.use(express.static('public'));

let url = 'mongodb://localhost:27017/ssdb';

(async () => {
	let db = await MongoClient.connect(url);
	let schema = Schema(db);

	app.use('/graphql', GraphQLHTTP({
		schema,
		graphiql: true
	}));

	app.use("/css",  express.static(__dirname + '/css'));
	app.use("/node_modules", express.static(__dirname + '/node_modules'));

	app.listen(3000, () => console.log('Listening on port 3000'));	

	let json = await graphql(schema, introspectionQuery);
    fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
      if (err) throw err;
      console.log("JSON schema created");
    });
})();