import React from "react";
import './App.css';

const App = () => {
    return (
        <div className="container pageContainer">
            <header className="header">
                <div className="header__logo">Logo</div>
                <div className="header__buttons">
                    <button type="button" className="btn btn-light">Login</button>
                    <button type="button" className="btn btn-light">Register</button>
                    <button type="button" className="btn btn-light">Cart</button>
                </div>
            </header>
            <main className="main">
                <div className="randomItem"></div>
                <div className="itemList"></div>
            </main>
            <footer className="footer">© Copyright</footer>
        </div>
    );
};

export default App