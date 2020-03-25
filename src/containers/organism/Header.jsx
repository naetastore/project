import React from 'react';
import './Header.css';
import InputKeyword from '../../components/molecules/InputKeyword';

const Header = props => {
    return (
        <div className="header">
            <div className="welcome">
                <h2>{props.title}</h2>
                <p>{props.welcomeMessage}</p>
            </div>
            <InputKeyword
                placeholder="Saya mencari..."
                ngChange={e => props.ngChangeSearch(e)}
                ngClick={props.ngClickSearch}
            />
            <div className="apps">
                <div className="links">
                    {props.appLinks}
                </div>
            </div>
        </div>
    );
}

export default Header;