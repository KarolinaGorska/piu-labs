import { store } from './store.js';

const listEl = document.getElementById('shapes-list');
const countSquaresEl = document.getElementById('count-squares');
const countCirclesEl = document.getElementById('count-circles');

function createShapeElement(shape) {
    const el = document.createElement('div');
    el.className = 'shape ' + (shape.type === 'circle' ? 'circle' : 'square');
    el.style.background = shape.color;
    el.dataset.id = shape.id;
    return el;
}

function syncAdded(state) {
    state.shapes.forEach((s) => {
        if (!listEl.querySelector(`[data-id="${s.id}"]`)) {
            const el = createShapeElement(s);
            listEl.appendChild(el);
        }
    });
}

function syncRemoved(state) {
    const rendered = Array.from(listEl.querySelectorAll('.shape')).map(
        (el) => el.dataset.id
    );
    const stateIds = state.shapes.map((s) => s.id);
    rendered.forEach((id) => {
        if (!stateIds.includes(id)) {
            const el = listEl.querySelector(`[data-id="${id}"]`);
            if (el) el.remove();
        }
    });
}

function updateColors(state) {
    state.shapes.forEach((s) => {
        const el = listEl.querySelector(`[data-id="${s.id}"]`);
        if (el) el.style.background = s.color;
    });
}

function updateCounters(state) {
    countSquaresEl.textContent = state.shapes.filter(
        (s) => s.type === 'square'
    ).length;
    countCirclesEl.textContent = state.shapes.filter(
        (s) => s.type === 'circle'
    ).length;
}

export function initUI(initialState) {
    listEl.innerHTML = '';
    initialState.shapes.forEach((s) => {
        const el = createShapeElement(s);
        listEl.appendChild(el);
    });
    updateCounters(initialState);
}

store.subscribe((state) => {
    syncRemoved(state);
    syncAdded(state);
    updateColors(state);
    updateCounters(state);
});

listEl.addEventListener('click', (e) => {
    const shapeEl = e.target.closest('.shape');
    if (!shapeEl) return;
    const id = shapeEl.dataset.id;
    store.removeShape(id);
});
