import React from "react";
import Relay from "react-relay";

class Company extends React.Component {
	render() {
		let {company} = this.props;
		return(
			<tr>
				<td>{company.name}</td>
			</tr>
		);
	}
}

Company = Relay.createContainer(Company, {
	fragments: {
		company: () => Relay.QL`
			fragment on Company{
			  name		
			}	
		`
	}
});

export default Company;