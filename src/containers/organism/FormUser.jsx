import React, { Fragment, useState } from 'react';
import './FormUser.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import AsyncButton from '../../components/molecules/AsyncButton';
import Wrapper from './Wrapper';
import { NavLink } from 'react-router-dom';

function FormUser(props) {
    const [validated, setValidated] = useState(false);
    const [myValidated, setMyValidated] = useState(false);
    const ngSubmit = event => {
        const form = event.currentTarget;
        switch (form.checkValidity()) {
            case true:
                event.preventDefault();
                props.ngSubmit();
                break;

            default:
                setValidated(true);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
    const ngChange = event => {
        if (event.target.id === "username" && !myValidated) {
            if (event.target.value.split(' ').length > 1) {
                alert('Nama pengguna tidak boleh ada spasi');
                setMyValidated(true);
            }
        }
        props.ngChange(event);
    }

    return (
        <Wrapper
            container={
                <Fragment>
                    <div className="form-title">{props.title}</div>
                    <div className="form-guide">{props.guide}</div>
                    <Form noValidate validated={validated} onSubmit={ngSubmit}>
                        {
                            props.error
                                ? <div className="alert alert-fixed-top alert-danger">{props.error}</div>
                                : <></>
                        }
                        {
                            props.success
                                ? <div className="alert alert-fixed-top alert-success">{props.success}</div>
                                : <></>
                        }
                        <div className="form form-user">
                            <Form.Group controlId="username">
                                {window.location.pathname === "/signup" ?
                                    <Form.Label>Nama pengguna</Form.Label>
                                    : <></>}
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Nama pengguna"
                                        onChange={ngChange}
                                        type="text"
                                        required
                                    />
                                    {/* <Form.Control.Feedback type="invalid">Silakan pilih nama pengguna.</Form.Control.Feedback> */}
                                </InputGroup>
                            </Form.Group>

                            <hr />

                            <Form.Group controlId="password">
                                {window.location.pathname === "/signup" ?
                                    <Form.Label>Kata sandi</Form.Label>
                                    : <></>}
                                <Form.Control
                                    placeholder={window.location.pathname === "/auth" ? "Kata sandi" : "5 atau lebih karakter"}
                                    onChange={ngChange}
                                    required
                                    type="password"
                                />
                                {/* <Form.Control.Feedback>right!</Form.Control.Feedback> */}
                            </Form.Group>

                            {window.location.pathname === "/signup" ?
                                <Fragment>
                                    <hr />

                                    <Form.Group>
                                        <Form.Check
                                            required
                                            defaultChecked
                                            label={
                                                <span>
                                                    Setuju dengan <NavLink to="/disclaimer"> syarat </NavLink>dan<NavLink to="/disclaimer"> ketentuan</NavLink>
                                                </span>
                                            }
                                            feedback="Anda harus menyetujui sebelum mengirimkan."
                                        />
                                    </Form.Group>
                                </Fragment>
                                : <></>
                            }

                        </div>
                        <div className="footer">
                            {props.footer}
                            <AsyncButton
                                isLoading={props.isLoading}
                                label={props.labelSubmit}
                                disabled={props.disabled}
                            />
                        </div>
                    </Form>
                </Fragment>

            }
        />
    );
}

FormUser.defaultProps = {
    passPlaceholder: "Kata sandi"
}

export default FormUser;