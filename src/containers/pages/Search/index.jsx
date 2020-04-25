import React from 'react';
import './index.css';
import Template from '../../templates/Search';
import Input from '../../../components/molecules/Input';
import Button from '../../../components/molecules/Button';
import API from '../../../services';
import { connect } from 'react-redux';

class Search extends React.Component {

    state = {
        result: []
    };

    componentDidMount() {
        this.searchChecking();
    }

    searchChecking = () => {
        const search = this.props.location.search;
        const keyword = search.replace('?', '');
        if (keyword) {
            this.search(keyword);
        }
    }

    search = async keyword => {
        try {
            const response = await API.GET('product/search', { 'q': keyword });
            this.setState({ result: response.data.search });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <Template
                header={
                    <Input
                        defaultValue={this.props.location.search.replace('?', '')}
                        placeholder="Kata kunci..." className="mt-4" onClick={this.search} />
                }

                container={
                    this.state.result.map((p, i) =>
                        <div className="search-result" key={i}>
                            <div className="product">
                                <div className="img my-auto">
                                    <img src={p.image} alt="product" />
                                </div>
                                <div className="body">
                                    <div className="desc">{p.description}</div>
                                    <div className="title">{p.name}</div>
                                    <div className="price">{p.curs} {p.price}</div>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                onClick={() => this.props.addToCart(p)}
                            >Tambah ke Troli</Button>
                        </div>
                    )
                }
            />
        );
    }
}

const reduxDispatch = dispatch => ({
    addToCart: data => dispatch({ type: 'ADD_TO_CART', data })
});

export default connect(null, reduxDispatch)(Search);