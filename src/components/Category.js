import React from "react";
import Relay from "react-relay";

class Category extends React.Component {
	render() {
		let {category} = this.props;
		return(
			<li>{category.name}</li>
		);
	}
}

Category = Relay.createContainer(Category, {
	fragments: {
		category: () => Relay.QL`
			fragment on Category{
			  edges{
			  	 node{
			  	 	name
			  	 }
			  }			  
			}	
		`
	}
});

export default Category;