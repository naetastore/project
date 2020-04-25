import React, { Fragment } from 'react';
import './index.css';
import ProgressEvent from '../../../components/molecules/ProgressEvent';
import Summary from '../../organism/OrderSummary';
import Button from '../../../components/molecules/AsyncButton';
import { connect } from 'react-redux';
import API from '../../../services';
import session from '../../../config/session';
import { NavLink } from 'react-router-dom';

class OrderSummary extends React.Component {

    state = {
        progress: 0,
        summary: {},
        isLoading: true,
        uploaded: false
    };

    componentDidMount() {
        if (this.props.product.length < 1) {
            setTimeout(() => this.props.history.push('/'), 1000);
            return;
        }
        this.generate();
    }

    generate = async () => {
        const shipping = 0;
        const total = this.props.total + shipping;

        const summary = {
            consumer: this.props.userData,
            summary: {
                product: this.props.product,
                detail: {
                    subtotal: this.props.total,
                    shipping,
                    total
                }
            }
        };

        this.setState({ summary, isLoading: false });
    }

    createOrder = async () => {
        const { product, deleteItem, clearItems } = this.props;

        let x = product.length;
        const n = product.length;

        this.setState({ progress: 0, isLoading: true });

        product.forEach(async a => {
            const product = {
                username: session.get('username'),
                password: session.get('password'),
                'name': a.name,
                'price': a.price,
                'qty': a.qty,
                'product_id': a.id
            };

            try {
                await API.POST('orders', product);

                deleteItem({
                    'id': a.id,
                    'price': a.price
                });

                this.setProgress(n);

                x -= 1;
                if (x < 1) {
                    clearItems();
                    this.setState({ isLoading: false, uploaded: true });
                }
            } catch (err) {
                console.error(err);
                const errorMessage = err.response.data.message;

                alert(errorMessage);
                this.setState({ isLoading: false });
            }
        });
    }

    setProgress = n => {
        let value = Math.round(100 / n);
        value += this.state.progress;
        this.setState({ progress: value });
    }

    render() {
        if (this.state.uploaded) return (
            <div className="middle-scr order-success">
                <h5>Selamat!</h5>
                <div style={{ color: "#6a7463" }}>Pesanan kamu telah berhasil dibuat</div>
                <NavLink to="/account/order">Lihat Akun</NavLink>
            </div>
        );
        return (
            <Fragment>
                <ProgressEvent percent={this.state.progress} />
                {!this.state.isLoading
                    ?
                    <Fragment>
                        <div className="page-title">Order Summary</div>
                        <div className="container mt-4">
                            <div className="row">
                                <div className="col-12">
                                    <Summary data={this.state.summary} />
                                    <Button disabled={false} onClick={this.createOrder}>Lanjutkan</Button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                    : <></>}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    userData: state.userData,
    total: state.total,
    product: state.addedItems
});

const reduxDispatch = dispatch => ({
    deleteItem: data => dispatch({ type: 'DELETE_ADDED_ITEM', data }),
    clearItems: data => dispatch({ type: 'CLEAR_ADDED_ITEMS', data })
});

export default connect(mapStateToProps, reduxDispatch)(OrderSummary);