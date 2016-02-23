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
	mutationWithClientMutationId
} from 'graphql-relay';

let Schema = (db) => {

	let store = {};
	
	let storeType = new GraphQLObjectType({
		name: 'Store',	
		fields: () => ({
			categories: {
				type: new GraphQLList(categoryType),					
				resolve: () => db.collection('categories').find({}).toArray()
			},
			companies: {
				type: new GraphQLList(companyType),
				resolve: () => db.collection('companies').find({}).toArray()
			},
			salesmen: {
				type: new GraphQLList(salesmanType),
				resolve: () => db.collection('salesmen').find({}).toArray()
			},
			sales: {
				type: new GraphQLList(saleType),
				resolve: () => db.collection('sales').find({}).toArray()
			}
		})
	});

	let saleType =  new GraphQLObjectType({
		name: 'Sale',
		fields: () => ({
			_id: {type: GraphQLString},
			company_id: {type: GraphQLString},
			salesman_id: {type: GraphQLString},
			category_id: {type: GraphQLString}
		})
	})

	let companyType = new GraphQLObjectType({
		name: 'Company',
		fields: () => ({
			_id: {type: GraphQLString},
			name: {type: GraphQLString},
			ssn: {type: GraphQLString},
			address: {type: GraphQLString},
			postalCode: {type: GraphQLString},
			phone: {type: GraphQLString},
			email: {type: GraphQLString},
			comment: {type: GraphQLString}
		})
	});	
		
	let categoryType = new GraphQLObjectType({
		name: 'Category',
		fields: () => ({
			_id: {type: GraphQLString},
			name: {type: GraphQLString}
		})
	});

	let salesmanType = new GraphQLObjectType({
		name: 'Salesman',
		fields: () => ({
			_id: {type: GraphQLString},
			name: {type: GraphQLString}
		})
	});

	let createCompanyMutation = mutationWithClientMutationId({
		name: 'CreateCompany',

		inputFields: {
	    	name: { type: new GraphQLNonNull(GraphQLString) },
	      	ssn: { type: new GraphQLNonNull(GraphQLString) },
	    },	   
		outputFields: {
			company: {
				type: companyType,
				resolve: (obj) => obj.ops[0]
			}
		},
		mutateAndGetPayload: (name, ssn) => {
			return db.collection("companies").insertOne({name, ssn});
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
		})		
	});

	mutation: new GraphQLObjectType({
		name: 'Mutation',
		fields: () => ({
			createCompany: createCompanyMutation
		})
	});

	return schema;
};

export default Schema;
