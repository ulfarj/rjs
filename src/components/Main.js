import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, 
Panel, Modal, Grid, Row, Col} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';  
import _ from 'lodash';

import Category from './Category'; 

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
  	}

  	render() {
      let content = this.props.store.categories.map(category => {
          return (<Category key={category._id} category={category} />);
      });

  		return (
  			<div>
          {content}
        </div>
  		);	
  	}
 }

 Main = Relay.createContainer(Main, {
  fragments: {
    store: () => Relay.QL`
     fragment on Store {
      categories {
        _id,
        ${Category.getFragment('category')}        
      }
     }
    `   
  }
 });

 export default Main;