
function Galle(node) {
    var that = this;
    // galle data
    this.rootEl = node;
    this.els = this.rootEl.querySelectorAll('a');
    this.elsQ = this.els.length;
    // blinds data
    this.pos;
    this.intvId;
    // methods
    this.buildWin = function(target){
        // blinds
        var divBlinds = document.createElement('div');
        divBlinds.classList.add('blinds');
        // blinds -> controls
        var divControls = document.createElement('div');
        divControls.classList.add('controls');
        // controls -> positions
        var divPositions = document.createElement('div');
        divPositions.classList.add('positions');
        // controls -> title
        var divTitle = document.createElement('div');
        divTitle.classList.add('title');
        // controls -> close
        var divClose = document.createElement('div');
        divClose.classList.add('close');
        divClose.innerHTML = '&nbsp';
        // blinds -> wrap
        var divWrap = document.createElement('div');
        divWrap.classList.add('wrap');
        // wrap -> display
        var divDisplay = document.createElement('div');
        divDisplay.classList.add('display');
        // display -> moveLeft
        var divMoveLeft = document.createElement('div');
        divMoveLeft.classList.add('move');
        divMoveLeft.classList.add('left');
        // display -> moveRight
        var divMoveRight = document.createElement('div');
        divMoveRight.classList.add('move');
        divMoveRight.classList.add('right');
        // display -> imgBox
        var divImgBox = document.createElement('div');
        divImgBox.classList.add('img-box');
        // imgBox -> img
        var img = document.createElement('img');

        // APPEND
        divControls.appendChild(divPositions);
        divControls.appendChild(divTitle);
        divControls.appendChild(divClose);

        divImgBox.appendChild(img);
        divDisplay.appendChild(divImgBox);
        divDisplay.appendChild(divMoveLeft);
        divDisplay.appendChild(divMoveRight);
        divWrap.appendChild(divDisplay);

        divBlinds.appendChild(divControls);
        divBlinds.appendChild(divWrap);

        document.body.insertBefore(divBlinds, document.body.firstChild);




    };
    this.destroyWin = function(){
        document.body.removeChild(document.body.querySelector('.blinds'));
    };
    this.listen = function(){
        this.els = Array.prototype.slice.call(this.els);
        this.els.map(function(item){
            return item.addEventListener('click', function(e){
                e.preventDefault();
                console.log('hey', e);
                console.log('img pos: ', that.getPosition(e.target));

                that.buildWin(e.target);
                that.listenBlinds();
                that.pos = that.getPosition(e.target);
                that.redraw(that.getPosition(e.target));
            });
        });
    };
    this.listenBlinds = function(){
        var blindsRoot = document.body.querySelector('.blinds');
        blindsRoot.addEventListener('click', function(e){
            if (e.target.classList.contains('close')) {
                that.destroyWin();
                clearInterval(that.intvId);
            } else console.log('missed!');
        });

        blindsRoot.querySelector('.positions').addEventListener('click', function(){
            that.updatePositions();
        });

        blindsRoot.querySelector('.move.left').addEventListener('click', function(e){
            if (that.pos === 0) {
                that.pos = that.elsQ - 1;
            } else {
                that.pos -= 1;
            }
            that.redraw();
        });

        blindsRoot.querySelector('.move.right').addEventListener('click', function(e){
            if (that.pos >= that.elsQ - 1) {
                that.pos = 0;
            } else {
                that.pos += 1;
            }
            that.redraw();
        });

    };
    this.getPosition = function(target){
        var cond1, cond2;
        for (var i = 0; i < this.elsQ; i++){
            cond1 = this.els[i].querySelector('img[data-shortcut]') === target;
            cond2 = this.els[i] === target;
            if (cond1 || cond2) {
                return i;
            }
        }
    };
    this.getTitle = function(){
        console.warn(this.els, this.pos);
        return this.els[this.pos].getAttribute('title');
    };
    this.getOriginPath = function(target){

    };
    this.updatePositions = function(){
        var divPositions = document.body.querySelector('.positions');
        divPositions.innerHTML = (this.pos + 1) + '/' + this.elsQ;
    };
    this.updateTitle = function(){
        var divPositions = document.body.querySelector('.title');
        divPositions.innerHTML = this.getTitle();
    };
    this.updateImage = function(){
        var divImgBox = document.body.querySelector('.img-box img');
        divImgBox.setAttribute('src', this.els[this.pos].getAttribute('href'));
    };
    this.adaptImg = function(){
        var winH = window.innerHeight;
        var margin = 50;
        var el = document.body.querySelector('.blinds .img-box img');
        var param = winH - margin;
        document.body.querySelector('.blinds .img-box img').style.maxHeight = param + 'px';
        console.log(el);

    };
    this.adaptDivDisplay = function(){
        this.intvId = setInterval((function(){
            var winH = window.innerHeight;
            var margin = 50;
            var img = document.body.querySelector('.blinds .display img').offsetHeight;
            var el = document.body.querySelector('.blinds .display');
            el.style.marginTop = ((winH - margin) / 2) - (img / 2) + 'px';
        }), 300)

    };
    this.redraw = function(target){

        this.updatePositions();
        this.updateTitle();
        this.updateImage();
        this.adaptImg();
        this.adaptDivDisplay();
    };


    this.listen();
}






// GALLE INIT
var galle = document.body.querySelectorAll('.galle');
console.log(galle.length, 11);
for (var i = 0; i < galle.length; i++) {
    new Galle(galle[i]);
}