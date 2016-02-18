import React from "react";
import ReactDOM from "react-dom";
import Relay from 'react-relay';

import Main from "./containers/Main";

ReactDOM.render(<Main />, document.getElementById('react'));

console.log(
	Relay.QL`
	{
		categories {
			_id
		}
	}
	`
);