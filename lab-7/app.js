import './components/product-list.js';
import './components/shopping-cart.js';

const cartComponent = document.querySelector('shopping-cart');

document.addEventListener('add-to-cart', (e) => {
    const productData = e.detail;
    console.log('Dodano do koszyka:', productData);

    cartComponent.addItem(productData);
});
