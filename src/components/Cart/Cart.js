import React from "react";
import './Cart.css';

export default class Cart extends React.Component {

    state = {
        client_name: '',
        client_phone: '',
        client_address: '',
        loading: false,
        error: false,
        confirmed: false
    };

    onSubmit = (evt) => {
        evt.preventDefault();
        const { client_name, client_phone, client_address } = this.state;
        this.setState({
            loading: true
        });
        this.props.postOrder({
            client_name: client_name,
            client_phone: client_phone,
            client_address: client_address,
            order_data: this.props.data
        })
            .then(() => {
                this.setState({
                    loading: false,
                    confirmed: true
                });
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    error: true
                })
            });
        this.setState({
            client_name: '',
            client_phone: '',
            client_address: ''
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

    onClientAddressChange = (evt) => {
        this.setState({
            client_address: evt.target.value
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
                    <div className="itemPrice">€ {price} $ {(price * 1.1).toFixed(2)}</div>
                    <div className="itemAmount">{amount}</div>
                    <div className="itemSum">
                        € {(price * amount).toFixed(2)} $ {(price * amount * 1.1).toFixed(2)}
                    </div>
                    <button type="button" className="btn btn-danger" onClick={() => {onRemoveFromCart(id)}}>Remove</button>
                </div>
            )
        });

        const { confirmed, loading, error, client_name, client_phone, client_address } = this.state;

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
                       required
                />
                <input type="tel"
                       className="form-control confirmOrderForm__input"
                       onChange={this.onClientPhoneChange}
                       placeholder="Phone"
                       value={client_phone}
                       required
                />
                <input type="text"
                       className="form-control confirmOrderForm__input"
                       onChange={this.onClientAddressChange}
                       placeholder="Delivery Address"
                       value={client_address}
                       required
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
                    <div className="itemSum">Delivery: € 2 $ 2.20 </div>
                </div>
                <div className="cart__item">
                    <div className="itemSum">Total: € {total.toFixed(2)} $ {(total * 1.1).toFixed(2)}</div>
                </div>
                {loadingMsg}
                {errorMsg}
                {confirmedMsg}
                {form}
            </div>
        )
    }
};

