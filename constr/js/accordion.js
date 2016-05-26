var accordion = document.querySelectorAll('.accordion');
for (var i = 0; i < accordion.length; i++){
    new Accordion(accordion[i]);
}



function Accordion(rootNode){
    var that = this;
    this.rootEl = rootNode;

    this.untoggle = function(){
        var prev = this.rootEl.querySelector('.accordion__item--active');
        prev && prev.classList.remove('accordion__item--active');
    };

    this.toggle = function(target){
        if ((closest(target, '.accordion__item') != that.rootEl.querySelector('.accordion__item--active'))) this.untoggle();
        closest(target, '.accordion__item').classList.toggle('accordion__item--active');
    };

    this.listen = function(){
        this.rootEl.addEventListener('click', function(e){
            if (e.target.classList.contains('accordion__heading') ||
                e.target.classList.contains('accordion__toggle')){

                that.toggle(e.target);

                console.warn(closest(e.target, '.accordion__item') == that.rootEl.querySelector('.accordion__item--active'))
                console.warn(closest(e.target, '.accordion__item'), that.rootEl.querySelector('.accordion__item--active'))
            }
        });
    };

    this.init = function(){
        this.listen();
    };

    this.init();
}


