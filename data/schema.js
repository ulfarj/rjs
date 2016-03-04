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
  	nodeDefinitions,
	mutationWithClientMutationId,
	connectionDefinitions,
  	connectionArgs,
  	connectionFromPromisedArray
} from 'graphql-relay';

let Schema = (db) => {

	class Store {}
    let store = new Store();

    let nodeDefs = nodeDefinitions(
	    (globalId) => {
	      let {type} = fromGlobalId(globalId);
	      if (type === 'Store') {
	        return store
	      }
	      return null;
	    },
	    (obj) => {
	      if (obj instanceof Store) {
	        return storeType;
	      }
	      return null;
	    }
    );
	
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
				args: {
					...connectionArgs,									
					name: { type: GraphQLString },
					ssn: { type: GraphQLString },
					email: { type: GraphQLString },
					phone: { type: GraphQLString },
					address: { type: GraphQLString },
					postalCode: { type: GraphQLString },
					comment: { type: GraphQLString }
				},
				resolve: (_, args) => { 
					let findParams = {};

					if(args.name) {
						findParams.name = new RegExp(args.name, 'i');
						console.log(args.name + 'name');	
					}
					if(args.ssn) {
						findParams.ssn = new RegExp(args.ssn, 'i');
					}
					if(args.email) {
						findParams.email = new RegExp(args.email, 'i');
					}
					if(args.phone) {
						findParams.phone = new RegExp(args.phone, 'i');
					}
					if(args.address) {
						findParams.address = new RegExp(args.address, 'i');
						console.log(args.address + 'address');
					}
					if(args.postalCode) {
						findParams.postalCode = new RegExp(args.postalCode, 'i');
					}
					if(args.comment) {
						findParams.comment = new RegExp(args.comment, 'i');
					}

					console.log(findParams);

					return connectionFromPromisedArray( 
						db.collection('companies')
							.find(findParams)
							.toArray(),
						args
					)
				}
			}
		}),
		interfaces: [nodeDefs.nodeInterface]
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
				node: nodeDefs.nodeField,
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
