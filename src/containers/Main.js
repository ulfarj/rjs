import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";

export default class Main extends React.Component {
	constructor(props) {
	    super(props);

	    //this.state = _getAppState();
	    //this.onChange = this.onChange.bind(this);
  	}

  	render() {
      let content = this.props.store.categories.map(category => {
          return (<div>{category.name}</div>);
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
        name
      }
     }
    `   
  }
 });

 export default Main;