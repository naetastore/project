import React, { Fragment } from 'react';
import HMenu from '../../components/molecules/HMenu';

const HeaderOrg = (props) => {
    return (
        <Fragment>
            <div className="city">Kota {props.city}</div>
            <hr />
            <HMenu
                data={props.menu}
                href={props.menuHref}
            />
        </Fragment>
    );
}

export default HeaderOrg;