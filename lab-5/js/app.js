import { store } from './store.js';
import { initUI } from './ui.js';

initUI(store.state);

document.getElementById('add-square').addEventListener('click', () => {
    store.addShape('square');
});

document.getElementById('add-circle').addEventListener('click', () => {
    store.addShape('circle');
});

document.getElementById('recolor-squares').addEventListener('click', () => {
    store.recolor('square');
});

document.getElementById('recolor-circles').addEventListener('click', () => {
    store.recolor('circle');
});
