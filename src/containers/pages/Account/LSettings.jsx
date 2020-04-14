import React, { Fragment } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import MoveTo from '../../../assets/img/icon/move-to.svg';
import Phone from '../../../assets/img/icon/phone.svg';
import Key from '../../../assets/img/icon/key.svg';
import Account from '../../../assets/img/avatar/default-light.svg';

function LSettings(props) {
    const { phone, name } = props.onSession;

    return (
        <Fragment>
            <div
                onClick={() => props.ngClick('name')}
                className="setting-list-group"
            >
                <Container>
                    <Row>
                        <Col xs={3} className="my-auto">
                            <img alt="icon" src={Account} className="m-icon rounded-circle" />
                        </Col>
                        <Col>
                            <div className="setting-details">
                                <div className="setting-name">Nama</div>
                                <div className="setting-desc">{name ? name : 'Atur namamu di sini'}</div>
                            </div>
                        </Col>
                        <Col xs={1} className="my-auto">
                            <div className="setting-action">
                                <img src={MoveTo} alt="mi" className="icon" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div
                onClick={() => props.ngClick('repassword')}
                className="setting-list-group"
            >
                <Container>
                    <Row>
                        <Col xs={3} className="my-auto">
                            <img alt="icon" src={Key} className="m-icon rounded-circle" />
                        </Col>
                        <Col>
                            <div className="setting-details">
                                <div className="setting-name">Kata Sandi</div>
                                <div className="setting-desc">Perbarui kata sandi</div>
                            </div>
                        </Col>
                        <Col xs={1} className="my-auto">
                            <div className="setting-action">
                                <img src={MoveTo} alt="mi" className="icon" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div
                onClick={() => props.ngClick('phonenumber')}
                className="setting-list-group"
            >
                <Container>
                    <Row>
                        <Col xs={3} className="my-auto">
                            <img alt="icon" src={Phone} className="m-icon rounded-circle" />
                        </Col>
                        <Col>
                            <div className="setting-details">
                                <div className="setting-name">Nomor Telepon</div>
                                <div className="setting-desc">{phone ? phone : 'Tambahkan nomor baru'}</div>
                            </div>
                        </Col>
                        <Col xs={1} className="my-auto">
                            <div className="setting-action">
                                <img src={MoveTo} alt="mi" className="icon" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
}

export default LSettings;