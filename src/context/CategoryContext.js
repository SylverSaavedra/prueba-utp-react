import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CategoryContext = createContext();

const CategoryProvider = (props) => {
	const [categories, saveCategories] = useState([]);

	const obtenerCategories = async () => {
		const url = 'https://api.bestbuy.com/v1/categories?&format=json&apiKey=3z6a6dd2jyfjtrpkhdbsaayk';

		const categories = await axios.get(url);

		saveCategories(categories.data.categories);
	};

	useEffect(() => {
		obtenerCategories();
	}, []);

	return (
		<CategoryContext.Provider
			value={{
				categories,
			}}>
			{props.children}
		</CategoryContext.Provider>
	);
};

export default CategoryProvider;
