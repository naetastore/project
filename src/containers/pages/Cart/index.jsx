import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './Cart.css';
import Counter from '../../organism/Counter';
import AsyncButton from '../../../components/molecules/AsyncButton';
import Progress from '../../../components/molecules/Progress';
import Alert from '../../organism/Alert';
import { CloseButton } from 'react-bootstrap';
import Wrapper from '../../organism/Wrapper';

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAlert: false
        }
    }

    componentDidMount() {
        if (!window.location.href.endsWith('#')) {
            window.location.href += '#';
        };
        this.updateState();
    }

    updateState = () => {
        if (!this.props.addedItems.length) {
            this.setState({ showAlert: true });
        }
    };

    handlePlus = product => {
        this.props.affect(product, 'PLUS');
        this.updateState();
    }

    handleMinus = product => {
        this.props.affect(product, 'MINUS');
        this.updateState();
    }

    onCancel = () => {
        if (window.confirm('Apakah kamu yakin kamu ingin membatalkan semua?')) {
            this.props.destroy();
            this.setState({ addedItems: [], showAlert: true });
        }
    }

    nextStep = () => {
        const { isAuthenticated, history } = this.props;
        if (isAuthenticated) {
            history.push('/checkout')
            return;
        }
        history.push('/auth?checkout');
    }

    render() {
        return (
            <Fragment>
                {
                    this.props.addedItems.length ?
                        <div className="cart-progress">
                            <Progress percentase="33" />
                        </div>
                        : <></>
                }

                <div className="cart">
                    {
                        this.state.showAlert ? <Alert
                            title="Pesan"
                            message="Keranjang belanja kosong. Mau buat order baru?"
                            href="/product"
                        /> : <></>
                    }

                    {
                        this.props.addedItems.length ?
                            <Fragment>
                                <div className="form-title">Total Rp. {this.props.totalOrder}
                                    <CloseButton onClick={this.onCancel} />
                                </div>

                                <Wrapper container={
                                    <Fragment>
                                        {/* ngRepeat Cart Value */}
                                        {this.props.addedItems.map(product =>
                                            <div className="cart-list" key={product.id}>
                                                <div className="product-image">
                                                    <img src={product.image} alt={product.name} />
                                                </div>
                                                <div className="product-inf">
                                                    <div className="product-name">{product.name}</div>
                                                    <div className="product-price">Rp. {product.price}</div>
                                                    <div className="product-subtotal">Total: Rp. {product.price * product.qty}</div>
                                                </div>
                                                <Counter
                                                    count={product.qty}
                                                    ngClick_Plus={() => this.handlePlus({ 'id': product.id, 'stock': product.stock })}
                                                    ngClick_Minus={() => this.handleMinus({ 'id': product.id, 'stock': product.stock })}
                                                />
                                            </div>
                                        )}
                                        {/* End ngRepeat Cart Value */}

                                        <div className="cart-footer">
                                            <AsyncButton
                                                label="Lanjutkan"
                                                ngClick={this.nextStep}
                                            />
                                        </div>
                                    </Fragment>
                                } />
                            </Fragment>
                            : <></>
                    }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,
    addedItems: state.addedItems,
    totalOrder: state.total
});
const dispatch = dispatch => ({
    affect: (product, handle) => dispatch({ type: 'AFFECT_QUANTITY', product, handle }),
    destroy: () => dispatch({ type: 'DESTROY_CART' })
});

export default connect(mapStateToProps, dispatch)(Cart);