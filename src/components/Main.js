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

      if(e.target.checked) {
        categories.push(e.target.value);
      }
      else{        
        categories.splice(_.indexOf(categories, e.target.value), 1);    
      }

      relay.setVariables({categories, categories});

      console.log('set variables'); 
    };

    toggleAllCategories = (e) => {

      const { relay, store } = this.props;

      var showAllCategories = !relay.variables.showAllCategories;

      relay.setVariables({showAllCategories: showAllCategories});    

      let categories = [];

      if(showAllCategories){
         categories = store.categoryConnection.edges.map(edge => {
          return edge.node.id;
        });
      }

      relay.setVariables({categories, categories}); 
    };

    editCompany = (companyId) => {   

      const { relay } = this.props;         

      relay.setVariables({showEditModal: true}); 
      relay.setVariables({editCompanyId: companyId});              
    };

    onCreateCompany = () => {
      const { relay } = this.props;

      relay.setVariables({showCreateCompanyModal: false});
    };
  
  	render() {

      const { store, relay } = this.props;

      let categories = store.categoryConnection.edges.map(edge => {
          return (
            <Category 
              key={edge.node.id} 
              category={edge.node} 
              onClick={e => this.changeCategory(e)}
              checked={relay.variables.categories.indexOf(edge.node.id) >= 0} />
            );
      });
      

      let companies = store.companyConnection.edges.map(edge => {

          let sales = edge.node.sales.map(sale => {
                                     
            var status = _.filter(store.statusConnection.edges, {node: {id: sale.statusId}});
            var category = _.filter(store.categoryConnection.edges, {node: {id: sale.categoryId}});
            var salesman = _.filter(store.salesmanConnection.edges, {node: {id: sale.salesmanId}});
            
            return {
              status: status[0].node.name,
              color: status[0].node.color,              
              selected: _.indexOf(relay.variables.categories, sale.categoryId) > -1,
              category: category[0].node.name,
              salesman: salesman[0].node.name
            }
          });

          return (
            <Company 
              key={edge.node.id} 
              company={edge.node}
              sales={sales} 
              onClick={this.editCompany} />
            );

      });
      
  		return (
  			<div>
           <div style={styles.headerArea}>
              <div style={{width: 120}}>
                <Button
                  bsStyle="primary"                        
                  onClick={e => relay.setVariables({showSelectCategories: !relay.variables.showSelectCategories})}>
                    Velja flokka
                </Button>
              </div>
                
              <div style={{width: 100}}> 
                <Button 
                  onClick={e => relay.setVariables({showCreateCompanyModal: true})} 
                  bsStyle="primary">
                    Skrá fyrirtæki
                </Button>
                <Modal 
                  show={relay.variables.showCreateCompanyModal} 
                  onHide={e => relay.setVariables({showCreateCompanyModal: false})} 
                  bsSize="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Skrá fyrirtæki</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CreateCompany store={store} onCreate={this.onCreateCompany} />
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
                    <EditCompany store={store} companyId={relay.variables.editCompanyId}/> 
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
                          onClick={e => this.toggleAllCategories(e)} />
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
    showSelectCategories: true,
    showAllCategories: true,
    editCompanyId: '',
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
      ${EditCompany.getFragment('store')},
      categoryConnection(first: $limit) {
        edges{
          node{
            id,
            name,            
            ${Category.getFragment('category')},          
          }
        }
      },
      companyConnection(first: $limit, name: $name, ssn: $ssn, email: $email, phone: $phone, 
        address: $address, postalCode: $postalCode, comment: $comment, categories: $categories) {
        edges{
          node{
            id,                 
            ${Company.getFragment('company')},
            sales {
              categoryId
              salesmanId
              statusId
            }             
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
            name,
            color
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