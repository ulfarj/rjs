import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
} from 'graphql';

let Schema = (db) => {

	let store = {};
	
	let storeType = new GraphQLObjectType({
		name: 'Store',	
		fields: () => ({
			categories: {
				type: new GraphQLList(categoryType),					
				resolve: () => db.collection('categories').find({}).toArray()
			}
		})
	});		
		
	let categoryType = new GraphQLObjectType({
		name: 'Category',
		fields: () => ({
			_id: {type: GraphQLString},
			name: {type: GraphQLString}
		})
	});

	let schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'Query',	
			fields: () => ({
				store: {
					type: storeType,					
					resolve: () => store
				}
			})
		})		
	});

	return schema;
};

export default Schema;
