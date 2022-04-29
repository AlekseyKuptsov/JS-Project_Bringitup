export default class Difference {
    constructor(officer, items) {
        this.officer = document.querySelector(officer);
        try {
            this.items = this.officer.querySelectorAll(items);
        } catch(e) {}
        this.counter = 0;
    }

    hideItems() {
        this.items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
                item.classList.add('animated');
            }
        });
    }

    bindTriggers() {
        this.officer.querySelector('.plus').addEventListener('click', () => {
            if (this.counter < this.items.length - 2) {
                this.items[this.counter].style.display = 'flex';
                this.items[this.counter].classList.add('fadeInDown');
                this.counter++;
            } else {
                this.items[this.counter].style.display = 'flex';
                this.items[this.counter].classList.add('fadeInDown');
                this.items[this.items.length - 1].style.display = 'none';
            }
        });
    }

    init() {
        try {
            this.hideItems();
            this.bindTriggers();
        } catch(e) {}
    }
}