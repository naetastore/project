import React from 'react';
import './Alert.css';
import { NavLink } from 'react-router-dom';
import ButtonPlus from '../../components/atoms/ButtonPlus';

function Alert(props) {
    return (
        <div className="alert my-auto">
            <h4>{props.title}</h4>

            <div className="alert-body">
                {props.message}
            </div>

            {
                props.href
                    ?
                    <div className="alert-footer">
                        <NavLink
                            to={props.href}
                        >
                            <ButtonPlus />
                        </NavLink>
                    </div>
                    : <></>
            }
        </div>
    )
}

export default Alert;