import React from 'react';
import Template from '../../templates/Single';
import API from '../../../services';
import Product from '../../../components/molecules/Product';
import { connect } from 'react-redux';
import Button from '../../../components/molecules/Button';

class Single extends React.Component {

    state = {
        product: {}
    };

    componentDidMount() {
        this.getDataToAPI();
    }

    getDataToAPI = async () => {
        try {
            const response = await API.GET('product', { 'id': this.props.match.params.id });
            this.setState({ product: response.data.product });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { product } = this.state;
        const { addToCart } = this.props;
        const isExist = product.name !== undefined;
        return (
            <Template
                container={
                    <div className="mt-3">
                        <Product className="product-item" data={product} />
                        {isExist ?(
                            <div className="product-footer float-right mt-3">
                                <Button
                                    onClick={() => addToCart(product)}
                                ></Button>
                            </div>
                        ) : null}
                    </div>
                }
            />
        );
    }
}

const reduxDispatch = dispatch => ({
    addToCart: data => dispatch({ type: 'ADD_TO_CART', data })
});

export default connect(null, reduxDispatch)(Single);