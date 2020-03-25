import React, { Fragment } from 'react';
import HeaderOrg from '../organism/HeaderOrg';
import Wrapper from '../organism/Wrapper';

const CatalogTemplate = (props) => {
    return (
        <Fragment>
            <HeaderOrg
                city="Belitang"
                menu={props.dataMenu}
                menuHref="/catalog"
            />
            <Wrapper
                container={props.container}
            />
        </Fragment>
    );
}

export default CatalogTemplate;