import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Book(props) {
    return (
        <Fragment>
            {props.header}
            <Container>
                <Row>
                    <Col lg={12}>
                        {props.container}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default Book;