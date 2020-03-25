import React from 'react';
import AsyncButton from './AsyncButton';
// import MyButton from '../atoms/MyButton';
import Plus from '../../assets/img/icon/plus-cyan.svg';

const ProductFooter = (props) => {
    return (
        <div className="product-footer">
            <AsyncButton
                icon={Plus}
                ngClick={props.ngClick}
                label="Tambah ke Troli"
            />
            {/* <MyButton label="Tambah ke Troli" ngClick={props.ngClick} /> */}
        </div>
    );
}

export default ProductFooter;