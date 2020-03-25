import React, { Fragment } from 'react';
import './FeedbackForm.css';
import feedback from '../../assets/img/icon/feedback.svg';
import tweet from '../../assets/img/icon/tweet.svg';
import API from '../../services';

class FeedbackForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: '',
            maxLength: 0,
            charLeft: 0,
            sentimentSmile: 0,
            desc: ''
        }
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        const maxLength = 257;
        this.setState({ display: 'none', charLeft: maxLength, maxLength, sentimentSmile: 1 });
    }

    setDisplay = () => {
        let display = '';
        if (this.state.display === '') display = 'none';
        this.setState({ display });
    }

    changeLeft = e => {
        this.setState({ charLeft: this.state.maxLength - e.target.value.length, desc: e.target.value });
    }

    ngSubmit = async event => {
        // action
        try {
            event.preventDefault();
            const response = await API.POST('tweet', {
                'description': this.state.desc,
                'smile': this.state.sentimentSmile
            });
            if (response.data.status === true) {
                alert('Your tweet is ready to be published');
                this.setState({ desc: '' });
                this.setDisplay();
            }
        } catch (err) {
            event.preventDefault();
            console.log(err.response);
        }
    }

    changeSentiment = num => {
        this.setState({ sentimentSmile: num });
    }

    render() {
        return (
            <Fragment>
                <div className="context-view" style={{ display: this.state.display }}>
                    <form onSubmit={this.ngSubmit} className="feedback-form">
                        <h2>Tweet us your feedback.</h2>
                        <span className="cancel" onClick={this.setDisplay}>x</span>
                        <div className="content">
                            <div>
                                <span>How was your experience?</span>
                                <div className="feedback-sentiment">
                                    <div
                                        className={`sentiment smile ${this.state.sentimentSmile === 1 ? 'checked' : ''}`}
                                    >
                                        <span
                                            onClick={() => this.changeSentiment(1)}
                                            role="img" aria-label="Happy Feedback Sentiment"
                                        >🙂</span>
                                    </div>
                                    <div
                                        className={`sentiment frown ${this.state.sentimentSmile === 0 ? 'checked' : ''}`}
                                    >
                                        <span
                                            onClick={() => this.changeSentiment(0)}
                                            role="img" aria-label="Sad Feedback Sentiment"
                                        >🙁</span>
                                    </div>
                                </div>
                            </div>
                            <div className="contactus">
                                <span>Other ways to contact us</span>
                                <div className="channels">
                                    <div>WhatsApp group</div>
                                    <div>Submit a bug</div>
                                    <div>Request a missing feature</div>
                                </div>
                            </div>
                        </div>
                        <h3>
                            Tell us why?
                            <span className="char-counter">({this.state.charLeft} characters left)</span>
                        </h3>
                        <textarea
                            required
                            onChange={this.changeLeft}
                            value={this.state.desc}
                            cols="30"
                            rows="3"
                            maxLength="257"
                            className="feedback-description"
                        ></textarea>
                        <div className="form-buttons">
                            <button
                                type={this.state.desc.length > 0 ? "submit" : "button"}
                                className={`monaco-button ${this.state.desc.length > 0 ? "" : "disabled"}`}
                                aria-disabled="true"
                            >
                                <img src={tweet} alt="fi" className="tweet-icon" />
                                Tweet
                            </button>
                        </div>
                    </form>
                </div>
                <div className="feedback" onClick={this.setDisplay}>
                    <span>Tweet us</span>
                    <img src={feedback} alt="fi" className="feedback-icon" />
                </div>
            </Fragment>
        );
    }

}

export default FeedbackForm;