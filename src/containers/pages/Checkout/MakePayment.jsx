import React, { Fragment } from 'react';
import './MakePayment.css';
import { connect } from 'react-redux';
import API from '../../../services';
import AsyncButton from '../../../components/molecules/AsyncButton';
import Wrapper from '../../organism/Wrapper';
import Plus from '../../../assets/img/icon/plus-cyan.svg';
import MoveTo from '../../../assets/img/icon/right-arrow.svg';
import Progress from '../../../components/molecules/Progress';
import Alert from '../../organism/Alert';
import OrderSummary from '../../organism/OrderSummary';

class MakePayment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            shipping: 0,
            alert: null,
            labelButton: '',
            icon: null,
            hit: 0,
            progress: 0
        }
    }

    componentDidMount() {
        const length = this.props.addedItems.length;
        if (length < 1) {
            this.setAlert('Error', 'Something went wrong!');
            return;
        }
        this.setState({ addedItems: length, labelButton: 'Buat Order', icon: Plus });
    }

    makePayment = async () => {
        const { addedItems, inSession, deleteItem, destroy } = this.props;
        let hit = this.state.hit++;
        if (hit > 2) {
            this.setAlert('Error', 'What happend we could n\'t create order!');
            destroy();
            return;
        }
        let x = addedItems.length;
        const n = addedItems.length;
        this.setProgress(n)
        this.setState({ hit, isloading: true });
        addedItems.forEach(async a => {
            const { username, password } = inSession;
            const product = {
                username, password,
                'name': a.name,
                'price': a.price,
                'qty': a.qty,
                'product_id': a.id
            }
            try {
                await API.POST('order', product);
                const b = {
                    'id': a.id,
                    'price': a.price
                }
                deleteItem(b);
                x--;
                this.setProgress(n);
                if (x < 1) {
                    this.setAlert('Success!', 'Created new order successfuly!');
                    this.setState({ isloading: false });
                }
            } catch (err) {
                // console.error('error => ', err);
                alert(err.message);
                this.setState({ isloading: false, labelButton: 'Coba lagi', icon: MoveTo });
            }
        });
    }

    setProgress = n => {
        let value = Math.round(100 / n);
        value += this.state.progress
        this.setState({ progress: value });
    }

    setAlert(title, message) {
        const alert = { title, message }
        this.setState({ alert });
    }

    moveToSingle = id => {
        this.props.history.push(`/single/${id}`);
    }

    render() {
        return (
            this.state.alert ? <Alert title={this.state.alert.title} message={this.state.alert.message} /> :
                <Fragment>
                    <div className="cart-progress">
                        <Progress percentase={this.state.progress} />
                    </div>
                    <div className="form-title">Order Summary</div>
                    <Wrapper className="margin-bottom-80 mt-3" container={
                        <Fragment>
                            <OrderSummary
                                onSession={this.props.inSession}
                                addedItems={this.props.addedItems}
                                totalOrder={this.props.totalOrder}
                                shipping={this.state.shipping}
                                idName="id"
                                ngClickProduct={this.moveToSingle}
                            />
                            <AsyncButton
                                isLoading={this.state.isloading}
                                label={this.state.labelButton}
                                ngClick={this.makePayment}
                                icon={this.state.icon}
                            />
                        </Fragment>
                    } />
                </Fragment>
        );
    }

}

const mapStateToProps = state => ({
    inSession: state.inSession,
    addedItems: state.addedItems,
    totalOrder: state.total
});

const dispatch = dispatch => ({
    deleteItem: product => dispatch({ type: "DELETE_CART", product }),
    destroy: () => dispatch({ type: 'DESTROY_CART' })
});

export default connect(mapStateToProps, dispatch)(MakePayment);