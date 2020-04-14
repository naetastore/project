import React, { Fragment } from 'react';
import Wrapper from '../../organism/Wrapper';
import { NavLink } from 'react-router-dom';

function Disclaimer() {
    return (
        <Wrapper className="mt-3 margin-bottom-80" container={
            <Fragment>
                <div className="card">
                    <div className="card-title">Disclaimer :</div>
                    <div className="card-body">
                        <p>
                            Jika Anda memerlukan informasi lebih lanjut atau memiliki pertanyaan tentang penolakan situs ini, jangan ragu untuk menghubungi kami melalui Email <a href="mailto:mikorlk4328@gmail.com">mikorlk4328@gmail.com</a> atau WhatsApp di <a href="https://api.whatsapp.com/send?phone=6288276672905" target="_blank" rel="noopener noreferrer">+62.</a>
                        </p>
                        <p>
                            Semua informasi di situs web ini - <NavLink to="/">https://naetastore.github.io</NavLink> - diterbitkan dengan itikad baik dan hanya untuk tujuan informasi umum.
                        </p>
                        <p>
                            Segala tindakan yang Anda ambil atas informasi yang Anda temukan di situs web ini (Naeta Store), sepenuhnya merupakan risiko Anda sendiri. Naeta Store tidak akan bertanggung jawab atas kerugian dan / atau kerusakan sehubungan dengan penggunaan situs web ini.
                        </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">Persetujuan :</div>
                    <div className="card-body">
                        <p>
                            Dengan menggunakan situs web ini, Anda dengan ini menyetujui penafian kami dan menyetujui ketentuannya.
                        </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">Pembaruan :</div>
                    <div className="card-body">
                        <p>
                            Jika kami memperbarui, mengubah atau membuat perubahan apa pun pada dokumen ini, perubahan itu akan diposting secara jelas di sini.
                        </p>
                    </div>
                </div>
            </Fragment>
        } />
    );
}

export default Disclaimer;