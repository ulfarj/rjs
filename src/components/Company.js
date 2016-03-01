import React from "react";
import Relay from "react-relay";

class Company extends React.Component {
	render() {
		let {company} = this.props;
		return(
			<tr>
				<td></td>
				<td></td>
				<td>{company.name}</td>
				<td>{company.ssn}</td>
				<td>{company.address}</td>
				<td>{company.postalCode}</td>
				<td>{company.phone}</td>
				<td>{company.email}</td>
				<td>{company.comment}</td>
			</tr>
		);
	}
}

Company = Relay.createContainer(Company, {
	fragments: {
		company: () => Relay.QL`
			fragment on Company{			  
				name,
				ssn,
				address,
				postalCode,
				phone,
				email,
				comment					 			 
			}	
		`
	}
});

export default Company;