import MainSlider from "./modules/slider/slider-main";
import SliderV2 from "./modules/slider/sliderV2";
import VideoPlayer from './modules/playVideo';
import MiniSlider from "./modules/slider/slider-min";
import Difference from './modules/difference';
import Form from './modules/form';
import ShowInfo from './modules/showInfo';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
    const sliderMain = new MainSlider({
        container: '.page',
        btns: '.page .next'
    });
    sliderMain.render();

    const modulePageSlider = new MainSlider({
        container: '.moduleapp',
        btns: '.moduleapp .next',
        modulePrev: '.prevmodule',
        moduleNext: '.nextmodule'
    });
    modulePageSlider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();
    
    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.module__video-item .play', '.overlay').init();

    const oldOfficer = new Difference('.officerold', '.officer__card-item');
    oldOfficer.init();

    const newOfficer = new Difference('.officernew', '.officer__card-item');
    newOfficer.init();

    const form = new Form('.form');
    form.init();

    new ShowInfo('.module__info-show .plus').init();

    new Download('.download').init();
});