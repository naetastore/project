import React from 'react';
import { REST } from '../../../config/REST';
import API from '../../../services';
import { connect } from 'react-redux';
import Categories from '../../organism/Categories';
import Wrapper from '../../organism/Wrapper';
import Loader from '../../../components/molecules/Loader';

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isloading: false
        }
    }

    componentDidMount() {
        setTimeout(() => this.getData(), 100);
    }

    async getData() {
        if (this.props.globalData.length) return;
        console.log('request');
        const {
            setGlobalData, setCategoriesData, setProductData
        } = this.props;
        this.setState({ isloading: true });

        const { APIRequest } = this;
        const global = await APIRequest('general');
        const categories = await APIRequest('category');
        const product = await APIRequest('product');

        setGlobalData(global);
        setCategoriesData(categories);
        setProductData(product);

        this.setState({ isloading: false });
    }

    async APIRequest(path, params) {
        try {
            const result = await API.GET(path, params);
            return result.data[path];
        } catch (err) {
            console.error(err);
        }
    }

    moveToCatalog = (id, name) => {
        this.props.history.push('/catalog/' + id + '/' + name);
    }

    moveToSingle = id => {
        this.props.history.push('/single/' + id);
    }

    render() {
        return (
            this.state.isloading ? <Loader /> :
                <Wrapper className="margin-bottom-80" container={
                    <Categories
                        globals={this.props.globalData}
                        categories={this.props.categoriesData}
                        products={this.props.productData}
                        ngClickProduct={id => this.moveToSingle(id)}
                        ngClickCatalog={(id, name) => this.moveToCatalog(id, name)}
                        imgUrl={REST.server.url + 'assets/img/product/'}
                    />
                }
                />
        );
    }

}

const mapStateToProps = state => ({
    globalData: state.global,
    categoriesData: state.categories,
    productData: state.product
});

const dispatch = dispatch => ({
    setGlobalData: data => dispatch({ type: "SET_GLOBAL", data }),
    setCategoriesData: data => dispatch({ type: "SET_CATEGORIES", data }),
    setProductData: data => dispatch({ type: "SET_PRODUCT", data })
});

export default connect(mapStateToProps, dispatch)(Product);