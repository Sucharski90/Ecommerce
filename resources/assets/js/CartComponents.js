import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducer from './reducers/allReducer';
import CartBtn from './components/CartBtn';
import CartPopup from './components/CartPopup';

const store = createStore(allReducer);

ReactDOM.render(
	<Provider store={store}>
		<CartBtn />
	</Provider>,
	document.getElementById('CartBtnRoot')
);
ReactDOM.render(
	<Provider store={store}>
		<CartPopup />
	</Provider>,
	document.getElementById('CartPopupRoot')
);
