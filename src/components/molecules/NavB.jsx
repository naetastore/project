import React from 'react';
import './NavB.css';
import { connect } from 'react-redux';
import cart from '../../assets/img/icon/cart.svg';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import MoveTo from '../../assets/img/icon/move-to.svg';

class NavB extends React.Component {
    render() {
        return (
            this.props.addedItems.length ?
                <Navbar expand={false} className="navbar-bottom">
                    <div className="checkout-bottom">
                        <img src={cart} alt="cart-icon" className="troley" />
                        <div className="text">Lihat isi Keranjang <span className="counter">{this.props.addedItems.length}</span></div>
                        <NavLink
                            to="/shoppingcart"
                        >
                            <img src={MoveTo} alt="mt" className="move-to-icon" />
                        </NavLink>
                    </div>
                </Navbar>
                : <></>
        );
    }
}

const mapStateToProps = state => ({ addedItems: state.addedItems });

export default connect(mapStateToProps)(NavB);