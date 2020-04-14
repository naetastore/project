import React from 'react';
import './Search.css';
import InputKeyword from '../../../components/molecules/InputKeyword';
import LSearch from './LSearch';
import API from '../../../services';
import { connect } from 'react-redux';
import Wrapper from '../../organism/Wrapper';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            search: [],
            error: ''
        }
    }

    async componentDidMount() {
        const search = await this.searchChecking();
        if (search) this.search();
    }

    componentWillUnmount() {
        const controller = new AbortController();
        controller.abort();
    }

    searchChecking = () => {
        let search = this.props.location.search;
        search = search.replace('?', '');
        if (search) {
            this.setState({ keyword: search });
            return true;
        }
    }

    search = async () => {
        try {
            const response = await API.GET('search', { 'q': this.state.keyword });
            if (response.status === 200) {
                this.setState({ search: response.data.search });
                return;
            };
        } catch (err) {
            this.setState({ error: err.message });
            setTimeout(() => this.setState({ error: '' }), 2000);
        }
    }

    ngChange = e => {
        this.setState({ keyword: e.target.value });
    }

    addToCart = s => {
        this.props.addToCart(s);
    }

    moveToSingle = id => {
        this.props.history.push(`/single/${id}`);
    }

    render() {
        return (
            <div className="search-page">
                <InputKeyword
                    placeholder="Kata kunci..."
                    ngChange={this.ngChange}
                    ngClick={this.search}
                />
                <Wrapper container={
                    this.state.error
                        ? <div className="alert alert-danger">{this.state.error}</div>
                        :
                        <LSearch
                            data={this.state.search}
                            addToCart={this.addToCart}
                            moveToSingle={this.moveToSingle}
                        />
                } />
            </div>
        );
    }

}

const dispatch = dispatch => ({
    addToCart: product => dispatch({ type: "ADD_TO_CART", product })
});

export default connect(null, dispatch)(Search);