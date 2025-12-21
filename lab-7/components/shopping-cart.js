const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      background: white;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #ddd;
      min-width: 250px;
    }
    h2 { margin-top: 0; border-bottom: 2px solid #eee; padding-bottom: 10px; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { 
      display: flex; 
      justify-content: space-between; 
      align-items: center;
      padding: 8px 0; 
      border-bottom: 1px solid #f1f1f1; 
    }
    .total {
      margin-top: 20px;
      font-weight: bold;
      font-size: 1.2rem;
      text-align: right;
      border-top: 2px solid #333;
      padding-top: 10px;
    }
    button.remove {
      background: #ff4d4d;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 2px 8px;
      cursor: pointer;
      margin-left: 10px;
      font-size: 0.8rem;
    }
  </style>
  
  <h2>Koszyk</h2>
  <ul id="cart-list">
    <li>Koszyk jest pusty</li>
  </ul>
  <div class="total">Suma: <span id="total-price">0.00</span> PLN</div>
`;

export default class ShoppingCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.items = [];
    }

    addItem(product) {
        this.items.push(product);
        this.render();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.render();
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    }

    render() {
        const list = this.shadowRoot.getElementById('cart-list');
        const totalEl = this.shadowRoot.getElementById('total-price');

        list.innerHTML = '';

        if (this.items.length === 0) {
            list.innerHTML = '<li>Koszyk jest pusty</li>';
        } else {
            this.items.forEach((item, index) => {
                const li = document.createElement('li');

                const span = document.createElement('span');
                span.textContent = `${item.name} (${item.price} zł)`;

                const btn = document.createElement('button');
                btn.textContent = 'X';
                btn.className = 'remove';
                btn.onclick = () => this.removeItem(index);

                li.appendChild(span);
                li.appendChild(btn);
                list.appendChild(li);
            });
        }

        totalEl.textContent = this.getTotal();
    }
}

customElements.define('shopping-cart', ShoppingCart);
