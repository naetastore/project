import React from 'react';
import AsyncButton from './AsyncButton';
import Plus from '../../assets/img/icon/plus-cyan.svg';

const ProductFooter = (props) => {
    return (
        <div className="product-footer">
            <AsyncButton
                icon={Plus}
                ngClick={props.ngClick}
                label="Tambah ke Troli"
            />
        </div>
    );
}

export default ProductFooter;