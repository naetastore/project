import React from 'react';
import API from '../../../services';
import { connect } from 'react-redux';
import BookTemplate from '../../templates/BookTemplate';
import Loader from '../../../components/molecules/Loader';
import ChildCategories from '../../organism/ChildCategories';

class Book extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            loaderDisplay: ''
        }
    }

    componentDidMount() {
        setTimeout(() => this.getData(), 100);
    }

    async getData() {
        const {
            globalData, categoriesData, productData,
            setGlobalData, setCategoriesData, setProductData
        } = this.props;
        if (globalData.length && categoriesData.length && productData.length) return;

        this.setState({ isloading: true });

        const books = await this.getDataAPI('general');
        const categories = await this.getDataAPI('category');
        const products = await this.getDataAPI('product');
        setGlobalData(books);
        setCategoriesData(categories);
        setProductData(products);

        this.setState({ loaderDisplay: 'none', isloading: false });
    }

    async getDataAPI(path, params) {
        try {
            const response = await API.GET(path, params);
            return response.data[path];
        } catch (err) {
            console.error(err);
        }
    }

    moveToProduct = id => {
        this.props.history.push('/single/' + id);
    }

    moveToCatalog = id => {
        this.props.history.push('/catalog/' + id);
    }

    render() {
        return (
            this.state.isloading
                ? <Loader display={this.state.loaderDisplay} />
                :
                <BookTemplate
                    dataMenu={this.props.globalData}
                    container={
                        <ChildCategories
                            categories={this.props.categoriesData}
                            products={this.props.productData}
                            globalId={this.props.match.params.id}
                            ngClickCategory={this.moveToCatalog}
                            ngClickProduct={this.moveToProduct}
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

export default connect(mapStateToProps, dispatch)(Book);