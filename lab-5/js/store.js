import { uid, randomColor } from './helpers.js';

class Store {
    constructor() {
        this.subscribers = [];
        this.state = {
            shapes: [],
        };

        this.key = 'lab5_shapes_v1';

        this.load();
    }

    subscribe(fn) {
        if (typeof fn === 'function') this.subscribers.push(fn);
    }

    notify() {
        this.save();
        const snapshot = JSON.parse(JSON.stringify(this.state));
        this.subscribers.forEach((fn) => {
            try {
                fn(snapshot);
            } catch (e) {
                console.error('subscriber error', e);
            }
        });
    }

    save() {
        try {
            localStorage.setItem(this.key, JSON.stringify(this.state.shapes));
        } catch (e) {
            console.error('Save failed', e);
        }
    }

    load() {
        try {
            const raw = localStorage.getItem(this.key);
            if (raw) {
                this.state.shapes = JSON.parse(raw);
            }
        } catch (e) {
            console.error('Load failed', e);
            this.state.shapes = [];
        }
    }

    addShape(type) {
        const shape = {
            id: uid(),
            type: type === 'circle' ? 'circle' : 'square',
            color: randomColor(),
        };
        this.state.shapes.push(shape);
        this.notify();
        return shape;
    }

    removeShape(id) {
        const before = this.state.shapes.length;
        this.state.shapes = this.state.shapes.filter((s) => s.id !== id);
        if (this.state.shapes.length !== before) {
            this.notify();
        }
    }

    recolor(type) {
        this.state.shapes = this.state.shapes.map((s) =>
            s.type === type ? { ...s, color: randomColor() } : s
        );
        this.notify();
    }

    count(type) {
        return this.state.shapes.filter((s) => s.type === type).length;
    }
}

export const store = new Store();
