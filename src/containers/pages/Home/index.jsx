import React, { Fragment } from 'react';
import './index.css';
import { connect } from 'react-redux';
import Template from '../../templates/Home/';
import Input from '../../../components/molecules/Input/';
import Styles from '../../organism/Styles';
import Product from '../../organism/Product';
import AppLink from '../../../components/molecules/AppLink';
import galleryIcon from '../../../assets/img/icon/gallery-icon.svg';
import App from '../../../App';
import api from '../../../config/redux/action';

class Home extends React.Component {

    state = {
        isLoading: false
    };

    componentDidMount() {
        window.scrollTo(null, 0);
        this.getDataToAPI();
    }

    getDataToAPI = async () => {
        this.setState({ isLoading: true });

        const { global, suggested, category, product } = this.props;

        let gReady = false;
        if (global.length < 1) {
            await api.getGlobal();
            gReady = true;
        } else {
            gReady = true;
        }

        let sReady = false;
        if (suggested.length < 1) {
            await api.getSuggested();
            sReady = true;
        } else {
            sReady = true;
        }

        // just optional
        if (category.length < 1) {
            await api.getCategory();
        }
        if (product.length < 1) {
            await api.getProduct();
        }

        if (gReady && sReady) {
            this.setState({ isLoading: false });
        }
    }

    render() {
        if (this.state.isLoading) return <App />;
        const { history, global, suggested } = this.props;
        return (
            <Template
                header={
                    <Fragment>
                        <div className="welcome">
                            <h2>Hi</h2>
                            <p>Apa yang ingin kamu belanja hari ini? Cari di bawah.</p>
                        </div>
                        <Input
                            placeholder="Saya mencari..."
                            onClick={(keyword) => history.push(`/search?${keyword}`)} />
                        <div className="apps un-text-d_">
                            <AppLink to="/gallery" icon={galleryIcon} label="Galeri Store" />
                        </div>
                    </Fragment>
                }

                container={
                    <Fragment>
                        <section id="style">
                            <div className="title text-left ml-2">Style</div>
                            <Styles
                                data={global}
                                onClick={(id) => history.push(`/book/${id}`)} />
                        </section>
                        <section id="suggested">
                            <div className="title text-left ml-2">Disarankan</div>
                            <Product
                                data={suggested}
                                onClick={(id) => this.props.history.push(`/single/${id}`)} />
                        </section>
                    </Fragment>
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    global: state.global,
    suggested: state.suggested,
    category: state.category,
    product: state.product
});

export default connect(mapStateToProps)(Home);