import React, { useState, Fragment } from 'react';
import './ListActivities.css';
import Notification from '../../assets/img/icon/notification.svg';
import Naetastore from '../../assets/img/icon/naetastore.svg';
import User from '../../assets/img/icon/user.svg';

const ListActivities = props => {
    let [expand, setExpand] = useState('');
    return (
        <Fragment>
            <div className="text-info">
                Log activities
                <span
                    className="float-right more"
                    onClick={
                        expand === 'expand'
                            ? () => setExpand('')
                            : () => setExpand('expand')}
                >
                    {expand === 'expand'
                        ? 'Close' : 'Expand'}
                </span>
            </div>
            <div className={`list-activities ${expand}`}>
                {props.data.map((act, i) =>
                    <div key={i} className="list-group-item">
                        <div className="media-box">
                            <div className="media-box-body clearfix">
                                <small className="text-muted pull-right ml">{act.created}</small>
                                <div className="media-box-heading">
                                    <div className="m0">{act.description}</div>
                                </div>
                                {act.detail.username
                                    ?
                                    <p className="notification user">
                                        <small>
                                            <img className="notification-icon" src={User} alt="ni" />
                                            {act.detail.username}
                                        </small>
                                    </p>
                                    : <></>
                                }
                                {act.detail.product
                                    ?
                                    <p className="notification product">
                                        <small className="text-primary" onClick={() => props.ngClick(act.detail.id)}>
                                            <img className="notification-icon" src={Naetastore} alt="ni" />
                                            {act.detail.product}
                                        </small>
                                    </p>
                                    : <></>
                                }
                                {act.detail.tweet
                                    ?
                                    <p className="notification tweet">
                                        <small>
                                            <img className="notification-icon" src={Notification} alt="ni" />
                                            {act.detail.tweet}
                                        </small>
                                    </p>
                                    : <></>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
}

ListActivities.defaultProps = {
    data: []
}

export default ListActivities;