const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 320px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      font-family: inherit;
    }

    :host(:hover) {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0,0,0,0.1);
    }

    .image-wrapper {
      position: relative;
      width: 100%;
      height: 280px;
      background-color: #f9f9f9;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    ::slotted(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .promo-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 2;
    }

    ::slotted([slot="promo"]) {
      background-color: #e63946;
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 10px;
    }

    h2 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #1d3557;
      line-height: 1.4;
    }

    .price {
      font-size: 1.25rem;
      font-weight: 700;
      color: #457b9d;
    }

    .options {
      font-size: 0.9rem;
      color: #666;
    }

    ::slotted(ul) {
      margin: 5px 0 0 0;
      padding-left: 20px;
    }

    .btn-cart {
      margin-top: auto;
      background-color: #1d3557;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.9rem;
      transition: background 0.2s;
      width: 100%;
    }

    .btn-cart:hover {
      background-color: #457b9d;
    }
  </style>

  <div class="image-wrapper">
    <div class="promo-badge">
        <slot name="promo"></slot>
    </div>
    <slot name="image">
        <span style="color:#bbb">Brak zdjęcia</span>
    </slot>
  </div>

  <div class="content">
    <h2>
      <slot name="name">Nazwa produktu</slot>
    </h2>

    <div class="price">
      <slot name="price">-</slot>
    </div>

    <div class="options">
      <slot name="colors"></slot>
    </div>

    <div class="options">
      <slot name="sizes"></slot>
    </div>

    <button class="btn-cart">Do koszyka</button>
  </div>
`;

export default class ProductCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('product-card', ProductCard);
