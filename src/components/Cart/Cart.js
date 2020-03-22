import React from "react";
import './Cart.css';

const Cart = ({ data, total, onRemoveFromCart }) => {
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
            <form className="confirmOrderForm d-flex"
                  // onSubmit={this.onSubmit}
            >
                <input type="text"
                       className="form-control confirmOrderForm__input"
                       placeholder="Name"
                />
                <input type="tel"
                       className="form-control confirmOrderForm__input"
                       placeholder="Phone"
                />
                <button type="submit"
                        className="btn btn btn-outline-primary"
                >
                    Confirm
                </button>
            </form>
        </div>
    )
};

export default Cart;