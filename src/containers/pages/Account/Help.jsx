import React from 'react';
import { connect } from 'react-redux';

class Help extends React.Component {
    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/auth?account/help');
            return;
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
    isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(Help);