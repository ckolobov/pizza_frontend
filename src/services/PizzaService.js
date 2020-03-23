export default class PizzaService {

    getAllPizzas = async () => {
        const res = await this.getResource(`/goods/`);
        return res.map(this._transformPizza);
    };

    getPizza = async (id) => {
        const pizza = await this.getResource(`/goods/${id}/`);
        return this._transformPizza(pizza);
    };

    getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    };

    _transformPizza = (pizza) => {
        return {
            id: pizza.goods_id,
            name: pizza.name,
            price: pizza.price,
            image: pizza.image,
        }
    };

    postOrder = async (data) => {
        return await this.postResource(`/order/`, data);
    };

    postResource = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return res;
    };


};
