import Relay from 'react-relay';

class CreateCompanyMutation extends Relay.Mutation {
	getMutation() {		
	    return Relay.QL`
	      mutation { createCompany }
	    `;
  	}

	getVariables() {					
	    return {
	      name: this.props.name,
	      ssn: this.props.ssn,
	      address: this.props.address, 
	      postalCode: this.props.postalCode, 
	      phone: this.props.phone, 
	      email: this.props.email, 
	      comment: this.props.comment
	    }
  	}

  	getFatQuery() {  		
	    return Relay.QL`
	      fragment on CreateCompanyPayload {
	        companyEdge,
	        store { companyConnection }
	      }
	    `;
  	}

  /*	getConfigs() {  		
	    return [{
	      type: 'RANGE_ADD',
	      parentName: 'store',
	      parentID: this.props.store.id,
	      connectionName: 'companyConnection',
	      edgeName: 'companyEdge',
	      rangeBehaviors: {
	        'orderby(newest)': 'append',	        
	      },
	    }]
	}*/

	 getConfigs() {
	    return [{
	     type: 'REQUIRED_CHILDREN',
		 children: [
		    Relay.QL`
		      fragment on CreateCompanyPayload {
		   	    companyEdge
		      }
		    `
		  ]
	    }];
	  }
	 
  	getOptimisticResponse() {  		
	    return {
	      companyEdge: {
	        node: {
	          name: this.props.name,
	          ssn: this.props.ssn,
	          address: this.props.address, 
	          postalCode: this.props.postalCode, 
	          phone: this.props.phone, 
	          email: this.props.email, 
	          comment: this.props.comment
	        }
	      }
	    }
  	}

}

export default CreateCompanyMutation;