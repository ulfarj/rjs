import React from "react";
import Relay from "react-relay";

class Company extends React.Component {

	onClick = (companyId) => {
		this.props.onClick(companyId);
	};

	render() {
		let {company, sales} = this.props;

		let x = 0;
		let cx = 0;
		let statuses = sales.map(sale => {

			x = x + 15;
			if(sale.selected)
			{
				return (
					<rect width="12" height="12" x={x} y="3" stroke="black" strokeWidth="1" fill={sale.color}>
						<title>{sale.category} - {sale.salesman} - {sale.status}</title>
					</rect>
					);
			}
						
			cx = cx + 15;										
			return (
				<circle cx={cx} cy="8" r="6" stroke="black" strokeWidth="1" fill={sale.color}>
					<title>{sale.category} - {sale.salesman} - {sale.status}</title>
				</circle>
			);
		});
	
		return(
			<tr>
				<td></td>
				<td>					 
					<svg width="100" height="16">					
						{statuses}
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