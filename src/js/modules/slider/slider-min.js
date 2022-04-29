import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
        this.paused = null;
    }

    bindTrigger() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });

        this.prev.addEventListener('click', () => {
            this.prevSlide();
        });
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
        if (this.slides[0].tagName != "BUTTON") {
            this.slides[0].classList.add(this.activeClass);
        }
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    animation(autoplay) {
        if (autoplay) {
            this.paused = setInterval(() => this.nextSlide(), 5000);

            [this.container, this.prev, this.next].forEach(item => {
                item.addEventListener('mouseenter', () => {
                    clearInterval(this.paused);
                });
            });

            [this.container, this.prev, this.next].forEach(item => {
                item.addEventListener('mouseleave', () => {
                    this.paused = setInterval(() => this.nextSlide(), 5000);
                });
            });
        }
    }

    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;

            this.bindTrigger();
            this.decorizeSlides();
            this.animation(this.autoplay);
        } catch(e) {}
    }

    nextSlide() {
        if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
            this.container.appendChild(this.slides[1]);
            this.container.appendChild(this.slides[1]);
        }

        this.container.appendChild(this.slides[0]);
        
        this.decorizeSlides();
    }

    prevSlide() {
        if (this.slides[this.slides.length - 1].tagName == "BUTTON" && this.slides[this.slides.length - 2].tagName == "BUTTON") {
            this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
            this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
        }
        let active = this.slides[this.slides.length - 1];
        
        this.container.insertBefore(active, this.slides[0]);
        this.decorizeSlides();
    }


}