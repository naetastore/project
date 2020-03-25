import React from 'react';
import Widget from '../../components/molecules/Widget';

const Statistic = props => {
    return (
        <section id="statistics">
            <Widget background="primary" count={(props.visitor === "0" && props.newVisitor > 0 ? '' : 0) + (props.newVisitor > 0 ? '+' + props.newVisitor : '')} label="visitors" />
            <Widget background="warning" count={props.stock} label="stocks" />
            <Widget background="dark" count={props.products} label="products" />
            <Widget background="success" count={props.selled} label="selled" />
            <Widget background="secondary" count={props.inOrder} label="in order" />
        </section>
    );
}

Statistic.defaultProps = {
    products: 0,
    stock: 0,
    selled: 0,
    inOrder: 0,
    visitor: 0,
    newVisitor: 0
}

export default Statistic;