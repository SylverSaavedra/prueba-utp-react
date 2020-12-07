import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const DetailsProductContext = createContext();

const DetailsProductProvider = (props) => {
	const [idProduct, setIdProduct] = useState(null);
	const [data, setProduct] = useState({});
	const [purchaseProducts, setPurchaseProducts] = useState([]);

	useEffect(() => {
		const getProduct = async () => {
			if (!idProduct) return;

			const url = `https://api.bestbuy.com/v1/products(sku=${idProduct})?apiKey=3z6a6dd2jyfjtrpkhdbsaayk&format=json`;

			const result = await axios.get(url);

			setProduct(result.data.products[0]);
		};
		getProduct();
	}, [idProduct]);

	return (
		<DetailsProductContext.Provider
			value={{
				data,
				purchaseProducts,
				setPurchaseProducts,
				setIdProduct,
				setProduct,
			}}>
			{props.children}
		</DetailsProductContext.Provider>
	);
};

export default DetailsProductProvider;
