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
import EditCompany from './EditCompany';

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

    componentWillMount(){
      const { store, relay } = this.props;

      let categories = store.categoryConnection.edges.map(edge => {
        return edge.node.id;
      });

      relay.setVariables({categories, categories}); 
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

      const { relay } = this.props;

      var categories = relay.variables.categories;

      var category = {
        'categoryId': e.target.value,              
      };

      if(e.target.checked) {
        categories.push(category);
      }
      else{
        categories.splice(_.findIndex(categories, category), 1);    
      }

      relay.setVariables({categories, categories}); 

      //console.log(categories);   
    };

    editCompany = (companyId) => {   

      const { relay } = this.props;         

      relay.setVariables({showEditModal: true});  
      //relay.setVariables({selectedCompany: companyId});        
      //console.log(this.props);
    };
  
  	render() {

      const { store, relay } = this.props;

      let categories = store.categoryConnection.edges.map(edge => {
          return (
            <Category 
              key={edge.node.id} 
              category={edge.node} 
              onClick={this.changeCategory}
              checked={relay.variables.categories.indexOf(edge.node.id) >= 0} />
            );
      });

      let companies = store.companyConnection.edges.map(edge => {
          return (<Company key={edge.node.id} company={edge.node} onClick={this.editCompany} />);
      });

      //console.log(relay.variables.categories);

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
                    <EditCompany /> 
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
    selectedCompany: '',
    limit: 100,
    name: '',
    ssn: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    comment: '',        
    salesmen: [],
    categories: [],
    statuses: []
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
      },
      statusConnection(first: 100)
      {
        edges{
          node{
            id, 
            name
          }
        }
      },
      saleConnection(first: 100, salesmen: $salesmen, categories: $categories, statuses: $statuses)
      {
        edges
        {
          node {
            id,
            categoryId,
            statusId
          }          
        }
      }
     }
    `   
  }
 });

 export default Main;