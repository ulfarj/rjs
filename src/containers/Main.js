import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";

export default class Main extends React.Component {
	constructor(props) {
	    super(props);
  	}

  	render() {
      let content = this.props.store.categoryConnection.edges.map(edge => {
          return (<div>{edge.node.name}</div>);
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
      categoryConnection {
        edges {
          id,
          name
        }
      }
     }
    `   
  }
 });

 export default Main;