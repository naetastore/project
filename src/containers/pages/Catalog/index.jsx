import React, { Fragment } from 'react';
import Menu from '../../organism/CategoryMenu';
import Product from '../../../components/molecules/Product';
import Button from '../../../components/molecules/Button';
import { connect } from 'react-redux';
import api from '../../../config/redux/action';
import { Container, Row, Col } from 'react-bootstrap';

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
        const { params } = this.props.match;
        const { product, category } = this.props;
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="city">Kota Belitang</div>
                        <hr />
                        <Menu data={category} to="/catalog" />
                    </Col>
                    {product.map((p, i) =>
                        p.category_id === params.cid ? (
                            <Fragment key={i}>
                                <Col md={6} className="mb-3">
                                    <Product className="product-item" data={p} />
                                    <Button
                                        type="submit"
                                        onClick={() => this.props.addToCart(p)}
                                    >Beli</Button>
                                </Col>
                            </Fragment>
                        ) : ( <Fragment key={i}></Fragment> )
                    )}
                </Row>
            </Container>
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