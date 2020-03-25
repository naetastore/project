import React from 'react';
import './Topbar.css';
import Navbar from 'react-bootstrap/Navbar';
import NaetaBrand from '../../components/molecules/NaetaBrand';
import InputKeyword from '../../components/molecules/InputKeyword';

const Topbar = () => {
    return (
        <>
            <Navbar expand={false} fixed="top topbar">
                <NaetaBrand
                    link="/naetastore" />
                <InputKeyword />
            </Navbar>
        </>
    );
}

export default Topbar;