import React, { Fragment } from 'react';
import Template from '../../templates/Book';
import Menu from '../../organism/CategoryMenu';
import Product from '../../../components/molecules/Product';
import Button from '../../../components/molecules/Button';
import { connect } from 'react-redux';
import api from '../../../config/redux/action';

class Catalog extends React.Component {

    state = {
        isLoading: false
    };

    componentDidMount() {
        window.scrollTo(null, 0);
        this.getDataToAPI();
    }

    getDataToAPI = async () => {
        this.setState({ isLoading: true });

        const { category, product } = this.props;

        let cReady = false;
        if (category.length < 1) {
            await api.getCategory();
            cReady = true;
        } else {
            cReady = true;
        }

        let pReady = false;
        if (product.length < 1) {
            await api.getProduct();
            pReady = true;
        } else {
            pReady = true;
        }

        if (cReady && pReady) this.setState({ isLoading: false });
    }

    render() {
        if (this.state.isLoading) return (
            <p className="middle-scr">sedang memuat...</p>
        );
        return (
            <Template
                header={
                    <Fragment>
                        <div className="city">Kota Belitang</div>
                        <hr />
                        <Menu data={this.props.category} to="/catalog" />
                    </Fragment>
                }

                container={
                    this.props.product.map((p, i) =>
                        p.category_id === this.props.match.params.cid
                            ?
                            <Fragment key={i}>
                                <Product className="product-item" data={p} />
                                <Button
                                    type="submit"
                                    onClick={() => this.props.addToCart(p)}
                                >Tambah ke Troli</Button>
                            </Fragment>
                            : <Fragment key={i}></Fragment>
                    )
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    category: state.category,
    product: state.product
});

const reduxDispatch = dispatch => ({
    addToCart: data => dispatch({ type: 'ADD_TO_CART', data })
});

export default connect(mapStateToProps, reduxDispatch)(Catalog);