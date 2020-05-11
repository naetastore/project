import React, { Fragment } from 'react';
import Menu from '../../organism/CategoryMenu';
import { connect } from 'react-redux';
import Category from '../../organism/SubCategory';
import Product from '../../../components/molecules/Product';
import api from '../../../config/redux/action';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Container, Row, Col } from 'react-bootstrap';

class Book extends React.Component {

    state = {
        isLoading: false
    };

    componentDidMount() {
        window.scrollTo(null, 0);
        this.getDataToAPI();
    }

    getDataToAPI = async () => {
        this.setState({ isLoading: true });

        const { global, category, product } = this.props;

        let gReady = false;
        if (global.length < 1) {
            await api.getGlobal();
            gReady = true;
        } else {
            gReady = true;
        }

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

        if (gReady && cReady && pReady) this.setState({ isLoading: false });
    }

    render() {
        if (this.state.isLoading) return (
            <p className="middle-scr">sedang memuat...</p>
        );
        const { global, category, product, history } = this.props;
        const { params } = this.props.match;
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="city">Kota Belitang</div>
                        <hr />
                        <Menu data={global} to="/book" />
                        {category.map((c) =>
                            c.global_id === params.gid ? (
                                <section id={c.name} key={c.id}>
                                    <Category data={c} onClick={(id) => history.push(`/catalog/${id}`)} />
                                    <ScrollContainer className="scroll-container" horizontal={true}>
                                        <div className="products mt-3">
                                            {product.map((p) =>
                                                p.category_id === c.id ? (
                                                    <Product data={p} onClick={(id) => history.push(`/single/${id}`)} key={p.id} />
                                                ) : ( <Fragment key={p.id}></Fragment> )
                                            )}
                                        </div>
                                    </ScrollContainer>
                                </section>
                            ) : ( <Fragment key={c.id}></Fragment> )
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    global: state.global,
    category: state.category,
    product: state.product
});

export default connect(mapStateToProps)(Book);