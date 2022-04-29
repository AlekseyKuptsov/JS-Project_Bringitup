export default class VideoPlayer {
    constructor(trigger, overlay) {
        this.btns = document.querySelectorAll(trigger);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers() {
        this.btns.forEach((btn, i) => {
            try {
                if (i % 2 == 0) {
                    btn.closest('.module__video-item').nextElementSibling.setAttribute('data-disabled', 'true');
                }
            } catch(e){}
            btn.addEventListener('click', () => {
                if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    this.activeBtn = btn;
                    if (!document.querySelector('iframe#frame')) {
                        this.path = btn.getAttribute('data-url');
                        this.createPlayer(this.path);
                    } else {
                        this.overlay.style.display = 'flex';
                        if (this.path !== btn.getAttribute('data-url')) {
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({
                                videoId: this.path
                            });
                        }
                    }
                }
            });
        });
    }

    bindClose() {
        this.close.addEventListener('click', () => {
            // const video = document.querySelector('.overlay .video');
            // const frame = document.createElement('div');
            // frame.id = 'frame';
            // video.querySelector('#frame').remove();
            // video.insertBefore(frame, this.close);
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });

        this.overlay.style.display = 'flex';
    }

    onPlayerStateChange(state) {
        try {
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
            const playBtnIcon = this.activeBtn.querySelector('svg').cloneNode(true);

            if (state.data == YT.PlayerState.ENDED) {
                if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
                    blockedElem.querySelector('.play__circle').classList.remove('closed');
                    blockedElem.querySelector('svg').remove();
                    blockedElem.querySelector('.play__circle').appendChild(playBtnIcon);
                    blockedElem.querySelector('.play__text').textContet = 'play video';
                    blockedElem.querySelector('.play__text').classList.remove('attention');
                    blockedElem.style.opacity = 1;
                    blockedElem.style.filter = 'none';
                    blockedElem.setAttribute('data-disabled', 'false');
                }
            }
        } catch(e){}
    }

    init() {
        if (this.btns.length > 0) {
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.bindTriggers();
            this.bindClose(); 
        }
        
    }
}