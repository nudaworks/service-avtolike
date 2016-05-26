(function(){
    ymaps.ready(avtolikeMapInit);

    function avtolikeMapInit(){
        var map, mark;

        map = new ymaps.Map("avtolike-map", {
            center: [
                55.76,
                37.64
            ],
            zoom: 12,
            controls: []
        });

        mark = new ymaps.Placemark(
            [
                55.75,
                37.64
            ],{
                style: "default#redSmallPoint",
                ballonContent: 'Hell yaeh'
            }
        );

        map.geoObjects.add(mark);
    }



})();

function handleMap(){
    var w = window.innerWidth;
    var smap = document.body.querySelector('.s-map .summon');
    if (w <= 800 && !document.body.querySelector('.s-map').classList.contains('s-map--summoned')) {
        smap.classList.add('summon--active');
    } else {
        smap.classList.remove('summon--active');
    }
}


window.addEventListener('resize', function(e){
    handleMap();
});

handleMap();



var smap = document.body.querySelector('.s-map');
smap.addEventListener('click', function(e){
    var w = window.innerWidth;
    if (w <= 800 && smap.classList.contains('s-map--summoned') &&
        !e.target.classList.contains('summon')) {
        smap.classList.remove('s-map--summoned');
        summon.classList.add('summon--active');
    }
});


var summon = smap.querySelector('.summon');
summon.addEventListener('click', function(){
    console.log(1, smap);
    smap.classList.add('s-map--summoned');
    summon.classList.remove('summon--active');
});