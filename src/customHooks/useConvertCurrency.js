export const useConvertCurrency = (mount) => {
	if (mount === '' || mount === undefined || mount === null) {
		return 'Loading...';
	}

	return 'S/ ' + mount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export default useConvertCurrency;
