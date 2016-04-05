/*import Relay from 'react-relay';

class CreateSaleMutation extends Relay.Mutation {
	getMutation() {		
	    return Relay.QL`
	      mutation { createSale }
	    `;
  	}

	getVariables() {					
	    return {
	      companyId: this.props.companyId,
	      sales: this.props.sales		
	    }
  	}

  	getFatQuery() {  		
	    return Relay.QL`
	      fragment on CreateSalePayload {
	      	sales    
	      }
	    `;
  	}

  	getConfigs() {
	    return [{
	     type: 'REQUIRED_CHILDREN',
		 children: [
		    Relay.QL`
		      fragment on CreateSalePayload {
		   	  	sales
		      }
		    `
		  ]
	    }];
	 }


  	getOptimisticResponse() {  		
	    return {
	      sales: {	        	      	
			salesmanId: this.props.salesmanId,
			categoryId: this.props.categoryId,
			statusId: this.props.statusId	        
	      }
	    }
  	}

}

export default CreateSaleMutation;*/