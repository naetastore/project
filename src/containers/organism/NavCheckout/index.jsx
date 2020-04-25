import React from 'react';
import './index.css';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import troleyicon from '../../../assets/img/icon/troley-icon.svg';
import icon from '../../../assets/img/icon/move-to-icon.svg';
import { connect } from 'react-redux';

class NavCheckout extends React.Component {

    render() {
        const addedItems = this.props.addedItems;
        return (
            addedItems.length
                ?
                <Navbar className="nav-checkout">
                    <div className="go-checkout un-text-d_">
                        <img src={troleyicon} alt="icon" className="troley-icon" />
                        <div className="text">
                            Lihat isi Keranjang
                            <span className="counter">{addedItems.length}</span>
                        </div>
                        <NavLink to="/shoppingcart">
                            <img src={icon} alt="icon" className="icon" />
                        </NavLink>
                    </div>
                </Navbar>
                : <></>
        );
    }
}

const mapStateToProps = state => ({
    addedItems: state.addedItems
});

export default connect(mapStateToProps)(NavCheckout);