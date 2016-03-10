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
                //checked={categories.indexOf(category.id) >= 0}
                onClick={e => this.changeCategory(category.id, e)}  />
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