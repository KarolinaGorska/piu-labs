const kanban = document.getElementById('kanban');

function randomPastel() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 80%, 85%)`;
}

function loadBoard() {
    const data = JSON.parse(localStorage.getItem('kanbanData')) || {};
    document.querySelectorAll('.column').forEach((col) => {
        const columnName = col.dataset.column;
        const cardsContainer = col.querySelector('.cards');
        cardsContainer.innerHTML = '';

        if (data[columnName]) {
            data[columnName].forEach((card) => {
                const c = createCard(card.text, card.color, card.id);
                cardsContainer.appendChild(c);
            });
        }
        updateCount(col);
    });
}

function saveBoard() {
    const data = {};
    document.querySelectorAll('.column').forEach((col) => {
        const columnName = col.dataset.column;
        const cards = col.querySelectorAll('.card');
        data[columnName] = [...cards].map((c) => ({
            id: c.dataset.id,
            text: c.querySelector('.content').textContent.trim(),
            color: c.style.backgroundColor,
        }));
    });
    localStorage.setItem('kanbanData', JSON.stringify(data));
}

function createCard(
    text = 'Nowa karta',
    color = randomPastel(),
    id = Date.now()
) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundColor = color;
    card.dataset.id = id;

    const content = document.createElement('div');
    content.className = 'content';
    content.contentEditable = true;
    content.textContent = text;

    const controls = document.createElement('div');
    controls.className = 'controls';

    const del = document.createElement('button');
    del.textContent = '❌';
    del.className = 'delete';

    const left = document.createElement('button');
    left.textContent = '←';
    left.className = 'move-left';

    const right = document.createElement('button');
    right.textContent = '→';
    right.className = 'move-right';

    const recolor = document.createElement('button');
    recolor.textContent = '🎨';
    recolor.className = 'color-card';

    controls.append(left, right, recolor, del);
    card.append(content, controls);
    return card;
}

function updateCount(col) {
    const count = col.querySelectorAll('.card').length;
    col.querySelector('.count').textContent = count;
}

kanban.addEventListener('click', (e) => {
    const btn = e.target;
    const col = btn.closest('.column');
    if (!col) return;

    const cardsContainer = col.querySelector('.cards');

    if (btn.classList.contains('add')) {
        const c = createCard();
        cardsContainer.appendChild(c);
        updateCount(col);
        saveBoard();
    }

    if (btn.classList.contains('color')) {
        const cards = col.querySelectorAll('.card');
        cards.forEach((c) => (c.style.backgroundColor = randomPastel()));
        saveBoard();
    }

    if (btn.classList.contains('sort')) {
        const cards = [...col.querySelectorAll('.card')];
        cards.sort((a, b) =>
            a
                .querySelector('.content')
                .textContent.localeCompare(
                    b.querySelector('.content').textContent
                )
        );
        cards.forEach((c) => cardsContainer.appendChild(c));
        saveBoard();
    }

    if (btn.classList.contains('delete')) {
        btn.closest('.card').remove();
        updateCount(col);
        saveBoard();
    }

    if (btn.classList.contains('color-card')) {
        const card = btn.closest('.card');
        card.style.backgroundColor = randomPastel();
        saveBoard();
    }

    if (btn.classList.contains('move-right')) {
        const next = col.nextElementSibling;
        if (next) {
            next.querySelector('.cards').appendChild(btn.closest('.card'));
            updateCount(col);
            updateCount(next);
            saveBoard();
        }
    }

    if (btn.classList.contains('move-left')) {
        const prev = col.previousElementSibling;
        if (prev) {
            prev.querySelector('.cards').appendChild(btn.closest('.card'));
            updateCount(col);
            updateCount(prev);
            saveBoard();
        }
    }
});

kanban.addEventListener('input', (e) => {
    if (e.target.classList.contains('content')) {
        saveBoard();
    }
});

window.addEventListener('DOMContentLoaded', loadBoard);
