import React from "react";
import './App.css';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ItemList from "../ItemList/ItemList";

const App = () => {
    return (
        <div className="container pageContainer">
            <Header />
            <main className="main">
                <div className="randomItem"></div>
                <ItemList />
            </main>
            <Footer />
        </div>
    );
};

export default App