import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Wrapper = (props) => {
    return (
        <Container>
            <Row className={props.className}>
                <Col xs={12}>
                    {props.container}
                </Col>
            </Row>
        </Container>
    );
}

export default Wrapper;