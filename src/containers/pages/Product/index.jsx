import React, { Fragment } from 'react';
import Category from '../../organism/SubCategory';
import ProductMinimal from '../../../components/molecules/Product';
import { connect } from 'react-redux';
import api from '../../../config/redux/action';
import ScrollContainer from 'react-indiana-drag-scroll';

class Product extends React.Component {

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
        if (this.state.isLoading) return <p className="middle-scr">sedang memuat...</p>;
        const { global, category, product, history } = this.props;
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        {global.map((g) =>
                            <section id={g.name} key={g.id}>
                                <div className="title">{g.name}</div>
                                <div className="desc">{g.description}</div>
                                {category.map((c) =>
                                    c.global_id === g.id ? (
                                        <Fragment key={c.id}>
                                            <Category data={c} className="mt-3" onClick={(id) => history.push(`/catalog/${id}`)} />
                                            <ScrollContainer className="scroll-container" horizontal={true}>
                                                <div className="products mt-3">
                                                    {product.map((p) =>
                                                        p.category_id === c.id ? (
                                                            <ProductMinimal data={p} key={p.id} onClick={(id) => history.push(`/single/${id}`)} />
                                                        ) : ( <Fragment key={p.id}></Fragment> )
                                                    )}
                                                </div>
                                            </ScrollContainer>
                                        </Fragment>
                                    ) : ( <Fragment key={c.id}></Fragment> )
                                )}
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    global: state.global,
    category: state.category,
    product: state.product
});

export default connect(mapStateToProps)(Product);