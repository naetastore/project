import React from 'react';
import './Settings.css';
import API from '../../../services';
import { connect } from 'react-redux';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: {}
        }
    }

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/auth?account/settings');
            return;
        }
        this.getData();
    }

    getData = async () => {
        try {
            const { username, password } = this.props.inSession;
            const response = await API.GET('settings', { username, password });
            this.setState({ settings: response.data.settings });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        console.log(this.state.settings);
        return (
            <div className="settings">
                <div className="setting-group">
                    <span>Update Otomatis</span>
                    <input defaultChecked={false} type="checkbox" name="updateAutomatic" id="updateAutomatic" />
                </div>
                <div className="setting-group">
                    <span>Delete Otomatis</span>
                    <input defaultChecked={false} type="checkbox" name="deleteAutomatic" id="deleteAutomatic" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,
    inSession: state.inSession
});

export default connect(mapStateToProps)(Settings);