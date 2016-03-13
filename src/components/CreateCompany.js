import React from 'react';
import Relay from 'react-relay';
import {Input, Button, Alert, DropDown} from 'react-bootstrap';
import _ from 'lodash';
import ToggleDisplay from 'react-toggle-display';

import CreateCompanyMutation from '../mutations/CreateCompanyMutation';
import Category from './Category';

class CreateCompany extends React.Component {

  componentWillMount(){
    const { store, relay } = this.props;  
    relay.setVariables({salesman: store.salesmanConnection.edges[0].node.id});
  }

  createCompany = (e) => {

    var onSuccess = (response) => {
      console.log(response);
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

  changeSalesman = (e) => {        
     this.props.relay.setVariables({salesman: e.target.value});
  };

	render() {

    const { store, relay } = this.props;

    //console.log('store');   
    console.log(this.props.store);

    let companies = store.companyConnection.edges.map(edge => {
      return (<div>{edge.node.id}</div>)
    });
      
    let salesmen = store.salesmanConnection.edges.map(edge => {      
      return (<option value={edge.node.id} key={edge.node.id}>{edge.node.name}</option>);
    });

    let categories = store.categoryConnection.edges.map(edge => {
      return (<Category key={edge.node.id} category={edge.node} />);
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
    salesman: ''
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