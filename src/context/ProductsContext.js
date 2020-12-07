import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductsContext = createContext();

const ProductsProvider = (props) => {
	const [products, saveProducts] = useState([]);
	const [search, searchProducts] = useState({
		name: '',
		category: '',
		state: false,
	});
	const [consult, setConsult] = useState(false);

	useEffect(() => {
		if (consult) {
			const getProducts = async () => {
				let url = '';
				if (search.name === '' && search.category === '') {
					url = `https://api.bestbuy.com/v1/products?apiKey=3z6a6dd2jyfjtrpkhdbsaayk&format=json`;
				} else {
					if (search.name === '') {
						url = `https://api.bestbuy.com/v1/products((categoryPath.id=${search.category}))?apiKey=3z6a6dd2jyfjtrpkhdbsaayk&format=json`;
					} else if (search.category === '') {
						url = `https://api.bestbuy.com/v1/products((search=${search.name}))?apiKey=3z6a6dd2jyfjtrpkhdbsaayk&format=json`;
					} else {
						url = `https://api.bestbuy.com/v1/products((search=${search.name})&(categoryPath.id=${search.category}))?apiKey=3z6a6dd2jyfjtrpkhdbsaayk&format=json`;
					}
				}

				const result = await axios.get(url);
				saveProducts(result.data.products);
			};

			getProducts();
		}
	}, [search]);

	return (
		<ProductsContext.Provider
			value={{
				products,
				searchProducts,
				setConsult,
			}}>
			{props.children}
		</ProductsContext.Provider>
	);
};

export default ProductsProvider;
