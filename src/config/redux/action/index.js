import store from '../store';
import API from '../../../services';

const getGlobal = async () => {
    try {
        const gen = await API.GET('general');
        await store.dispatch({ type: 'SET_GLOBAL', data: gen.data.general });
    } catch (err) {
        console.error(err);
    }
}

const getSuggested = async () => {
    try {
        const sug = await API.GET('product', { suggested: true });
        await store.dispatch({ type: 'SET_SUGGESTED', data: sug.data.product });
    } catch (err) {
        console.error(err);
    }
}

const getCategory = async () => {
    try {
        const ctr = await API.GET('category');
        await store.dispatch({ type: 'SET_CATEGORY', data: ctr.data.category });
    } catch (err) {
        console.error(err);
    }
}

const getProduct = async () => {
    try {
        const prd = await API.GET('product');
        await store.dispatch({ type: 'SET_PRODUCT', data: prd.data.product });
    } catch (err) {
        console.error(err);
    }
}

const action = {
    getGlobal,
    getSuggested,
    getCategory,
    getProduct
};

export default action;