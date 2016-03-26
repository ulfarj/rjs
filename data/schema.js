import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLInputObjectType,
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
			statusConnection: {
				type: statusConnection.connectionType,
				args: connectionArgs,
				resolve: (_, args) => connectionFromPromisedArray(
					db.collection('statuses').find({}).toArray(),
					args
				)				
			},
			saleConnection: {
				type: saleConnection.connectionType,
				args: {
					...connectionArgs,														
					salesmen: { type: new GraphQLList(GraphQLString) },
					categories: { type: new GraphQLList(GraphQLString) },
					statuses: { type: new GraphQLList(GraphQLString) }					
				},
				resolve: (_, args) => { 
					let findParams = {};
												
					return connectionFromPromisedArray(
						db.collection('sales')
							.find({categoryId: { $in: args.categories }})
							.toArray(),
						args
					)
				}				
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
					comment: { type: GraphQLString },					
				},
				resolve: (_, args) => { 
					let findParams = {};

					if(args.name) {
						findParams.name = new RegExp(args.name, 'i');						
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
					}
					if(args.postalCode) {
						findParams.postalCode = new RegExp(args.postalCode, 'i');
					}
					if(args.comment) {
						findParams.comment = new RegExp(args.comment, 'i');
					}
					
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
			comment: {type: GraphQLString},
			categories: {type: categoryType },
			sales: {
				type: saleConnection.connectionType,
				args: {
					...connectionArgs
				},
				resolve: (obj, args) => {					
					let findParams = {};
					findParams.companyId = new RegExp(obj._id, 'i');

					return connectionFromPromisedArray( 
						db.collection('sales')
							.find(findParams)
							.toArray(),
							args
						)

				}
			}
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
		    companyId: {type: GraphQLString},
			categoryId: {type: GraphQLString},
			salesmanId: {type: GraphQLString},			
			statusId: {type: GraphQLString}
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

	let statusType = new GraphQLObjectType({
		name: 'Status',
		fields: () => ({
			id: {
		        type: new GraphQLNonNull(GraphQLID),
		        resolve: (obj) => obj._id
		    },
			name: {type: GraphQLString},
			color: {type: GraphQLString}
		})
	});

	let statusConnection = connectionDefinitions({
		name: 'Status',
		nodeType: statusType
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

	let createSaleMutation = mutationWithClientMutationId({
		name: 'CreateSale',

		inputFields: {
			companyId: { type: new GraphQLNonNull(GraphQLString) },
			salesmanId: { type: new GraphQLNonNull(GraphQLString) },
			categoryId: { type: new GraphQLNonNull(GraphQLString) },
			statusId: { type: new GraphQLNonNull(GraphQLString) }
		},
		outputFields: {
			saleEdge: {
				type: saleConnection.edgeType,
				resolve: (obj) => ({ node: obj.ops[0], cursor: obj.insertedId })
			},
			store: {
				type: storeType,
				resolve: () => store
			}
		},
		mutateAndGetPayload: ({companyId, salesmanId, categoryId, statusId}) => {					
			return db.collection("sales").insertOne(
				{"companyId": companyId, "salesmanId": salesmanId, "categoryId": categoryId, "statusId": statusId 
			});
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
				createCompany: createCompanyMutation,
				createSale: createSaleMutation
			})
		})

	});

	

	return schema;
};

export default Schema;
