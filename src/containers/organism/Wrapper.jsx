import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Wrapper = (props) => {
    return (
        <Container className={props.className}>
            <Row>
                <Col xs={12}>
                    {props.container}
                </Col>
            </Row>
        </Container>
    );
}

export default Wrapper;