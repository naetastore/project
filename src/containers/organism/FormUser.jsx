import React, { Fragment, useState } from 'react';
import './FormUser.css';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import AsyncButton from '../../components/molecules/AsyncButton';
import Wrapper from './Wrapper';

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
                    <Form noValidate validated={validated} onSubmit={ngSubmit} className="mt-3">
                        {
                            props.error
                                ? <div className="alert alert-danger">{props.error}</div>
                                : <></>
                        }
                        {
                            props.success
                                ? <div className="alert alert-success">{props.success}</div>
                                : <></>
                        }
                        <div className="form-user">
                            <Form.Group controlId="username">
                                <Form.Label>Nama pengguna</Form.Label>
                                <InputGroup>
                                    {/* <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend> */}
                                    <Form.Control
                                        placeholder="Nama pengguna"
                                        onChange={ngChange}
                                        type="text"
                                        // aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">Silakan pilih nama pengguna.</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <hr />

                            <Form.Group controlId="password">
                                <Form.Label>Kata sandi</Form.Label>
                                <Form.Control
                                    placeholder={props.passPlaceholder}
                                    onChange={ngChange}
                                    required
                                    type="password"
                                />
                                {/* <Form.Control.Feedback>right!</Form.Control.Feedback> */}
                            </Form.Group>

                            <hr />

                            <Form.Group>
                                <Form.Check
                                    required
                                    defaultChecked
                                    label="Setuju dengan syarat dan ketentuan"
                                    feedback="Anda harus menyetujui sebelum mengirimkan."
                                />
                            </Form.Group>
                        </div>
                        <AsyncButton
                            isLoading={props.isLoading}
                            label={props.labelSubmit}
                        />
                    </Form>
                    {props.footer}
                </Fragment>

            }
        />
    );
}

FormUser.defaultProps = {
    passPlaceholder: "Kata sandi"
}

export default FormUser;