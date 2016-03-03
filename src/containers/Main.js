import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";

export default class Main extends React.Component {
	constructor(props) {
	    super(props);
  	}

  	render() {
      /*let content = this.props.store.categoryConnection.edges.map(edge => {
          return (<div>{edge.node.name}</div>);
      });*/

  		return (
  			<div>
          
        </div>
  		);	
  	}
 }

 Main = Relay.createContainer(Main, {
  initialVariables: {
    limit: 100,
    query: ''
  },
  fragments: {
    store: () => Relay.QL`
     fragment on Store {
      categoryConnection(first: $limit, query: $query) {
        edges {
          node {
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