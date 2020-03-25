import React, { Fragment } from 'react';
import HeaderOrg from '../organism/HeaderOrg';
import Wrapper from '../organism/Wrapper';

const BookTemplate = (props) => {
    return (
        <Fragment>
            <HeaderOrg
                city="Belitang"
                menu={props.dataMenu}
                menuHref="/book"
            />
            <Wrapper
                container={
                    <div className="margin-bottom-80">
                        {props.container}
                    </div>
                }
            />
        </Fragment>
    );
}

export default BookTemplate;