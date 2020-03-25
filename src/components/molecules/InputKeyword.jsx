import React from 'react';
import './Search.css';
import Search from '../../assets/img/icon/search-icon.svg'

const InputKeyword = props => {
    return (
        <div className="input">
            <input
                autoComplete="off"
                type="text"
                className="keyword"
                placeholder={props.placeholder}
                onChange={e => props.ngChange(e)}
            />
            <button className="btn search" onClick={props.ngClick}>
                <img src={Search} alt="si" className="search-icon" />
            </button>
        </div>
    );
}

export default InputKeyword;