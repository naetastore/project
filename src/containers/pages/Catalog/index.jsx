import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardProduct from '../../organism/CardProduct';
import API from '../../../services';
import CatalogTemplate from '../../templates/CatalogTemplate';
import Loader from '../../../components/molecules/Loader';

class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderDisplay: '',
            isloading: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        const controller = new AbortController();
        controller.abort();
    }

    async getData() {
        if (this.props.categoriesData.length) return;
        const {
            setCategoriesData, setProductData
        } = this.props;

        this.setState({ isloading: true });

        const category = await this.getDataToAPI('category');
        const product = await this.getDataToAPI('product');
        setCategoriesData(category);
        setProductData(product);

        this.setState({ loaderDisplay: 'none', isloading: false });
    }

    async getDataToAPI(path, params) {
        try {
            const response = await API.GET(path, params);
            return response.data[path];
        } catch (err) {
            console.error(err);
        }
    }

    addToCart = product => {
        this.props.addToCart(product);
    }

    render() {
        return (
            this.state.isloading
                ? <Loader display={this.state.loaderDisplay} />
                :
                <CatalogTemplate
                    dataMenu={this.props.categoriesData}
                    menuHref="/catalog"
                    container={
                        <CardProduct
                            categoryId={this.props.match.params.id}
                            data={this.props.productData}
                            ngClick={this.addToCart}
                        />
                    }
                />
        );
    }

}

const mapStateToProps = state => ({
    categoriesData: state.categories,
    productData: state.product
});

const dispatch = dispatch => {
    return {
        setCategoriesData: data => dispatch({ type: "SET_CATEGORIES", data }),
        setProductData: data => dispatch({ type: "SET_PRODUCT", data }),
        addToCart: product => dispatch({ type: "ADD_TO_CART", product })
    }
}

export default connect(mapStateToProps, dispatch)(Catalog);