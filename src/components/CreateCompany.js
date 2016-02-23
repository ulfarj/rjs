import React from "react";
import Relay from "react-relay";
import {Input, Button, Alert, DropDown} from 'react-bootstrap';
import _ from 'lodash';

class CreateCompany extends React.Component {
	render() {
		//let {company} = this.props;
		return(
			<div>
				<div style={{display: 'flex', flexDirection: 'row',}}>
                   <Input type="text" label="Nafn" placeholder="Nafn" ref="name" style={{width: 250}} />
                   <Input type="text" label="Nafn samkvæmt rsk" placeholder="Rekstrarnafn" ref="namersk" style={{width: 250}} />
                 </div>
                 
                 <div style={{display: 'flex', flexDirection: 'row'}}>  
                   <Input type="text" label="Kennitala" placeholder="Kennitala" ref="ssn" style={{width: 250}} />
                   <Input type="text" label="Heimilisfang" placeholder="Heimilisfang" ref="address" style={{width: 250}} />
                   <Input type="text" label="Póstnúmer" placeholder="Póstnúmer" ref="postalCode" style={{width: 120}} />
                 </div>

                 <div style={{display: 'flex', flexDirection: 'row'}}>                   
                   <Input type="text" label="Sími" placeholder="Sími" ref="phone" style={{width: 250}} />
                   <Input type="text" label="Netfang" placeholder="Netfang" ref="email" style={{width: 250}} />
                 </div>

                 <Input type="textarea" label="Athugasemd" placeholder="Athugasemd" ref="comment" />

                 <Button onClick={this.createCompany} bsStyle="primary">Skrá</Button>
			</div>
		);
	}
}

export default CreateCompany;