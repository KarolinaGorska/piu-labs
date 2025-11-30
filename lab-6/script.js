import { Ajax } from '../lib/ajax.js';

const api = new Ajax({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 4000,
});

const btnLoad = document.getElementById('btn-load');
const btnError = document.getElementById('btn-error');
const btnReset = document.getElementById('btn-reset');

const list = document.getElementById('list');
const errorBox = document.getElementById('error');
const loader = document.getElementById('loader');

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

function showError(msg) {
    errorBox.textContent = msg;
}

function clearError() {
    errorBox.textContent = '';
}

function resetView() {
    list.innerHTML = '';
    clearError();
}

btnLoad.addEventListener('click', async () => {
    resetView();
    showLoader();

    try {
        const posts = await api.get('/posts');

        posts.slice(0, 10).forEach((post) => {
            const li = document.createElement('li');
            li.textContent = post.title;
            list.appendChild(li);
        });
    } catch (err) {
        showError(err.message);
    }

    hideLoader();
});

btnError.addEventListener('click', async () => {
    resetView();
    showLoader();

    try {
        await api.get('/this/endpoint/does/not/exist');
    } catch (err) {
        showError('Błąd: ' + err.message);
    }

    hideLoader();
});

btnReset.addEventListener('click', () => {
    resetView();
});
