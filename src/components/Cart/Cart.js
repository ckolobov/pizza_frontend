import React from "react";
import './Cart.css';

export default class Cart extends React.Component {

    state = {
        client_name: '',
        client_phone: '',
        loading: false,
        error: false,
        confirmed: false
    };

    onSubmit = (evt) => {
        evt.preventDefault();
        this.setState({
            loading: true
        });
        this.props.postOrder({
            client_name: this.state.client_name,
            client_phone: this.state.client_phone,
            order_data: this.props.data
        })
            .then((data) => {
                console.log(data);
                this.setState({
                    loading: false,
                    confirmed: true
                });
            })
            .catch((e) => {
                console.log(e);
                this.setState({
                    loading: false,
                    error: true
                })
            });
        this.setState({
            client_name: '',
            client_phone: '',
        });
    };

    onClientNameChange = (evt) => {
        this.setState({
            client_name: evt.target.value
        })
    };

    onClientPhoneChange = (evt) => {
        this.setState({
            client_phone: evt.target.value
        })
    };

    render() {
        const { data, total, onRemoveFromCart } = this.props;

        if (!data || data.length === 0) {
            return <div className="cart__item">The cart is empty!</div>
        }

        const items = data.map(( item ) => {
            const { id, name, amount, price } = item;

            return (
                <div className="cart__item" key={id}>
                    <div className="itemName">{name}</div>
                    <div className="itemPrice">$ {price}</div>
                    <div className="itemAmount">{amount}</div>
                    <div className="itemSum">$ {(price * amount).toFixed(2)}</div>
                    <button type="button" className="btn btn-danger" onClick={() => {onRemoveFromCart(id)}}>Remove</button>
                </div>
            )
        });

        const { confirmed, loading, error, client_name, client_phone} = this.state;

        const loadingMsg = loading ? <div className="alert alert-info" role="alert">Loading ...</div> : null;
        const errorMsg = (!loading && error) ? <div className="alert alert-danger" role="alert">Error occured. Your order not confirmed!</div> : null;
        const confirmedMsg = (!loading && !error && confirmed) ? <div className="alert alert-success" role="alert">Your order is confirmed!</div> : null;
        const form =(!loading && !error && !confirmed) ?
            <form className="confirmOrderForm d-flex"
                  onSubmit={this.onSubmit}
            >
                <input type="text"
                       className="form-control confirmOrderForm__input"
                       onChange={this.onClientNameChange}
                       placeholder="Name"
                       value={client_name}
                />
                <input type="tel"
                       className="form-control confirmOrderForm__input"
                       onChange={this.onClientPhoneChange}
                       placeholder="Phone"
                       value={client_phone}
                />
                <button type="submit"
                        className="btn btn btn-outline-primary"
                >
                    Confirm
                </button>
            </form> : null;

        return (
            <div className="cart">
                <div className="cart__item">
                    <div className="itemName">Name</div>
                    <div className="itemPrice">Price</div>
                    <div className="itemAmount">Amount</div>
                    <div className="itemSum">Sum</div>
                    <div className="itemBtnTitle">Remove from cart</div>
                </div>
                {items}
                <div className="cart__item">
                    <div className="itemSum">Total: $ {total.toFixed(2)}</div>
                </div>
                {loadingMsg}
                {errorMsg}
                {confirmedMsg}
                {form}
            </div>
        )
    }
};

