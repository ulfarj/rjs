import Relay from 'react-relay';

class CreateSaleMutation extends Relay.Mutation {
	getMutation() {		
	    return Relay.QL`
	      mutation { createSale }
	    `;
  	}

	getVariables() {					
	    return {
	      companyId: this.props.companyId,
		  salesmanId: this.props.salesmanId,
		  categoryId: this.props.categoryId,
		  statusId: this.props.statusId
	    }
  	}

  	getFatQuery() {  		
	    return Relay.QL`
	      fragment on CreateSalePayload {
	        saleEdge,
	        store { saleConnection }
	      }
	    `;
  	}

  	getConfigs() {
	    return [{
	     type: 'REQUIRED_CHILDREN',
		 children: [
		    Relay.QL`
		      fragment on CreateSalePayload {
		   	    saleEdge
		      }
		    `
		  ]
	    }];
	 }

  	getOptimisticResponse() {  		
	    return {
	      saleEdge: {
	        node: {
	          companyId: this.props.companyId,
			  salesmanId: this.props.salesmanId,
			  categoryId: this.props.categoryId,
			  statusId: this.props.statusId
	        }
	      }
	    }
  	}

}

export default CreateSaleMutation;