import React from 'react';
import Relay from 'react-relay';
import {Input, Button, Alert, DropDown, Col} from 'react-bootstrap';
import _ from 'lodash';
import ToggleDisplay from 'react-toggle-display';

import CreateCompanyMutation from '../mutations/CreateCompanyMutation';
import CreateSaleMutation from '../mutations/CreateSaleMutation';

import Category from './Category';

class CreateCompany extends React.Component {

  componentWillMount(){
    const { store, relay } = this.props;  
    relay.setVariables({salesman: store.salesmanConnection.edges[0].node.id});
  }

  createCompany = (e) => {

    var onSuccess = (response) => {

      var companyId = response.createCompany.companyEdge.cursor;
      this.createSales(companyId);
      console.log('Mutation successful!');
    };

    var onFailure = (transaction) => {
      //var error = transaction.getError() || new Error('Mutation failed.');
      console.log(transaction.getError());
    };

    Relay.Store.commitUpdate(
      new CreateCompanyMutation({
        name: this.refs.name.getValue(),
        ssn: this.refs.ssn.getValue(),
        address: this.refs.address.getValue(), 
        postalCode: this.refs.postalCode.getValue(),
        phone: this.refs.phone.getValue(), 
        email: this.refs.email.getValue(), 
        comment: this.refs.comment.getValue(),
        store: this.props.store
      }), {onSuccess, onFailure}
    );    
  };

  createSales = (companyId) => {
    
    const { relay } = this.props;

    const statusId = '56b6196af7ec61807b2fdffb';

    relay.variables.categories.map(function(category){
      this.createSale(companyId, category.salesmanId, category.categoryId, statusId);
    }.bind(this));

    this.props.onCreate();
  };

  createSale = (companyId, salesmanId, categoryId, statusId) => {

    var onSuccess = (response) => {      
      console.log('Mutation sales successful!');
    };

    var onFailure = (transaction) => {
      //var error = transaction.getError() || new Error('Mutation failed.');
      console.log(transaction.getError());
    };

    Relay.Store.commitUpdate(
      new CreateSaleMutation({
        companyId: companyId,
        salesmanId: salesmanId,
        categoryId: categoryId,
        statusId: statusId,         
        store: this.props.store
      }), {onSuccess, onFailure}
    );

  };

  changeSalesman = (e) => {        
     this.props.relay.setVariables({salesman: e.target.value});
  };

  changeCategory = (e) => {
    
    const { relay } = this.props;

    var categories = relay.variables.categories;

    var category = {
      'categoryId': e.target.value,  
      'salesmanId': relay.variables.salesman,      
    };

    if(e.target.checked) {
      categories.push(category);
    }
    else{
      categories.splice(_.findIndex(categories, category), 1);    
    }

    relay.setVariables({categories, categories});
  };

	render() {

    const { store, relay } = this.props;
      
    let salesmen = store.salesmanConnection.edges.map(edge => {      
      return (<option value={edge.node.id} key={edge.node.id}>{edge.node.name}</option>);
    });

    let categories = store.categoryConnection.edges.map(edge => {
      return (<Category key={edge.node.id} category={edge.node} onClick={this.onClick} />);
    })

    let categoriesBySalesman = store.salesmanConnection.edges.map(edge => {      
      return(
          <ToggleDisplay show={relay.variables.salesman === edge.node.id} key={edge.node.id}>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              { categories }
            </div>
          </ToggleDisplay>
        );
    });

		return(
			<div>

          {categoriesBySalesman}

          <div style={{display: 'flex', flexDirection: 'row',}}>
            <Input type="select" ref="salesman" label="Sölumaður" onChange={this.changeSalesman} style={{width: 250}}>
              {salesmen}
            </Input>                                     
          </div>
        
				  <div style={{display: 'flex', flexDirection: 'row',}}>
            <Input type="text" label="Nafn" placeholder="Nafn" ref="name" style={{width: 250}} />
            <Input type="text" label="Nafn samkvæmt rsk" placeholder="Rekstrarnafn" ref="namersk" style={{width: 250}} />
           </div>
                 
           <div style={{display: 'flex', flexDirection: 'row'}}>  
            <Input type="text" label="Kennitala" placeholder="Kennitala" ref="ssn" style={{width: 250}} />
            <Input type="text" label="Heimilisfang" placeholder="Heimilisfang" ref="address" style={{width: 250}} />
            <Input type="text" label="Póstnúmer" placeholder="Póstnúmer" ref="postalCode" style={{width: 120}} />
           </div>

           <div style={{display: 'flex', flexDirection: 'row'}}>                   
            <Input type="text" label="Sími" placeholder="Sími" ref="phone" style={{width: 250}} />
            <Input type="text" label="Netfang" placeholder="Netfang" ref="email" style={{width: 250}} />
           </div>

           <Input type="textarea" label="Athugasemd" placeholder="Athugasemd" ref="comment" />

           <Button onClick={this.createCompany} bsStyle="primary">Skrá</Button>
        
			</div>
		);
	}
}

CreateCompany = Relay.createContainer(CreateCompany, {
  initialVariables: {
    salesman: '',
    categories: []
  },
  fragments: {
    /*store: () => Relay.QL`
     fragment on Store {
      id,
      companyConnection(first: 100) {
        edges{
          node{
            id,
            name            
          }
        }
      }
    }
    ` */     
  }
});

export default CreateCompany;