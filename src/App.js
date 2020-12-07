import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import ListProducts from './components/ListProducts';
import FormAction from './components/FormAction';
import Header from './components/Header';

import ProductsProvider from './context/ProductsContext';
import LoadingProvider, { LoadingContext } from './context/LoadingContext';
import DetailsProductProvider from './context/DetailsProductContext';
import CategoryProvider from './context/CategoryContext';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

function App() {
	const { loadingCount } = useContext(LoadingContext);
	const classes = useStyles();
	return (
		<LoadingProvider>
			{loadingCount > 0 && <CircularProgress />}
			<CategoryProvider>
				<ProductsProvider>
					<DetailsProductProvider>
						<Header />
						<FormAction />
						<ListProducts />
					</DetailsProductProvider>
				</ProductsProvider>
			</CategoryProvider>
		</LoadingProvider>
	);
}

export default App;
