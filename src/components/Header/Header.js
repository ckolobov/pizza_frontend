import React from "react";
import './Header.css';

const Header = ({ onCartBtnClick, showLogin, totalAmount }) => {

    const login = showLogin ?
        <div className="btn-group" role="group" aria-label="Login Group">
            <button type="button" className="btn btn-secondary">Login</button>
            <button type="button" className="btn btn-secondary">Register</button>
        </div>
        :
        null;

    const badge = totalAmount > 0 ?
        <span className="badge badge-light">{totalAmount}</span>
        :
        null;

    return (
        <header className="header">
            <a className="header__logo" href="#">Superr Pizza</a>
            <div className="header__buttons">
                {login}
                <button type="button"
                        className="btn btn-primary"
                        onClick={onCartBtnClick}
                >
                    Cart {badge}
                </button>
            </div>
        </header>
    )
};

export default Header;