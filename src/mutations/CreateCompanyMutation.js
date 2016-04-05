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
	      comment: this.props.comment,
	      sales: this.props.sales
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
	          comment: this.props.comment,
	          sales: this.props.sales
	        }
	      }
	    }
  	}

}

export default CreateCompanyMutation;