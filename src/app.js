import React from "react";
import ReactDOM from "react-dom";
import Relay from 'react-relay';

import Main from "./containers/Main";

ReactDOM.render(<Main />, document.getElementById('react'));

//console.log('test');

console.log(
	Relay.QL`	
		query Test{
			categories {
				_id
			}
		}	
	
	`
);