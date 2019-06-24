export default class {
    constructor() {
        this.queue = [];
    }

    add(record) {
        this.queue.push(record);
        return this.queue.length;
    }

    del(index) {
        this.queue.splice(0, index);
        return true;
    }

    save(key) {
        try {
            localStorage.setItem(key, JSON.stringify(this.queue));
        } catch (error) {

        }
    }

    restore(key) {
        const restored = JSON.parse((localStorage.getItem(key) || '[]'));
        Array.prototype.push.apply(this.queue, restored);
    }

}