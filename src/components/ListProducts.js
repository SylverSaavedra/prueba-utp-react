import React, { useContext } from 'react';

import { Grid, makeStyles } from '@material-ui/core';

import Product from './Product';

import { ProductsContext } from '../context/ProductsContext';

const useStyles = makeStyles((theme) => ({
	root: {},
}));

const ListProducts = () => {
	const { products } = useContext(ProductsContext);

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				{products.map((product) => (
					<Grid item xs key={product.sku}>
						<Product key={product.sku} product={product} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default ListProducts;
