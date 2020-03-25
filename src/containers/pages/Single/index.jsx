import React, { Fragment } from 'react';
import './Single.css';
import Wrapper from '../../organism/Wrapper';
import API from '../../../services';
import ProductItem from '../../../components/molecules/ProductItem';
import ProductFooter from '../../../components/molecules/ProductFooter';
import { REST } from '../../../config/REST';
import Loader from '../../../components/molecules/Loader';
import { connect } from 'react-redux';

class Single extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            product: {}
        }
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        try {
            let product = await API.GET('product', { 'id': this.props.match.params.id });
            product = product.data.product;
            this.setState({ product, isloading: false });
        } catch (err) {
            console.log(err);
        }
    }

    addToCart = product => {
        this.props.addToCart(product);
    }

    render() {
        return (
            this.state.isloading ? <Loader /> : <Wrapper className="margin-bottom-80" container={
                <Fragment>
                    <ProductItem
                        imgUrl={REST.server.url + 'assets/img/product/' + this.state.product.image}
                        name={this.state.product.name}
                        desc={this.state.product.description}
                        price={this.state.product.price}
                    />
                    <ProductFooter
                        ngClick={() => this.addToCart(this.state.product)}
                    />
                </Fragment>
            } />
        );
    }

}

const dispatch = dispatch => ({
    addToCart: product => dispatch({ type: "ADD_TO_CART", product })
});

export default connect(null, dispatch)(Single);