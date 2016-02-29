import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID
} from 'graphql';

import {
	globalIdField,
  	fromGlobalId,
	mutationWithClientMutationId,
	connectionDefinitions,
  	connectionArgs,
  	connectionFromPromisedArray
} from 'graphql-relay';

let Schema = (db) => {

	let store = {};
	
	let storeType = new GraphQLObjectType({
		name: 'Store',	
		fields: () => ({
			id: globalIdField("Store"),
			categoryConnection: {
				type: categoryConnection.connectionType,
				args: connectionArgs,
				resolve: (_, args) => connectionFromPromisedArray(
					db.collection('categories').find({}).toArray(),
					args
				) 	
			},			
			salesmanConnection: {
				type: salesmanConnection.connectionType,
			    args: connectionArgs,
				resolve: (_, args) => connectionFromPromisedArray(
					db.collection('salesmen').find({}).toArray(),
					args
				) 						
			},
			saleConnection: {
				type: saleConnection.connectionType,
				args: connectionArgs,
				resolve: (_, args) => connectionFromPromisedArray(
					db.collection('sales').find({}).toArray(),
					args
				)				
			},
			companyConnection: {
				type: companyConnection.connectionType,
				args: connectionArgs,
				resolve: (_, args) => connectionFromPromisedArray( 
					db.collection('companies').find({}).toArray(),
					args
				)
			}
		})
	});

	let companyType = new GraphQLObjectType({
		name: 'Company',
		fields: () => ({			
			id: {
		        type: new GraphQLNonNull(GraphQLID),
		        resolve: (obj) => obj._id
		    },
			name: {type: GraphQLString},
			ssn: {type: GraphQLString},
			address: {type: GraphQLString},
			postalCode: {type: GraphQLString},
			phone: {type: GraphQLString},
			email: {type: GraphQLString},
			comment: {type: GraphQLString}
		})
	});	

	let companyConnection = connectionDefinitions({
		name: 'Company',
		nodeType: companyType
	});

	let saleType =  new GraphQLObjectType({
		name: 'Sale',
		fields: () => ({
			id: {
		        type: new GraphQLNonNull(GraphQLID),
		        resolve: (obj) => obj._id
		    },
			company_id: {type: GraphQLString},
			salesman_id: {type: GraphQLString},
			category_id: {type: GraphQLString}
		})
	});

	let saleConnection = connectionDefinitions({
		name: 'Sale',
		nodeType: saleType
	});
	
	let categoryType = new GraphQLObjectType({
		name: 'Category',
		fields: () => ({
			id: {
		        type: new GraphQLNonNull(GraphQLID),
		        resolve: (obj) => obj._id
		    },
			name: {type: GraphQLString}
		})
	});

	let categoryConnection = connectionDefinitions({
		name: 'Category',
		nodeType: categoryType
	});

	let salesmanType = new GraphQLObjectType({
		name: 'Salesman',
		fields: () => ({
			id: {
		        type: new GraphQLNonNull(GraphQLID),
		        resolve: (obj) => obj._id
		    },
			name: {type: GraphQLString}
		})
	});

	let salesmanConnection = connectionDefinitions({
		name: 'Salesman',
		nodeType: salesmanType
	});

	let createCompanyMutation = mutationWithClientMutationId({
		name: 'CreateCompany',

		inputFields: {
			ssn: { type: new GraphQLNonNull(GraphQLString) },
	    	name: { type: new GraphQLNonNull(GraphQLString) },
	    	address: { type: GraphQLString },
	    	postalCode: { type: GraphQLString },
	    	phone: { type: GraphQLString },
	    	email: { type: GraphQLString },
	    	comment: { type: GraphQLString },	      	
	    },	   
		outputFields: {
			companyEdge: {
				type: companyConnection.edgeType,
				resolve: (obj) => ({ node: obj.ops[0], cursor: obj.insertedId })				
			},
		    store: {
		        type: storeType,
		        resolve: () => store
		      }
		},
		mutateAndGetPayload: ({name, ssn, address, postalCode, phone, email, comment}) => {			
			return db.collection("companies").insertOne({"ssn": ssn, "name": name, "address": address, postalCode, phone, email, comment});
		}
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
		}),

		mutation: new GraphQLObjectType({
			name: 'Mutation',
			fields: () => ({
				createCompany: createCompanyMutation
			})
		})	
	});

	

	return schema;
};

export default Schema;
