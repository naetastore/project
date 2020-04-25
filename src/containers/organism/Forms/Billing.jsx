import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import Button from '../../../components/molecules/AsyncButton';

function Billing(props) {

    const [validated, setValidated] = useState(false);
    const [data, setData] = useState({ 'name': '', 'address': '', 'phonenumber': '' });
    const [disabled, setDisabled] = useState(true);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            checkData();
        }
    });

    const checkData = () => {
        if (props.data.name !== undefined) {
            const userData = {
                name: props.data.name,
                address: props.data.address,
                phonenumber: props.data.phonenumber
            };
            setData(userData);

            if (props.data.name && props.data.address && props.data.phonenumber) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }
        setInitialized(true);
    }

    const ngSubmit = event => {
        const form = event.currentTarget;
        switch (form.checkValidity()) {
            case true:
                event.preventDefault();
                props.onSubmit(data);
                break;

            default:
                setValidated(true);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }

    const ngChange = e => {
        let value = { ...data };
        value[e.target.id] = e.target.value;
        setData(value);

        if (value.name && value.address && value.phonenumber) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={ngSubmit}>
            <div className="form">
                <Form.Group controlId="name">
                    <Form.Label>Nama</Form.Label>
                    <InputGroup>
                        <Form.Control
                            placeholder="Nama lengkap"
                            onChange={ngChange}
                            type="text"
                            required
                            defaultValue={data.name}
                        />
                    </InputGroup>
                </Form.Group>
                <hr />
                <Form.Group controlId="address">
                    <Form.Label>Alamat Lengkap</Form.Label>
                    <Form.Control
                        placeholder="248 karakter atau lebih"
                        onChange={ngChange}
                        required
                        type="text"
                        defaultValue={data.address}
                    />
                </Form.Group>
                <hr />
                <Form.Group controlId="phonenumber">
                    <Form.Label>Nomor Telepon/ WhatsApp</Form.Label>
                    <Form.Control
                        placeholder="Nomor telepon"
                        onChange={ngChange}
                        required
                        type="text"
                        defaultValue={data.phonenumber}
                    />
                </Form.Group>
            </div>
            <Button
                isLoading={props.isLoading}
                type="submit"
                disabled={disabled}
                className="mt-4"
            >Lanjutkan</Button>
        </Form>
    );
}

export default Billing;