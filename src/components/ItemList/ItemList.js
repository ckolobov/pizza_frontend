import React from "react";
import './ItemList.css';

const ItemList = () => {
    return (
        <div className="itemList">
            <div className="itemList__item">
                <div className="img"></div>
                <div className="price">3 $</div>
                <button type="button" className="btn btn-success">Add to Quote</button>
            </div>
        </div>
    )
};

export default ItemList;