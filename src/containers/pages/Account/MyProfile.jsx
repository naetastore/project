import React from 'react';
import API from '../../../services';
import { connect } from 'react-redux';

class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            userdata: {}
        }
    }

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/auth?account/myprofile');
            return;
        }
        // this.getData();
    }

    getData = async () => {
        const userdata = this.props.userData;
        if (userdata !== null) {
            this.setState({ userdata, isloading: false });
        } else {
            const { username, password } = this.props.inSession;
            try {
                const response = await API.GET('user', { username, password });
                const userdata = response.data.data;
                this.props.setUserData(userdata);
                this.setState({ userdata, isloading: false });
            } catch (err) {
                if (err.status === false) {
                    this.setState({ error: err.status });
                }
            }
        }
    }

    render() {
        return (
            <div className="account-body">
                <div className="alert">
                    <h4>Akan Hadir!</h4>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    inSession: state.inSession,
    userData: state.userData,
    isAuthenticated: state.isAuthenticated
});

const dispatch = dispatch => ({ setUserData: data => dispatch({ type: "SET_USERDATA", data }) })

export default connect(mapStateToProps, dispatch)(MyProfile);