import React from 'react';
import './About.css';
import Wrapper from '../../organism/Wrapper';
import { NavLink } from 'react-router-dom';

function About() {
    return (
        <Wrapper className="mt-3 margin-bottom-80" container={
            <div className="card">
                <div className="card-title">
                    <div className="web-name">Naeta Store</div>
                    <div className="copyright">Copyright 2020 built with by Andi Jatmiko.</div>
                </div>
                <div className="card-body">
                    <p>Version 0.2.1</p>
                    <p>Naeta Store is an e-commerce web application built using the javascript language.</p>
                    <p>Naeta Store <NavLink to="/disclaimer">Term of Service</NavLink></p>
                </div>
            </div>
        } />
    );
}

export default About;