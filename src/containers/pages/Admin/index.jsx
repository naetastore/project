import React from 'react';
import './Admin.css';
import API from '../../../services';
import Wrapper from '../../organism/Wrapper';
import Statistic from '../../organism/Statistics';
// import ListActivities from '../../../components/molecules/ListActivities';
import { connect } from 'react-redux';

class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            statistic: {},
            // activities: []
        }
    }

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/auth?account/admin');
            return;
        }
        document.title = 'Dashboard';
        this.requestToAPI();
    }

    componentWillUnmount() {
        document.title = 'Naeta Store';
    }

    requestToAPI = async () => {
        try {
            const { username, password } = this.props.inSession;
            const statistic = await API.GET('statistic', { username, password });
            // const activities = await API.GET('activities', { username, password });

            this.setState({
                statistic: statistic.data,
                // activities: activities.data.activities
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

                    {/* <ListActivities
                        data={this.state.activities}
                        ngClick={(id) => this.moveToProduct(id)}
                    /> */}
                </div>
            } />
        );
    }

}

const mapStateToProps = state => ({
    inSession: state.inSession,
    isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(Admin);