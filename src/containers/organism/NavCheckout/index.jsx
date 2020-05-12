import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import troleyicon from '../../../assets/img/icon/troley-icon.svg';
import icon from '../../../assets/img/icon/move-to-icon.svg';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

function Nav({ addedItems, history }) {
    const [shouldShowActions, setShouldShowActions] = useState(true);
    const [lastYPos, setLastYPos] = useState(0);

    useEffect(() => {
        function handleScroll() {
          const yPos = window.scrollY;
          const isScrollingUp = yPos < lastYPos;

          setShouldShowActions(isScrollingUp);
          setLastYPos(yPos);
        }

        window.addEventListener('scroll', handleScroll, false);

        return () => {
          window.removeEventListener('scroll', handleScroll, false);
        }
    }, [lastYPos]);
    return (
        <motion.div
            animate={{ opacity: shouldShowActions ? 1 : 0 }}
            initial={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.2 } }}
        >
            <Navbar
                className="nav-checkout"
                style={{ cursor: "pointer" }}
                onClick={() => history.push('/shoppingcart')}
            >
                <div className="go-checkout un-text-d_">
                    <img src={troleyicon} alt="icon" className="troley-icon" />
                    <div className="text">
                        <span className="counter">{addedItems.length}</span>
                    </div>
                    <NavLink to="/shoppingcart">
                        <img src={icon} alt="icon" className="icon" />
                    </NavLink>
                </div>
            </Navbar>
        </motion.div>
    );
}

class NavCheckout extends React.Component {
    render() {
        const { addedItems } = this.props;
        return (
            addedItems.length ? (
                <Nav {...this.props} />
            ) : null
        );
    }
}

const mapStateToProps = state => ({
    addedItems: state.addedItems
});

export default connect(mapStateToProps)(NavCheckout);