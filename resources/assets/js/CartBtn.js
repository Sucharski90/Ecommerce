import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Layout extends Component {
	constructor() {
		super();
		this.state = {
			name: 'Joe'
		};
	}
	clickedBtn = () => {};
	async test() {}
	render() {
		return (
				<div href="#" className="cart-link">
					Cart<div>4</div>
				</div>
		);
	}
}

const cartBtn = document.getElementById('cartBtn');

ReactDOM.render(<Layout />, cartBtn);
