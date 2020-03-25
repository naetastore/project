import React, { useState } from 'react';
import './LNotif.css';
import MoveTo from '../../assets/img/icon/move-to.svg';
import API from '../../services';

function LNotif(props) {
    const [showDetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState({});

    const show = (id, readed) => {
        // nunggu selama animasi jalan
        setTimeout(() => {
            if (readed !== "0") {
                const details = props.data.find(d => d.id === id);
                setDetails(details);
                setShowDetails(true);
                return;
            }
            setReaded(id)
            setShowDetails(true);
        }, 200);
        return;
    }

    const setReaded = async id => {
        try {
            API.POST('upnotif', { 'id': id });
            const details = props.data.find(d => d.id === id);
            details['readed'] = 1;
            setDetails(details);
            return;
        } catch (err) {
            console.error(err);
        }
    }

    const deNotif = async id => {
        if (window.confirm('Apakah kamu yakin kamu ingin menghapus notifikasi ini?')) {
            props.ngDelete(id);
            setShowDetails(false);
            setDetails({});
        }
    }

    return (
        showDetails ?
            <div className="notif-list-group">
                <div className="notif-show-details">
                    <div className="notif-details-subject">{details.subject}</div>
                    <div className="notif-details-message">{details.message}</div>
                    <div className="notif-details-time">{details.created}</div>
                    <div className="notif-details-action">
                        <span
                            onClick={() => deNotif(details.id)}
                        >Hapus</span>
                        <span
                            onClick={() => setShowDetails(false)}
                        >Kembali</span>
                    </div>
                </div>
            </div>

            :

            props.data.map((d, i) =>
                <div
                    onClick={() => show(d.id, d.readed)}
                    className={`notif-list-group hoverable readed-${d.readed}`}
                    key={i}
                >
                    <div className="notif-details">
                        <div className="notif-subject">{d.subject}</div>
                        <div className="notif-time">{d.created}</div>
                    </div>
                    <div className="notif-action">
                        <img src={MoveTo} alt="mi" className="icon" />
                    </div>
                </div>
            )
    );
}

export default LNotif;