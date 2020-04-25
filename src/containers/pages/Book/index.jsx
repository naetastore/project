import React, { Fragment } from 'react';
import Template from '../../templates/Book';
import Menu from '../../organism/CategoryMenu';
import { connect } from 'react-redux';
import Category from '../../organism/SubCategory';
import Product from '../../../components/molecules/Product';
import api from '../../../config/redux/action';

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
        return (
            <Template
                header={
                    <Fragment>
                        <div className="city">Kota Belitang</div>
                        <hr />
                        <Menu data={this.props.global} to="/book" />
                    </Fragment>
                }

                container={
                    this.props.category.map((c, cindex) =>
                        c.global_id === this.props.match.params.gid
                            ?
                            <section id={c.name} key={cindex}>
                                <Category data={c} onClick={(id) => this.props.history.push(`/catalog/${id}`)} />
                                <div className="products make-it-horizontal mt-3">
                                    {this.props.product.map((p, pindex) =>
                                        p.category_id === c.id
                                            ?
                                            <Product data={p} onClick={(id) => this.props.history.push(`/single/${id}`)} key={pindex} />
                                            : <Fragment key={pindex}></Fragment>
                                    )}
                                </div>
                            </section>
                            : <Fragment key={cindex}></Fragment>
                    )
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    global: state.global,
    category: state.category,
    product: state.product
});

export default connect(mapStateToProps)(Book);