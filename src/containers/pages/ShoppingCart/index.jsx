import React, { Fragment } from 'react';
import './index.css';
import ProgressEvent from '../../../components/molecules/ProgressEvent';
import { connect } from 'react-redux';
import { CloseButton } from 'react-bootstrap';
import minusicon from '../../../assets/img/icon/minus-light-icon.svg';
import plusicon from '../../../assets/img/icon/plus-light-icon.svg';
import Button from '../../../components/molecules/AsyncButton';
import Img from '../../../components/atoms/Img';

class ShoppingCart extends React.Component {

    componentDidMount() {
        window.scrollTo(null, 0);
        if (this.props.addedItems.length < 1) {
            setTimeout(() => this.props.history.push('/'), 1000);
        }
    }

    next = () => {
        if (this.props.userData.username === undefined) {
            this.props.history.push('/auth?billing');
        } else {
            this.props.history.push('/billing');
        }
    }

    componentDidUpdate() {
        if (this.props.addedItems.length < 1) {
            setTimeout(() => this.props.history.push('/'), 1000);
        }
    }

    render() {
        return (
            <Fragment>
                <ProgressEvent percent="33" />
                <div className="page-title">
                    Total Rp. {this.props.total}
                    <CloseButton onClick={this.props.cancel} />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {this.props.addedItems.map((item, i) =>
                                <div className="cart-item" key={i}>
                                    <div className="image">
                                        <Img src={item.image} alt="product" />
                                    </div>
                                    <div className="body">
                                        <div className="name">{item.name}</div>
                                        <div className="price">{item.price}</div>
                                        <div className="total">Total: {item.qty * item.price}</div>
                                    </div>
                                    <div className="counter">
                                        <button className="btn minus" onClick={() => this.props.minusQty(item)}>
                                            <img src={minusicon} alt="icon" className="icon" />
                                        </button>
                                        <input type="number" readOnly value={item.qty} />
                                        <button className="btn plus" onClick={() => this.props.plusQty(item)}>
                                            <img src={plusicon} alt="icon" className="icon" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {this.props.addedItems.length
                                ? <Button disabled={false} onClick={this.next}>Lanjutkan</Button> : <></>}

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    addedItems: state.addedItems,
    total: state.total,
    userData: state.userData
});

const reduxDispatch = dispatch => ({
    minusQty: data => dispatch({ type: 'MINUS_QTY', data }),
    plusQty: data => dispatch({ type: 'PLUS_QTY', data }),
    cancel: data => dispatch({ type: 'CLEAR_ADDED_ITEMS', data })
});

export default connect(mapStateToProps, reduxDispatch)(ShoppingCart);