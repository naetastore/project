import React, { Fragment } from 'react';
import './Settings.css';
import { connect } from 'react-redux';
import Wrapper from '../../organism/Wrapper';
import { Session } from '../../../config/Session';
import dataSettings from './DataSettings.json';
import API from '../../../services';
import LSettings from './LSettings';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            dataSettings: [],
            details: {},
            input: '',
            error: ''
        }
    }

    componentDidMount() {
        const path = window.location.pathname;
        const session = Session.get();
        if (!session) {
            this.props.history.push(`/auth?${path}`);
            return;
        } else {
            this.setSession(session);
        }

        this.init();
    }

    init = () => {
        this.setState({ dataSettings });
    }

    show = id => {
        const details = dataSettings.find(s => s.id === id);
        this.setState({ details, showDetails: true });
    }

    resetState = async () => {
        await this.setState({
            details: {},
            error: '',
            input: '',
            showDetails: false
        });
    }

    saveChanges = async () => {
        if (this.state.input.length < 1) {
            this.resetState();
            return;
        }

        try {
            const { username, password } = this.props.inSession;
            const response = await API.POST('upuser', { [this.state.details.id]: this.state.input, username, password });
            let newData = response.data.user;
            newData['password'] = password;

            if (this.state.details.id === "repassword") {
                window.sessionStorage.setItem('naetastore_pass', this.state.input);
                newData['password'] = this.state.input;
            }

            this.props.setSession(newData);

            this.resetState();
        } catch (err) {
            console.error(err);
            this.setState({ error: err.message });
        }
    }

    changeValue = e => {
        this.setState({ input: e.target.value });
    }

    setSession = userdata => {
        this.props.setAuthenticated(true);
        if (this.props.inSession) {
            return;
        }
        this.props.setSession(userdata);
    }

    render() {
        return (
            <Wrapper className="settings margin-bottom-80" container={
                this.state.showDetails ?
                    <div className="card">
                        <div className="card-title"></div>
                        <div className="setting-show-details">
                            <div className="setting-details-subject">{this.state.details.field}</div>
                            <input onChange={this.changeValue} id={this.state.details.id} type={this.state.details.type} className="form-control" placeholder={this.state.details.placeholder} />
                            <div className="text-danger">{this.state.error}</div>
                            <div className="setting-details-action">
                                <span
                                    onClick={this.saveChanges}
                                >Kembali</span>
                            </div>
                        </div>
                        <div className="card-body"></div>
                    </div>

                    :

                    <Fragment>
                        <div className="card">
                            <div className="card-title"></div>
                            <LSettings ngClick={this.show} onSession={this.props.inSession} />
                            <div className="card-body"></div>
                        </div>
                    </Fragment>
            } />
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,
    inSession: state.inSession
});

const reduxDispatch = dispatch => ({
    setSession: userdata => dispatch({ type: "SET_SESSION", userdata }),
    setAuthenticated: value => dispatch({ type: 'IS_AUTHENTICATED', value })
})

export default connect(mapStateToProps, reduxDispatch)(Settings);