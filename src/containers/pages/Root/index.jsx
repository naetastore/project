import React, { Fragment } from 'react';
import API from '../../../services';
import { connect } from 'react-redux';
import RootTemplate from '../../templates/Root';
import Loader from '../../../components/molecules/Loader';
import Progress from '../../../components/molecules/Progress';
import Options from '../../../components/molecules/Root/Options';
import Suggested from '../../organism/Root/Suggested';
import Title from '../../../components/atoms/Title';

class Root extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            progress: 0
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        const controller = new AbortController();
        controller.abort();
    }

    getData = async () => {
        if (this.props.suggestedData && this.props.suggestedData.length > 0) return;
        const {
            setSuggestedData,
            setGlobalData, setCategoriesData, setProductData
        } = this.props;
        const { setProgress, getDataToAPI } = this;

        this.setState({ isloading: true });
        const n = 8;

        const suggested = await getDataToAPI('product', { 'suggested': true }); setProgress(n);
        const global = await getDataToAPI('general'); setProgress(n);
        setSuggestedData(suggested); setProgress(n);
        setGlobalData(global); setProgress(n);

        // optional
        const categories = await getDataToAPI('category'); setProgress(n);
        const products = await getDataToAPI('product'); setProgress(n);
        setCategoriesData(categories); setProgress(n);
        setProductData(products); setProgress(n);

        setTimeout(() => this.setState({ isloading: false }), 500);
    }

    setProgress = async n => {
        let value = 100 / n;
        value += this.state.progress
        await this.setState({ progress: value });
    }

    async getDataToAPI(path, params) {
        try {
            const result = await API.GET(path, params);
            return result.data[path];
        } catch (err) {
            console.error(err);
        }
    }

    moveToCategory = c => {
        this.props.history.push(`/book/${c.id}/${c.name}`);
    }

    moveToSingle = id => {
        this.props.history.push(`/single/${id}`);
    }

    render() {
        return (
            this.state.isloading
                ?
                <Fragment>
                    <Loader />
                    <Progress percentase={this.state.progress} />
                </Fragment>
                :
                <RootTemplate andiProps={this.props} container={
                    <Fragment>
                        <Title titlend="Style" />
                        <Options
                            data={this.props.globalData}
                            ngClick={this.moveToCategory}
                        />

                        <Title titlend="Disarankan" />
                        <Suggested
                            data={this.props.suggestedData}
                            ngClick={id => this.moveToSingle(id)}
                        />
                    </Fragment>
                } />
        );
    }

}

const mapStateToProps = state => ({
    globalData: state.global,
    suggestedData: state.suggested,
    categoriesData: state.categories,
    inSession: state.inSession
});

const dispatch = dispatch => ({
    setSuggestedData: data => dispatch({ type: "SET_SUGGESTED", data }),
    setGlobalData: data => dispatch({ type: "SET_GLOBAL", data }),

    // ---- optional
    setCategoriesData: data => dispatch({ type: "SET_CATEGORIES", data }),
    setProductData: data => dispatch({ type: "SET_PRODUCT", data }),
});

export default connect(mapStateToProps, dispatch)(Root);