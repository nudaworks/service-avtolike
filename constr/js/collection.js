var colles = document.querySelectorAll('.colle');
for (var i = 0; i < colles.length; i++){
    new CollectionListener(colles[i]);
}
console.warn(colles.length);

function CollectionListener(rootNode){
    var that = this;

    this.config = {
        ns: rootNode.dataset.ns || 'colle-card'
    };

    this.rootEl = rootNode;
    this.isNeededMore = false;
    this.els = this.rootEl.querySelectorAll('.js-card');
    this.buildBackside = function(headingText, buttText){
        var prefix, cardBack, unfipButt, heading, form, inputName, inputPhone, submitButt;

        prefix = this.config.ns + '__';

        cardBack = buildEl('div', prefix + 'back js-back');

        unfipButt = buildEl('div', prefix + 'back-close js-unflip');
        unfipButt.onclick = function(e){
            that.unflip();
        };

        heading = buildEl('div', prefix + 'back-heading js-heading', headingText);

        form = buildEl('form', prefix + 'back-form js-form');

        inputName = buildEl('input', prefix + 'back-input');
        inputName.setAttribute('name', 'name');
        inputName.setAttribute('type', 'text');
        inputName.setAttribute('placeholder', 'Имя');

        inputPhone = buildEl('input', prefix + 'back-input');
        inputPhone.setAttribute('name', 'phone');
        inputPhone.setAttribute('type', 'text');
        inputPhone.setAttribute('placeholder', 'Телефон');

        submitButt = buildEl('button', prefix + 'back-submit black', buttText);
        submitButt.setAttribute('type', 'button');
        submitButt.onclick = function(e){
            modalForm.validateForm(this);
        };

        // Appending to DOM

        form.appendChild(unfipButt);
        form.appendChild(heading);
        form.appendChild(inputName);
        form.appendChild(inputPhone);
        form.appendChild(submitButt);

        //cardBack.appendChild(closeButton);
        //cardBack.appendChild(heading);
        cardBack.appendChild(form);

        return cardBack;
    };

    this.flip = function(triggerButton){
        this.unflip();

        var
            root = closest(triggerButton, '.js-card'),
            sideb = root.querySelector('.js-back'),
            heading = root.querySelector('.js-heading');

        if (!sideb) {
            var back = this.buildBackside(heading.innerText, triggerButton.innerText);
            root.appendChild(back);
        }

        setTimeout((function(){
            root.classList.add('js-flipped');
        }), 100);

    };

    this.unflip = function(){
        var el = this.rootEl.querySelector('.js-flipped');
        if (el) {
            el.classList.remove('js-flipped');
        }

    };

    this.shorten = function(limit){
        console.info('shorten', limit);
        limit = limit || this.els.length;

        for (var i = 0; i < this.els.length; i++){
            if (i >= limit) {
                this.els[i].classList.add('m-hidden');
            } else {
                this.els[i].classList.remove('m-hidden');
            }
        }
    };

    this.buildShowMore = function(){
        var el = this.rootEl.parentNode.querySelector('.show-more');
        if (el) return;

        console.info('build show more!');

        var showMore, showMoreButton;

        showMore = document.createElement('div');
        showMore.className = 'show-more';

        showMoreButton = document.createElement('button');
        showMoreButton.className = 'show-more__button yellow';
        showMoreButton.innerHTML = 'Показать ещё';
        showMoreButton.onclick = function(){
            that.showMore();
        };

        showMore.appendChild(showMoreButton);
        this.rootEl.parentNode.appendChild(showMore);


    };

    this.showMore = function(){
        this.isNeededMore = true;
        this.shorten();
        this.destroyShowMore()
    };

    this.destroyShowMore = function(){
        console.info('destroy show more!');

        var el = this.rootEl.parentNode.querySelector('.show-more');
        console.warn(el);
        el && this.rootEl.parentNode.removeChild(el);
    };

    this.controlColleLength = function(){
        var w = window.innerWidth;
        if (w <= 580) {
            that.shorten();
        } else if (w <= 800) {
            if (that.isNeededMore){
                that.shorten();
            } else {
                that.shorten(5);
                that.buildShowMore();
            }
        } else if (w <= 1020) {
            if (that.isNeededMore){
                that.shorten();
            } else {
                that.shorten(9);
                that.buildShowMore();
            }
        } else {
            that.shorten();
            that.destroyShowMore();
        }
    };

    this.listen = function(){
        this.rootEl.addEventListener('click', function(e){
            if (e.target.classList.contains('js-flip')){
                that.flip(e.target);
            }
        });

        window.addEventListener('resize', function(e){
            that.controlColleLength();
        });


    };

    this.init = function(){
        this.controlColleLength();
        this.listen();
    };

    this.init();
}

// 9 - 5