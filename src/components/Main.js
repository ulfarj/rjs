import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, 
Panel, Modal, Grid, Row, Col} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';  
import _ from 'lodash';

import Company from './Company';
import Category from './Category'; 
import CreateCompany from './CreateCompany';

const styles = {
  input: {
    border: 0        
  },
  tbody: {
    border: 0
  },
  gridArea: {
    paddingTop: 20
  },
  headerArea: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  editDialog: {
    width: '90%'
  }
};

export default class Main extends React.Component {
	  constructor(props) {
	    super(props);

      this.filter = _.debounce(this.filter, 300);         
  	}

    filterRow = (e) => {
      var filter = Object();
      filter[e.target.name] = e.target.value;
      this.filter(filter);
    };

    filter = (filter) => {      
      this.props.relay.setVariables(filter);
    };

    openCreateCompanyModal = (e) => {      
      this.props.relay.setVariables({showCreateCompanyModal: true});    
    };    

    closeCreateCompanyModal = (e) => {
      this.props.relay.setVariables({showCreateCompanyModal: false}); 
    };

  	render() {
      let categories = this.props.store.categoryConnection.edges.map(edge => {
          return (<Category key={edge.node.id} category={edge.node} />);
      });

      let companies = this.props.store.companyConnection.edges.map(edge => {
          return (<Company key={edge.node.id} company={edge.node} />);
      });

  		return (
  			<div>
           <div style={styles.headerArea}>
              <Button onClick={e => this.openCreateCompanyModal(e)} bsStyle="primary">Skrá verk</Button>

              <Modal show={this.props.relay.variables.showCreateCompanyModal} onHide={e => this.closeCreateCompanyModal(e)} bsSize="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Skrá verk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CreateCompany store={this.props.store} />
                </Modal.Body>
              </Modal>     
           </div>
           <div style={styles.gridArea}>
             <Table striped bordered condensed hove responsive>
                  <thead>
                    <tr>
                      <th>Sölumaður</th>
                      <th>Staða</th>
                      <th>Nafn</th>                       
                      <th>Kennitala</th>                                       
                      <th>Heimilisfang</th>                   
                      <th>Póstnúmer</th>
                      <th>Sími</th>
                      <th>Netfang</th>
                      <th>Athugasemd</th>                                     
                    </tr>
                  </thead>     
                  <tbody>
                    <tr>                      
                      <td>                        
                        <select style={{border:0, height: 30}} onChange={this.filterRow} name="salesman">
                          <option value="">Sýna allt</option>
                            
                        </select>
                      </td>
                      <td>
                        <select style={{border:0, height: 30}} onChange={this.filterRow} name="status">
                          <option value="">Sýna allt</option>
                            
                        </select>                        
                      </td>
                      <td><Input type="text" style={styles.input} onChange={this.filterRow} name="name" /></td>                      
                      <td><Input type="text" style={styles.input} onChange={this.filterRow} name="ssn" /></td>
                      <td><Input type="text" style={styles.input} onChange={this.filterRow} name="address" /></td>
                      <td><Input type="text" style={styles.input} onChange={this.filterRow} name="postalCode" /></td>
                      <td><Input type="text" style={styles.input} onChange={this.filterRow} name="phone" /></td>
                      <td><Input type="text" style={styles.input} onChange={this.filterRow} name="email" /></td>
                      <td><Input type="text" style={styles.input} onChange={this.filterRow} name="comment" /></td>
                    </tr>                    
                      {companies}                  
                  </tbody>
                </Table>
              </div>
        </div>
  		);	
  	}
 }

 Main = Relay.createContainer(Main, {
  initialVariables: {
    showCreateCompanyModal: false,
    limit: 100,
    name: '',
    ssn: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    comment: ''
  },
  fragments: {
    store: () => Relay.QL`
     fragment on Store {
      id,
      categoryConnection(first: $limit) {
        edges{
          node{
            id,
            ${Category.getFragment('category')}        
          }
        }
      },
      companyConnection(first: $limit, name: $name, ssn: $ssn, email: $email, phone: $phone, 
        address: $address, postalCode: $postalCode, comment: $comment) {
        edges{
          node{
            id,                 
            ${Company.getFragment('company')}
          }        
        }
      }
     }
    `   
  }
 });

 export default Main;