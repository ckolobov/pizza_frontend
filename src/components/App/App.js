import React from "react";
import './App.css';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const App = () => {
    return (
        <div className="container pageContainer">
            <Header />
            <main className="main">
                <div className="randomItem"></div>
                <div className="itemList"></div>
            </main>
            <Footer />
        </div>
    );
};

export default App