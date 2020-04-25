import React, { Fragment } from 'react';
import Category from '../../organism/SubCategory';
import ProductMinimal from '../../../components/molecules/Product';
import { connect } from 'react-redux';
import api from '../../../config/redux/action';

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
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        {this.props.global.map((g, gindex) =>

                            <section id={g.name} key={gindex}>
                                <div className="title">{g.name}</div>
                                <div className="desc">{g.description}</div>

                                {this.props.category.map((c, cindex) =>
                                    c.global_id === g.id

                                        ?
                                        <Fragment key={cindex}>
                                            <Category data={c} className="mt-3" onClick={(id) => this.props.history.push(`/catalog/${id}`)} />

                                            <div className="products make-it-horizontal mt-3">
                                                {this.props.product.map((p, pindex) =>
                                                    p.category_id === c.id

                                                        ? <ProductMinimal data={p} key={pindex} onClick={(id) => this.props.history.push(`/single/${id}`)} />
                                                        : <Fragment key={pindex}></Fragment>
                                                )}
                                            </div>
                                        </Fragment>

                                        : <Fragment key={cindex}></Fragment>
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