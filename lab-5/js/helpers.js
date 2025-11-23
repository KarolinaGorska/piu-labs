export function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function randomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue} 70% 82%)`;
}
