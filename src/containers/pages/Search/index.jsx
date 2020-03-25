import React from 'react';
import './Search.css';
import Wrapper from '../../organism/Wrapper';
import InputKeyword from '../../../components/molecules/InputKeyword';
import LSearch from '../../organism/LSearch';
import API from '../../../services';
import { REST } from '../../../config/REST';
import { connect } from 'react-redux';

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

    render() {
        return (
            <Wrapper
                className="mt-3"
                container={
                    <>
                        <InputKeyword
                            placeholder="Kata kunci..."
                            ngChange={e => this.ngChange(e)}
                            ngClick={this.search}
                        />
                        {this.state.error
                            ? <div className="alert alert-danger">{this.state.error}</div>
                            :
                            <LSearch
                                imgloc={`${REST.server.url}assets/img/product/`}
                                data={this.state.search}
                                addToCart={s => this.addToCart(s)}
                            />
                        }
                    </>
                }
            />
        );
    }

}

const dispatch = dispatch => ({
    addToCart: product => dispatch({ type: "ADD_TO_CART", product })
});

export default connect(null, dispatch)(Search);