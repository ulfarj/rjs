import express from 'express';
import GraphQLHTTP from 'express-graphql';
import schema from './data/schema';
import {MongoClient} from 'mongodb';

let app = express();

app.use(express.static('public'));

let db;
let url = 'mongodb://localhost:27017/ssdb';

MongoClient.connect(url, (err, database) => {
	if (err) throw err;

	db = database;
	app.use('/graphql', GraphQLHTTP({
		schema: schema(db),
		graphiql: true
	}));
	
	app.listen(3000, () => console.log('Listening on port 3000'));	
});

app.get("/data/categories", (req, res) => {
	db.collection("categories").find({}).toArray((err, links) =>{
		if (err) throw err;
		res.json(links);
	});
});