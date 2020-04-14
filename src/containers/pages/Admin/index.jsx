import React from 'react';
import API from '../../../services';
import Wrapper from '../../organism/Wrapper';
import Statistic from '../../organism/Statistics';
import { connect } from 'react-redux';
import { Session } from '../../../config/Session';

class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            statistic: {}
        }
    }

    componentDidMount() {
        const session = Session.get();
        if (!session) {
            this.props.history.push('/auth?account/myprofile');
            return;
        } else {
            this.setSession(session);
        }
        document.title = 'Dashboard';
        this.requestToAPI();
    }

    componentWillUnmount() {
        document.title = 'Naeta Store';
        const controller = new AbortController();
        controller.abort();
    }

    setSession = userdata => {
        this.props.setAuthenticated(true);
        if (this.props.inSession) {
            return;
        }
        this.props.setSession(userdata);
    }

    requestToAPI = async () => {
        try {
            const { username, password } = this.props.inSession;
            const statistic = await API.GET('statistic', { username, password });

            this.setState({
                statistic: statistic.data,
            });
        } catch (err) {
            console.error(err);
        }
    }

    moveToProduct = id => {
        this.props.history.push(`/single/${id}`);
    }

    toHelpTopics = help => {
        console.log(help);
    }

    render() {
        return (
            <Wrapper className="margin-bottom-80" container={
                <div className="account-body">
                    <Statistic
                        products={this.state.statistic.products}
                        stock={this.state.statistic.stock}
                        selled={this.state.statistic.selled}
                        inOrder={this.state.statistic.inOrder}
                        visitor={this.state.statistic.visitor}
                        newVisitor={this.state.statistic.newVisitor}
                    />
                </div>
            } />
        );
    }

}

const mapStateToProps = state => ({
    inSession: state.inSession,
    isAuthenticated: state.isAuthenticated
});

const reduxDispatch = dispatch => ({
    setSession: userdata => dispatch({ type: "SET_SESSION", userdata }),
    setAuthenticated: value => dispatch({ type: 'IS_AUTHENTICATED', value })
});

export default connect(mapStateToProps, reduxDispatch)(Admin);