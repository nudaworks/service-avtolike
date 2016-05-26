var crss = document.querySelectorAll('.crs');
for (var i = 0; i < crss.length; i++){
    var x = new Carousel(crss[i]);
}


function Carousel(carouselNode){
    var that = this;
    this.rootEl = carouselNode;
    this.contentEl = this.rootEl.querySelector('.js-content');
    this.els = this.rootEl.querySelectorAll('.js-item');
    this.elsQ = this.els.length;
    this.divPositions = null;
    this.prevPos = 0;
    this.pos = 0;
    this.itemWidth = function(){
        return this.els[0].offsetWidth;
    };
    this.itemsOnView = 3;
    this.itemsFit = function(){
        return Math.round(this.contentEl.parentNode.offsetWidth / this.calcItemWidth())
    };

    this.config = {
        capacity: this.rootEl.dataset.capacity || 1,
        crsThresholdMax: this.rootEl.dataset.responsiveBp || 9999,
        crsPositionsClass: this.rootEl.dataset.positionsClass || '',
        crsPosElClass: this.rootEl.dataset.positionClass || '',
        crsPosElClassActive: this.rootEl.dataset.positionActiveClass || '',
        itemMinWidth: +this.rootEl.dataset.itemMinWidth || 1
    };




    this.moveToPos = function(p){
        this.prevPos = this.pos;
        switch (true){
            case (p <= -1): this.pos = this.elsQ - 1; break;
            case (p >= this.elsQ): this.pos = 0; break;
            default: this.pos = p;
        }
        var param = -(this.pos * this.itemWidth());
        this.contentEl.style.marginLeft = param + 'px';
        this.updateDivPositions();
        this.shiftPositions();
    };

    this.adaptItemWidth = function(w){
        w = w ? w + 'px' : '';
        for (var j = 0; j < this.els.length; j++){
            this.els[j].style.width = w;
        }
        console.log('adapted item width', this.config.crsThresholdMax, this.rootEl.dataset);
    };

    this.buildPositions = function(){
        if (this.elsQ <= 5) {
            console.info('less 5');
            var divPositions = buildEl('div', this.config.crsPositionsClass + ' js-positions');
            this.contentEl.parentNode.appendChild(divPositions);
            this.divPositions = divPositions;
        } else {
            console.log('more 5');
            var divPositions = buildEl('div', that.config.crsPositionsClass + ' crs__positions--minified');
            var divPositionsWrap = buildEl('div', 'crs__positions-wrap');
            var divPositionsContent = buildEl('div', 'crs__positions-content js-positions');


            divPositionsWrap.appendChild(divPositionsContent);
            divPositions.appendChild(divPositionsWrap);



            this.contentEl.parentNode.appendChild(divPositions);
            this.divPositions = divPositionsContent;


        }
    };

    this.placePositions = function(){
        var accuracy = this.itemsFit() - 1;

        if (this.itemsFit() != this.elsQ) {
            for (var k = 0; k < this.els.length - accuracy; k++){
                var el = buildEl('div', this.config.crsPosElClass + ' js-pos-' + k);
                (function(k){
                    el.onclick = function(){
                        that.moveToPos(k);
                    };
                })(k);
                this.divPositions.appendChild(el);
            }
        }


    };

    this.clearPositions = function(){
        this.rootEl.querySelector('.js-positions').innerHTML = '';
    };

    this.updateDivPositions = function(){
        var els = this.divPositions.querySelectorAll('.' + this.config.crsPosElClass);
        for (var m = 0; m < els.length; m++){
            if (m == this.pos){
                els[m].classList.add(this.config.crsPosElClassActive);
            } else {
                els[m].classList.remove(this.config.crsPosElClassActive);
            }
        }
        this.outscopePositions();
    };

    this.manageResolution = function(){
        var w = window.innerWidth;
        if (w <= that.config.crsThresholdMax) {
            this.adaptItemWidth(this.calcItemWidth());
            this.moveToPos(0);
            console.log('there');
        } else {
            this.adaptItemWidth();
            console.log('here');
        }
        this.clearPositions();
        this.placePositions();
        this.updateDivPositions();
        this.adaptPositions();
    };

    this.calcItemWidth = function(){
        var maxAvaliableElementWidth = this.contentEl.parentNode.offsetWidth / this.config.capacity;
        var vlezutLi = maxAvaliableElementWidth >= this.config.itemMinWidth;
        if (vlezutLi){
            return maxAvaliableElementWidth;
        } else {
            var dest, cap = that.config.capacity;
            while (cap) {
                dest = this.contentEl.parentNode.offsetWidth / cap;
                if (dest < this.config.itemMinWidth)
                    cap--;
                else {
                    cap = 0;
                }

            }
            return dest;
        }
    };

    this.getPosElWidth = function(){
        var el = this.rootEl.querySelector('.crs__position');
        if (el) {
            var computed = getComputedStyle(el);
            var w = parseInt(el.offsetWidth);
            var ml = +computed.marginLeft.slice(0, -2);
            var mr = +computed.marginRight.slice(0, -2);

            var result = w + ml + mr;
            return result;
        }


    };

    this.udpatePositionsWrapWidth = function(){
        var el = that.rootEl.querySelector('.crs__positions-wrap');
        el && (el.style.width = 5 * this.getPosElWidth() + 'px');
    };

    // nado li on ?
    this.getMoveDir = function(){
        return (this.pos > this.prevPos) ? 1 : (this.pos < this.prevPos) ? -1 : 0;
    };

    // nado li on ?
    this.getMoveOperator = function() {
        return this.getMoveDir() > 0 ? '-' : '';
    };

    this.shiftPositions = function(){
        // only if needed
        var margin = parseInt(getComputedStyle(this.divPositions).marginLeft);
        var maxLen = this.getPosElWidth() * this.elsQ;

        var inLeftLimit = this.pos >= 2;
        var inRightLimit = this.pos <= this.elsQ - 3;

        if (inLeftLimit && inRightLimit) {
            console.log('в пределах!', this.getMoveDir());

            this.rootEl.querySelector('.crs__positions-content').style.marginLeft = -( (this.pos - 2) * this.getPosElWidth()) + 'px';
        }
    };

    this.adaptPositions = function(){
        var el = this.rootEl.querySelector('.crs__positions-content');
        el && (el.style.marginLeft = '');
    };

    this.getPosNodelist = function(){
        return this.rootEl.querySelectorAll('.crs__position');
    };

    this.outscopePositions = function(){

            var posList = this.getPosNodelist();
              for (var i = 0; i < posList.length; i++){
                var scoping = (i < this.pos - 2 || i > this.pos + 2);
                if (scoping){
                    var leftLimit = (this.pos < 2 && i > 4 || this.pos >= 2);
                    var rightLimit = (this.pos < this.elsQ - 2);
                    if (leftLimit && rightLimit) {
                        //console.warn(2, posList[i], i);
                        posList[i].classList.add('crs__position--outscoped');
                    }
                } else {
                    posList[i] && posList[i].classList.remove('crs__position--outscoped');
                }
            }

    };


    this.init = function(){
        /*
         swipedetect(this.rootEl, function(d){
         switch(d) {
         case 'left': that.moveToPos(that.pos + 1); console.log('left', that.pos); break;
         case 'right': that.moveToPos(that.pos - 1); console.log('right', that.pos); break;
         }
         });*/
        if (this.config.crsThresholdMax >= window.innerWidth) {
            setTimeout(function(){
                that.buildPositions();
                that.placePositions();
                //that.updateDivPositions();
                that.udpatePositionsWrapWidth();
                that.manageResolution();
            }, 200);
        }

        this.listen();

    };

    this.listen = function(){
        window.addEventListener('resize', function(e){
            that.manageResolution();
        });
    };

    this.init();
}