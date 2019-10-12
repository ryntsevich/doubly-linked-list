const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        const node = new Node(data);

        if (this.isEmpty()) {
            this._head = node;
            this._tail = node;
            this.length = 1;
        } else {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
            this.length++
        }

        return this;
    }

    head() {
        return this.length > 0 ? this._head.data : null;
    }

    tail() {
        return this.length > 0 ? this._tail.data : null;
    }

    at(index) {
        return this.searchNode(index).data;
    }

    searchNode(index) {
        let node = this._head;
        for (let i = 0; i < index; i++)
            node = node.next;
        return node;
    }

    insertAt(index, data) {
        const ToInsert = new Node(data);
        let searched = this.searchNode(index);
        if (searched === null) this.append(data);
        else {
            searched.prev.next = ToInsert;
            ToInsert.prev = searched.prev;
            ToInsert.next = searched;
            searched.prev = ToInsert;
            this.length++;
        }
        return this;
    }

    isEmpty() {
        return this._tail === null && this._head === null;
    }

    clear() {
        this._head = this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let del = this.searchNode(index);
        if (this.length == 1) this.clear();
        else {
            this.length--;
            [del.prev.next, del.next.prev] = [del.next, del.prev];
        }
        return this;
    }

    reverse() {
        let all = new Array;
        for (let i = 0; i < this.length; i++)
            all.push(this.searchNode(i));
        for (let i = 0; i < this.length; i++)
            [all[i].prev, all[i].next] = [all[i].next, all[i].prev];
        [this._head, this._tail] = [this._tail, this._head];
        return this;
    }

    indexOf(data) {
        let node = this._head;
        for (let i = 0; i < this.length + 1; i++) {
            if (node.data == data) return i;
            node = node.next || node;
        }
        return -1;
    }
}

module.exports = LinkedList;