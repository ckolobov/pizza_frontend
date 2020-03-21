import React from "react";
import './App.css';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ItemList from "../ItemList/ItemList";

import PizzaService from "../../services/PizzaService";
import DummyPizzaService from "../../services/DummyPizzaService";

export default class App extends React.Component {

    state = {
        pizzaService: new DummyPizzaService()
    };

    render() {
        return (
            <div className="container pageContainer">
                <Header />
                <main className="main">
                    <div className="randomItem"></div>
                    <ItemList getData={this.state.pizzaService.getAllPizzas}/>
                </main>
                <Footer />
            </div>
        );
    }
};

