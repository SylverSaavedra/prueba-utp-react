import React, { useContext, useState } from 'react';
import { CategoryContext } from '../context/CategoryContext';
import { ProductsContext } from '../context/ProductsContext';

import { Button, CircularProgress, makeStyles, Select, TextField, Typography } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '0 40px',
	},
	button: {
		margin: theme.spacing(1),
		background: '#a4d331',
		'&:hover': {
			backgroundColor: '#5A7419',
			boxShadow: 'none',
		},
	},
}));

const FormAction = () => {
	const classes = useStyles();

	const [search, setSearch] = useState({
		name: '',
		category: '',
	});

	const { categories } = useContext(CategoryContext);
	const { searchProducts, setConsult } = useContext(ProductsContext);

	const getProductInformation = (e) => {
		setSearch({
			...search,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				searchProducts(search);
				setConsult(true);
			}}>
			<div>
				<Typography variant='h5'>Buscar Productos por Categoría o Nombre</Typography>
			</div>

			<div className={classes.container}>
				<div>
					<TextField id='name' name='name' label='Busca por producto' onChange={getProductInformation}></TextField>
				</div>
				<div>
					<Select
						native
						inputProps={{
							name: 'category',
							id: 'category-native-simple',
						}}
						onChange={getProductInformation}>
						<option value=''>Selecciona Categoría</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</Select>
				</div>
				<div>
					<Button type='submit' className={classes.button} startIcon={<SearchIcon />}>
						Buscar Productos
					</Button>
				</div>
			</div>
		</form>
	);
};

export default FormAction;
