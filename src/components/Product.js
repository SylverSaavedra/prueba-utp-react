import React, { useContext, useEffect, useState } from 'react';

import { DetailsProductContext } from '../context/DetailsProductContext';

import useConvertCurrency from '../customHooks/useConvertCurrency';

import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Dialog,
	DialogActions,
	DialogTitle,
	makeStyles,
	Modal,
	Typography,
} from '@material-ui/core';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		background: '#a4d331',
		height: 'auto',
		'&:hover': {
			backgroundColor: '#5A7419',
			boxShadow: 'none',
		},
	},
	containerActions: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		justifyItems: 'space-between',
	},
	containerDetails: {
		display: 'grid',
		gridTemplateColumns: '70% 30%',
		gridGapColumn: '10px',
		gridTemplateRows: 'auto',
	},
	media: {
		height: 140,
	},
	paper: {
		position: 'absolute',
		width: 450,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	root: {
		maxWidth: 345,
		minWidth: 300,
	},
}));

const Product = ({ product }) => {
	const { purchaseProducts, setIdProduct, setProduct, setPurchaseProducts } = useContext(DetailsProductContext);

	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);
	const [openConfirm, setOpenConfirm] = useState(false);
	const [exist, setExist] = useState(false);

	const classes = useStyles();

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirmOpen = () => {
		setOpenConfirm(true);
	};

	const handleConfirmClose = () => {
		setOpenConfirm(false);
	};

	const addProductBag = () => {
		setPurchaseProducts((prevState) => [...prevState, { id: product.sku, name: product.name, state: true }]);
	};

	const checkIfProductExist = (sku) => {
		return purchaseProducts.filter((prod) => prod.id === sku).length > 0;
	};

	const deleteProductBag = () => {
		const purchaseProductsNew = purchaseProducts.filter((purchaseProduct) => {
			return purchaseProduct.id !== product.sku;
		});

		setPurchaseProducts(purchaseProductsNew);
	};
	useEffect(() => {
		if (checkIfProductExist(product.sku)) {
			setExist(true);
		} else {
			setExist(false);
		}
	}, [purchaseProducts]);

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia className={classes.media} image={product.image} title={`Imagen de ${product.name}`} />
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{product.name}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='p'>
						{product.longDescription}
					</Typography>
					<Typography align='right'>{useConvertCurrency(product.regularPrice)}</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.containerActions}>
				<Button
					size='small'
					color='primary'
					onClick={() => {
						setIdProduct(product.sku);
						handleOpen();
					}}>
					Vista Previa
				</Button>
				{exist ? (
					<>
						<Button type='button' className={classes.button} onClick={handleConfirmOpen}>
							Eliminar
						</Button>
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
										deleteProductBag(product);
									}}
									color='primary'
									autoFocus>
									Aceptar
								</Button>
							</DialogActions>
						</Dialog>
					</>
				) : (
					<Button
						type='button'
						className={classes.button}
						onClick={() => {
							addProductBag(product);
						}}>
						Agregar
					</Button>
				)}
			</CardActions>
			<Modal
				open={open}
				onClose={() => {
					setIdProduct(null);
					setProduct({});
					handleClose();
				}}>
				<div style={modalStyle} className={classes.paper}>
					<CardActionArea>
						<CardMedia className={classes.media} image={product.image} title={`Imagen de ${product.name}`} />
						<CardContent className={classes.containerDetails}>
							<Typography gutterBottom variant='h5' component='h5'>
								{product.name}
							</Typography>
							<Typography align='right'>{useConvertCurrency(product.regularPrice)}</Typography>
						</CardContent>
						<CardContent>
							<Typography variant='body2' color='textSecondary' component='p'>
								{product.longDescription}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActionArea>
						{exist ? (
							<>
								<Button type='button' className={classes.button} onClick={handleConfirmOpen}>
									Eliminar
								</Button>
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
												deleteProductBag(product);
											}}
											color='primary'
											autoFocus>
											Aceptar
										</Button>
									</DialogActions>
								</Dialog>
							</>
						) : (
							<Button
								type='button'
								className={classes.button}
								onClick={() => {
									addProductBag(product);
								}}>
								Agregar
							</Button>
						)}
					</CardActionArea>
				</div>
			</Modal>
		</Card>
	);
};

export default Product;
