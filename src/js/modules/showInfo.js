export default class ShowInfo {
    constructor(trigger) {
        this.btns = document.querySelectorAll(trigger);
    }

    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.module__info-show').nextElementSibling.style.display = "block";
            });
        });
    }
}