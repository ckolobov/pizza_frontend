export default class DummyPizzaService {
    _pizzas = [
        {
            id: 1,
            name: 'Margherita',
            description: 'Tomato Sauce, Mozzarella, Italian seasoning, cherry tomatoes',
            price: '10',
            image: 'margherita.jpg'
        },

        {
            id: 2,
            name: '4 Cheese',
            description: 'Creamy sauce, cheddar, blue cheese, mozzarella cheese, hard cheese',
            price: '10.50',
            image: '4cheese.jpg'
        },

        {
            id: 3,
            name: 'Chicken BBQ',
            description: 'Bbq sauce, red onions, bacon, mozzarella, chicken, marinara sauce',
            price: '10.30',
            image: 'bbq.jpg'
        },

        {
            id: 4,
            name: 'Ham & Mashrooms',
            description: 'Mushrooms, extra mozzarella, ham, marinara sauce',
            price: '10',
            image: 'ham_mashrooms.jpeg'
        },

        {
            id: 5,
            name: 'Hawaiian',
            description: 'Tomato sauce, mozzarella, chicken, pineapple',
            price: '9.50',
            image: 'hawaiian.jpg'
        },

        {
            id: 6,
            name: 'Italian',
            description: 'Pepperoni, tomato sauce, mushrooms, mozzarella, olive, italian seasoning',
            price: '9.50',
            image: 'italian.jpg'
        },

        {
            id: 7,
            name: 'Meet',
            description: 'Chicken, ham, pepperoni, tomato sauce, chorizo, mozzarella',
            price: '10.50',
            image: 'meet.jpg'
        },


        {
            id: 8,
            name: 'Pepperoni & green peper',
            description: 'Marinara sauce, extra mozzarella, double pepperoni, green peppers',
            price: '10',
            image: 'pepperoni.jpeg'
        }

    ];

    postOrder = async (data) => {
        console.log(data);
        console.log(JSON.stringify(data));
    };


    getAllPizzas = async () => {
        return this._pizzas;
    };

    getPizza = async (id) => {
        return this._pizzas[id - 1];
    };

};
