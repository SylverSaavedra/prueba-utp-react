import React, { useContext, useEffect, useState } from 'react';

import { DetailsProductContext } from '../context/DetailsProductContext';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ClearIcon from '@material-ui/icons/Clear';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'grid',
		gridTemplateColumns: '90% 10%',
		gridGap: theme.spacing(3),
		background: '#a4d331',
		color: 'white',
		textAlign: 'left',
		padding: '20px 40px',
	},
	containerIconShop: {
		display: 'grid',
		gridTemplateColumns: 'auto auto',
		gridGap: '10px',
		margin: 'auto auto',
	},
}));

const Header = () => {
	const classes = useStyles();
	const [count, setCount] = useState(0);
	const [openConfirm, setOpenConfirm] = useState(false);

	const { purchaseProducts, setPurchaseProducts } = useContext(DetailsProductContext);

	useEffect(() => {
		setCount(purchaseProducts.length);
	}, [purchaseProducts]);

	const handleConfirmOpen = () => {
		setOpenConfirm(true);
	};

	const handleConfirmClose = () => {
		setOpenConfirm(false);
	};

	const deleteProductBag = (productItem) => {
		const purchaseProductsNew = purchaseProducts.filter((purchaseProduct) => {
			return purchaseProduct.id !== productItem.id;
		});

		setPurchaseProducts(purchaseProductsNew);
	};

	return (
		<header className={classes.container}>
			<Typography variant='h5'>Tienda Online de Bebidas</Typography>
			<div className={classes.containerIconShop}>
				<span>{count}</span>
				<div className='boxOptions'>
					<ShoppingCartIcon />
					<ul>
						<li>
							<div className='boxContentText textTitleCardShopping'>
								<span></span>
								<span onClick={handleConfirmOpen}>Vaciar</span>
								<Dialog
									open={openConfirm}
									onClose={handleConfirmClose}
									aria-labelledby='alert-dialog-title'
									aria-describedby='alert-dialog-description'>
									<DialogTitle id='alert-dialog-title'>{'Está seguro de realizar esta acción?'}</DialogTitle>
									<DialogActions>
										<Button type='button' onClick={handleConfirmClose} color='primary'>
											Cancelar
										</Button>
										<Button
											type='button'
											onClick={() => {
												handleConfirmClose();
												setPurchaseProducts([]);
											}}
											color='primary'
											autoFocus>
											Aceptar
										</Button>
									</DialogActions>
								</Dialog>
								<div className='boxContentTextTitle'>
									<span>Carrito</span>
								</div>
							</div>
							{purchaseProducts.length > 0 &&
								purchaseProducts.map((pProduct) => (
									<div key={`content${pProduct.id}`} className='containerProduct'>
										<div key={`name${pProduct.id}`} className='containerTextCart'>
											{pProduct.name}
										</div>
										<div
											key={`icon${pProduct.id}`}
											onClick={() => {
												deleteProductBag(pProduct);
											}}>
											<ClearIcon style={{ fontSize: 15 }} />
										</div>
									</div>
								))}
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
};

export default Header;
