import React, { Fragment, useState } from 'react';
import Header from './Header';
import Wrapper from '../../organism/Wrapper';
import gallery from '../../../assets/img/icon/gallery.svg';

function RootTemplate(props) {
    const [search, setSearch] = useState('');

    const ngChangeSearch = e => {
        setSearch(e.target.value);
    }

    const moveToSearch = () => {
        if (!search.length) {
            return;
        }
        push(`/search?${search}`);
    }

    const push = url => {
        props.andiProps.history.push(url);
    }

    return (
        <Fragment>
            <Header
                ngChangeSearch={ngChangeSearch}
                ngClickSearch={moveToSearch}
                appLinks={
                    <span
                        onClick={() => push('/gallery')}
                        className="menu"
                    >
                        <img src={gallery} alt="ai" className="app-icon" />
                        <span >Galeri Store</span>
                    </span>
                }
            />
            <Wrapper
                className="margin-bottom-80"
                container={props.container}
            />
        </Fragment>
    );
}

export default RootTemplate;