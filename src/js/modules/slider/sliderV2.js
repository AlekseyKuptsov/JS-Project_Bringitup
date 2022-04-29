export default class SliderV2 {
    constructor(page, btn) {
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btn);
        this.height = document.documentElement.clientHeight;
        this.offset = 0;
    }


    showSlides(n) {
        this.slides.forEach(slide => {
            slide.style.display = 'block';
        });
        if (this.offset == this.height * (this.slides.length - 1)) {
            this.offset = 0;
        } else {
            this.offset += this.height;
        }

        this.page.style.transform = `translateY(-${n * this.offset}px)`;
    }

    render() {
        this.page.style.transition = '0.5s all';

        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.showSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSlides(0);
                this.offset = 0;
            });
        });
    }
}