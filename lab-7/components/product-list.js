import productsData from '../data.json' with { type: 'json' };
import './product-card.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
  </style>
  <div id="list-container" style="display: contents;"></div>
`;

export default class ProductList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const container = this.shadowRoot.getElementById('list-container');
    
    productsData.forEach(item => {
      const card = document.createElement('product-card');
      card.data = item; 
      
      container.appendChild(card);
    });
  }
}

customElements.define('product-list', ProductList);