const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      transition: transform 0.2s;
    }
    :host(:hover) { transform: translateY(-5px); }
    
    .image-wrapper {
      position: relative;
      height: 200px;
      background-color: #f9f9f9;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .promo-badge {
      position: absolute;
      top: 10px; right: 10px;
      background-color: #e63946;
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      display: none; /* Domyślnie ukryte */
    }
    .content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 10px;
    }
    h2 { margin: 0; font-size: 1.1rem; color: #1d3557; }
    .price { font-size: 1.25rem; font-weight: 700; color: #457b9d; }
    .btn-cart {
      margin-top: auto;
      background-color: #1d3557;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 4px;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: bold;
    }
    .btn-cart:hover { background-color: #457b9d; }
  </style>

  <div class="image-wrapper">
    <div class="promo-badge" id="promo"></div>
    <img id="image" src="" alt="Produkt" />
  </div>
  <div class="content">
    <h2 id="name"></h2>
    <div class="price" id="price"></div>
    <button class="btn-cart" id="btn">Do koszyka</button>
  </div>
`;

export default class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._data = null;
    }

    connectedCallback() {
        this.shadowRoot.getElementById('btn').addEventListener('click', () => {
            if (this._data) {
                this.dispatchEvent(
                    new CustomEvent('add-to-cart', {
                        detail: this._data,
                        bubbles: true,
                        composed: true,
                    })
                );
            }
        });
    }

    set data(value) {
        this._data = value;
        this.render();
    }

    get data() {
        return this._data;
    }

    render() {
        if (!this._data) return;

        const { name, price, image, promo } = this._data;

        this.shadowRoot.getElementById('name').textContent = name;
        this.shadowRoot.getElementById('price').textContent = `${price.toFixed(
            2
        )} PLN`;
        this.shadowRoot.getElementById('image').src = image;

        const promoEl = this.shadowRoot.getElementById('promo');
        if (promo) {
            promoEl.textContent = promo;
            promoEl.style.display = 'block';
        } else {
            promoEl.style.display = 'none';
        }
    }
}

customElements.define('product-card', ProductCard);
