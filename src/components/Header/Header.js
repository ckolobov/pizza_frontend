import React from "react";
import './Header.css';

const Header = ({ onCartBtnClick, showLogin }) => {

    const login = showLogin ?
        <div className="btn-group" role="group" aria-label="Login Group">
            <button type="button" className="btn btn-secondary">Login</button>
            <button type="button" className="btn btn-secondary">Register</button>
        </div>
        : null;

    return (
        <header className="header">
            <a className="header__logo" href="#">Superr Pizza</a>
            <div className="header__buttons">
                {login}
                <button type="button"
                        className="btn btn-primary"
                        onClick={onCartBtnClick}
                >
                    Cart
                </button>
            </div>
        </header>
    )
};

export default Header;