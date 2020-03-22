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
        showCart: false,
        inCart: null,
        total: 0
    };

    onCartBtnClick = () => {
        this.setState(({ showCart }) =>{
            return {
                showCart: !showCart
            }
        })
    };

    onAddToCart = (id, name, price) => {
        this.setState(({ inCart, total }) => {
            const priceNum = parseFloat(price);

            if (!inCart) {
                return {
                    inCart: [{id: id, name: name, price: price, amount: 1}],
                    total: priceNum
                }
            }

            const idx = inCart.findIndex((el) => el.id === id);

            if (idx === -1) {
                return {
                    inCart: [...inCart, {id: id, name: name, price: price, amount: 1}],
                    total: total + priceNum
                }
            } else {
                const oldItem = inCart[idx];
                const newItem = {...oldItem, amount: oldItem['amount'] + 1};

                return {
                    inCart: [...inCart.slice(0, idx), newItem, ...inCart.slice(idx + 1)],
                    total: total + priceNum
                }
            }

        });
    };

    onRemoveFromCart = (id) => {
        this.setState(({ inCart, total }) => {
            const idx = inCart.findIndex((el) => el.id === id);
            const oldItem = inCart[idx];
            const priceNum = parseFloat(oldItem.price);

            if (oldItem.amount > 1) {
                const newItem = {...oldItem, amount: oldItem['amount'] - 1};
                return {
                    inCart: [...inCart.slice(0, idx), newItem, ...inCart.slice(idx + 1)],
                    total: total - priceNum
                }
            } else {
                return {
                    inCart: [...inCart.slice(0, idx), ...inCart.slice(idx + 1)],
                    total: total - priceNum
                }
            }

        });
    };

    render() {
        const cart = this.state.showCart ?
            <Cart data={this.state.inCart} total={this.state.total} onRemoveFromCart={this.onRemoveFromCart}/> :
            null;

        return (
            <div className="container pageContainer">
                <Header onCartBtnClick={this.onCartBtnClick} />
                {cart}
                <main className="main">
                    <div className="randomItem"></div>
                    <ItemList getData={this.state.pizzaService.getAllPizzas} onAddToCart={this.onAddToCart}/>
                </main>
                <Footer />
            </div>
        );
    }
};

