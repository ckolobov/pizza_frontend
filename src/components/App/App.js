import React from "react";
import './App.css';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ItemList from "../ItemList/ItemList";
import Cart from "../Cart/Cart";

import PizzaService from "../../services/PizzaService";
import DummyPizzaService from "../../services/DummyPizzaService";

export default class App extends React.Component {

    state = {
        pizzaService: new DummyPizzaService(),
        showLoginBtn: false,
        showCart: false,
        inCart: null,
        totalPrice: 2,
        totalAmount: 0
    };

    onCartBtnClick = () => {
        this.setState(({ showCart }) =>{
            return {
                showCart: !showCart
            }
        })
    };

    onAddToCart = (id, name, price) => {
        this.setState(({ inCart, totalPrice, totalAmount }) => {
            const priceNum = parseFloat(price);

            if (!inCart) {
                return {
                    inCart: [{id: id, name: name, price: price, amount: 1}],
                    totalPrice: totalPrice + priceNum,
                    totalAmount: totalAmount + 1
                }
            }

            const idx = inCart.findIndex((el) => el.id === id);

            if (idx === -1) {
                return {
                    inCart: [...inCart, {id: id, name: name, price: price, amount: 1}],
                    totalPrice: totalPrice + priceNum,
                    totalAmount: totalAmount + 1
                }
            } else {
                const oldItem = inCart[idx];
                const newItem = {...oldItem, amount: oldItem['amount'] + 1};

                return {
                    inCart: [...inCart.slice(0, idx), newItem, ...inCart.slice(idx + 1)],
                    totalPrice: totalPrice + priceNum,
                    totalAmount: totalAmount + 1
                }
            }

        });
    };

    onRemoveFromCart = (id) => {
        this.setState(({ inCart, totalPrice, totalAmount }) => {
            const idx = inCart.findIndex((el) => el.id === id);
            const oldItem = inCart[idx];
            const priceNum = parseFloat(oldItem.price);

            if (oldItem.amount > 1) {
                const newItem = {...oldItem, amount: oldItem['amount'] - 1};
                return {
                    inCart: [...inCart.slice(0, idx), newItem, ...inCart.slice(idx + 1)],
                    totalPrice: totalPrice - priceNum,
                    totalAmount: totalAmount - 1
                }
            } else {
                return {
                    inCart: [...inCart.slice(0, idx), ...inCart.slice(idx + 1)],
                    totalPrice: totalPrice - priceNum,
                    totalAmount: totalAmount - 1
                }
            }

        });
    };

    render() {
        const cart = this.state.showCart ?
            <Cart
                data={this.state.inCart}
                totalPrice={this.state.totalPrice}
                onRemoveFromCart={this.onRemoveFromCart}
                postOrder={this.state.pizzaService.postOrder}
            />
            : null;

        return (
            <div className="container pageContainer">
                <Header onCartBtnClick={this.onCartBtnClick} showLogin={this.showLoginBtn} totalAmount={this.state.totalAmount}/>
                {cart}
                <main className="main">
                    <ItemList getData={this.state.pizzaService.getAllPizzas} onAddToCart={this.onAddToCart}/>
                </main>
                <Footer />
            </div>
        );
    }
};

