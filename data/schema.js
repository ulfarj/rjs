import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
} from 'graphql';

let Schema = (db) => {

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
				categories: {
					type: new GraphQLList(categoryType),					
					resolve: () => db.collection('categories').find({}).toArray()
				}
			})
		})
		//mutation
	});

	return schema;
};

export default Schema;
