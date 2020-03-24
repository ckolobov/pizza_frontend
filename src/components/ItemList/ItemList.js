import React from "react";
import './ItemList.css';

import images from './images'

export default class ItemList extends React.Component {

    state = {
        data: null,
        loading: true,
        error: false
    };

    componentDidUpdate(prevProps) {
        if (this.props.getData !== prevProps.getData) {
            this.update();
        }
    }

    componentDidMount() {
        this.update();
    }

    update() {
        this.setState({
            loading: true,
            error: false
        });
        this.props.getData()
            .then((data) => {
                this.setState({
                    data,
                    loading: false,
                });
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    error: true
                })
            });
    }

    render() {
        if (this.state.loading) {
            return <h2>Loading ...</h2>;
        }

        if (this.state.error) {
            return <h2>Error!</h2>;
        }

        const items = this.state.data.map(( item ) => {
            const { id, name, price } = item;
            const image = images.find(img => img.id === id);

            return (
                <div className="itemList__item" key={id}>
                    <img className="itemImage" src={image.src} alt={name} title={name}/>
                    <div className="itemName">{name}</div>
                    <div className="itemPrice">€ {price} $ {(price * 1.1).toFixed(2)}</div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {this.props.onAddToCart(id, name, price)}}
                    >
                        Add to Cart
                    </button>
                </div>
            )
        });

        return (
            <div className="itemList">
                {items}
            </div>
        )
    }

};