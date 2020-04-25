import React, { Fragment, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import Button from '../../../components/molecules/AsyncButton';

function Auth(props) {

    const [validated, setValidated] = useState(false);
    const [data, setData] = useState({ 'username': '', 'password': '' });
    const [disabled, setDisabled] = useState(true);

    const ngSubmit = () => {
        if (data.username.length > 0 && data.password.length > 0) {
            props.onSubmit(data);
        } else {
            setValidated(true);
        }
    }

    const ngChange = e => {
        let value = { ...data };
        value[e.target.id] = e.target.value;
        setData(value);

        if (value.username.length > 0 && value.password.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const checkKey = key => {
        if (key.keyCode === 13) {
            ngSubmit();
        }
    }

    return (
        <Fragment>
            <div>
                <Form noValidate validated={validated}>
                    <div className="form">
                        <Form.Group controlId="username">
                            <InputGroup>
                                <Form.Control
                                    placeholder="Nama pengguna"
                                    onChange={ngChange}
                                    type="text"
                                    required
                                    autoFocus={true}
                                    autoComplete="off"
                                    onKeyUp={checkKey}
                                />
                            </InputGroup>
                        </Form.Group>
                        <hr />
                        <Form.Group controlId="password">
                            <Form.Control
                                placeholder="Kata sandi"
                                onChange={ngChange}
                                required
                                type="password"
                                onKeyUp={checkKey}
                            />
                        </Form.Group>
                    </div>

                    <div className="mt-4">
                        {props.footer}
                    </div>
                </Form>
            </div>

            <div>
                <Button
                    isLoading={props.isLoading}
                    type="submit"
                    disabled={disabled}
                    onClick={ngSubmit}
                >Lanjutkan</Button>
            </div>
        </Fragment>
    );
}

export default Auth;