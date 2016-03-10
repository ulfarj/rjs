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

    changeCategory = (e) => {

    };
  
  	render() {

      const { store, relay } = this.props;

      let categories = store.categoryConnection.edges.map(edge => {
          return (<Category key={edge.node.id} category={edge.node} />);
      });

      let companies = store.companyConnection.edges.map(edge => {
          return (<Company key={edge.node.id} company={edge.node} />);
      });

  		return (
  			<div>
           <div style={styles.headerArea}>
              <div style={{width: 120}}>
                <Button
                  bsStyle="primary"                        
                  onClick={e => relay.setVariables({showSelectCategories: !relay.variables.showSelectCategories})}>
                    Velja Verk
                </Button>
              </div>
                
              <div style={{width: 100}}> 
                <Button 
                  onClick={e => relay.setVariables({showCreateCompanyModal: true})} 
                  bsStyle="primary">
                    Skrá verk
                </Button>
                <Modal 
                  show={relay.variables.showCreateCompanyModal} 
                  onHide={e => relay.setVariables({showCreateCompanyModal: false})} 
                  bsSize="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Skrá verk</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CreateCompany store={store} />
                  </Modal.Body>
                </Modal>
              </div>   

              <div>
                <Modal 
                  show={relay.variables.showEditModal} 
                  onHide={e => relay.setVariables({showEditModal: false})} 
                  bsSize="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Verk</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    
                  </Modal.Body>
                </Modal>
              </div>

              <div style={{paddingLeft: '40', width: 300}}>
                <label>
                  <h4>
                    Fjöldi færslna: 
                  </h4>
                </label>
              </div>
           </div>

            <div>
              <div>
                <Panel collapsible expanded={relay.variables.showSelectCategories}>
                  <Grid>
                    <Row>
                      <Col>
                        <Input 
                          type="checkbox" 
                          label='Sýna alla flokka' 
                          value='showall' 
                          checked={relay.variables.showAllCategories} 
                          onClick={e => this.changeCategory(e)} />
                      </Col>                      
                      {categories}
                    </Row>
                  </Grid>
                </Panel>
              </div>
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
    showEditModal: false,
    showSelectCategories: false,
    showAllCategories: true,
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
      },
      salesmanConnection(first: 100) {
        edges{
          node{
            id,
            name       
          }
        }
      }
     }
    `   
  }
 });

 export default Main;