import React from 'react';
import './HMenu.css';
import Box from './Box';

const HMenu = (props) => {
    return (
        <div className="h_">
            {/* ngRepeat Menu Category */}
            {props.data.map(m =>
                <Box
                    key={m.id}
                    title={m.name}
                    href={props.href + '/' + m.id}
                />
            )}
            {/* End ngRepeat Menu Category */}
        </div>
    )
}

export default HMenu;