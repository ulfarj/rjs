import React from "react";
import Relay from "react-relay";
import {Col, Input} from 'react-bootstrap';

class Category extends React.Component {
	render() {
		let {category} = this.props;

		return(
			<Col>
               <Input
                key={category.id}                
                type="checkbox"
                label={category.name}
                value={category.id} 
                checked={this.props.checked}
                //checked={categories.indexOf(category.id) >= 0}
                onClick={this.props.onClick}  />
             </Col>
		);
	}
}

Category = Relay.createContainer(Category, {
	fragments: {
		category: () => Relay.QL`
			fragment on Category{
				id,			  
				name			 		 
			}	
		`
	}
});

export default Category;