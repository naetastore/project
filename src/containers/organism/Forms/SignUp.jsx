import React, { Fragment, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import Button from '../../../components/molecules/AsyncButton';

function SignUp(props) {

    const [validated, setValidated] = useState(false);
    const [data, setData] = useState({ username: '', password: '' });
    const [disabled, setDisabled] = useState(true);

    const ngSubmit = () => {
        if (data.username.length > 0) {
            props.onSubmit(data);

            setValidated(false);
            setDisabled(true);
        } else {
            setValidated(true);
        }
    }

    const ngChange = e => {
        let value = { ...data };
        value[e.target.id] = e.target.value;
        setData(value);

        if (e.target.value.length > 0) {
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
                <Form noValidate
                    validated={validated}
                    onSubmit={event => event.preventDefault()}
                >
                    <div className="form">
                        <Form.Group controlId={props.inputProps.id}>
                            <InputGroup>
                                <Form.Control
                                    placeholder={props.inputProps.placeholder}
                                    onChange={ngChange}
                                    type={props.inputProps.type}
                                    required
                                    value={data[props.inputProps.id]}
                                    autoComplete="off"
                                    autoFocus={true}
                                    onKeyUp={checkKey}
                                />
                            </InputGroup>
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
        </Fragment >
    );
}

export default SignUp;