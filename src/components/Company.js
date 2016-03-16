import React from "react";
import Relay from "react-relay";

class Company extends React.Component {

	onClick = (companyId) => {
		//console.log(e.target.attributes.getNamedItem('value'));
		//console.log(companyId);

		this.props.onClick(companyId);
	};

	render() {
		let {company} = this.props;
		return(
			<tr>
				<td></td>
				<td>
					<svg width="100" height="16">
					 	<circle cx="10" cy="8" r="6" stroke="black" stroke-width="1" fill="yellow"><title>Vinnsla</title></circle>
					 	<circle cx="25" cy="8" r="6" stroke="black" stroke-width="1" fill="red"><title>Nei</title></circle>
					 	<circle cx="40" cy="8" r="6" stroke="black" stroke-width="1" fill="blue"><title>Já</title></circle>
					 	<circle cx="55" cy="8" r="6" stroke="black" stroke-width="1" fill="green"><title>Athuga</title></circle>
					</svg> 					
				</td>
				<td onClick={e => this.onClick(company.id)}>{company.name}</td>
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
				id,			  
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