import React from "react";
import Relay from "react-relay";
import {Col, Input} from 'react-bootstrap';

class Category extends React.Component {
	render() {
		let {categoryx} = this.props;

		return(
			<Col>
               <Input
                key={categoryx.id}                
                type="checkbox"
                label={categoryx.name}
                value={categoryx.id} 
                checked={this.props.checked}
                //checked={categories.indexOf(category.id) >= 0}
                onClick={this.props.onClick}  />
             </Col>
		);
	}
}

Category = Relay.createContainer(Category, {
	fragments: {
		categoryx: () => Relay.QL`
			fragment on Category{
				id,			  
				name			 		 
			}	
		`
	}
});

export default Category;