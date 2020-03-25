import React, { Fragment, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import AsyncButton from '../../components/molecules/AsyncButton';

function FormBilling(props) {
    const [validated, setValidated] = useState(false);
    const ngSubmit = event => {
        const form = event.currentTarget;
        switch (form.checkValidity()) {
            case true:
                event.preventDefault();
                props.userValidity();
                break;

            default:
                setValidated(true);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }

    return (
        <Fragment>
            <div className="form-title">{props.title}</div>
            <Form className="mt-3" noValidate validated={validated} onSubmit={ngSubmit}>
                <div className="form-bill">
                    {
                        props.errorMessage
                            ? <div className="alert alert-danger">{props.errorMessage}</div>
                            : <></>
                    }
                    <Form.Group controlId="name">
                        <Form.Label>Nama</Form.Label>
                        <InputGroup>
                            <Form.Control
                                value={props.objectValue.name ? props.objectValue.name : ''}
                                onChange={props.ngChange}
                                type="text"
                                required
                                placeholder="Nama lengkap"
                            />
                            <Form.Control.Feedback type="invalid">Silakan masukan nama Anda.</Form.Control.Feedback>
                        </InputGroup>
                        <span>Jangan gunakan nama panggilan.</span>
                    </Form.Group>

                    <hr />

                    <Form.Group controlId="address">
                        <Form.Label>Alamat Lengkap</Form.Label>
                        <Form.Control
                            value={props.objectValue.address ? props.objectValue.address : ''}
                            onChange={props.ngChange}
                            required
                            type="text"
                            maxLength="248"
                            placeholder="248 karakter atau lebih"
                        />
                    </Form.Group>

                    <hr />

                    <Form.Group controlId="phonenumber">
                        <Form.Label>Nomor Telepon/ WhatsApp</Form.Label>
                        <Form.Control
                            value={props.objectValue.phonenumber ? props.objectValue.phonenumber : ''}
                            onChange={props.ngChange}
                            required
                            type="number"
                            placeholder="Nomor telepon"
                        />
                    </Form.Group>
                </div>
                <AsyncButton
                    isLoading={props.isLoading}
                    label="Lanjutkan"
                />
            </Form>
        </Fragment>
    );
}

export default FormBilling;