import React from "react";
import ReactDOM from "react-dom";
import Relay from 'react-relay';

import Main from "./containers/Main";

class HomeRoute extends Relay.Route {
	static routeName = 'Home';
	static queries = {
		store: (Component) => Relay.QL`
			query MainQuery {
				store { ${Component.getFragment('store')}}
			}
		`	
	};
}

ReactDOM.render(
	<Relay.RootContainer
      Component={Main}
      route={new HomeRoute()} />, 
	document.getElementById('react')
);

//console.log('test');

/*
console.log(
	Relay.QL`	
		query Test{
			categories {
				_id
			}
		}	
	
	`
);*/