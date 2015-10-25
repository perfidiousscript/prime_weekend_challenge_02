var peopleArray = [], indexTracker = 0;

$(document).ready(function() {
    $.ajax({
        type : "GET",
        url  : "/data",
        success : function(data) {

            peopleArray = data.zeta;
            //console.log("This is result of ajax call: ", peopleArray);

            createCarousel(peopleArray);

            updateIndexPoints();

            $("#next").on('click', nextSlide);

            $("#prev").on('click', prevSlide);
        }
    });
});



function createCarousel(array) {
    $("#lecture").append("<div class='main'></div>");
    var $el = $("#lecture").children().last();
    createIndexPoints(array, $el);
    createNavButtons($el);
}

function nextSlide() {
    indexTracker++;
    if (indexTracker >= peopleArray.length) {
        indexTracker = 0;
    }

    updateIndexPoints();
}

function prevSlide() {
    indexTracker--;
    if (indexTracker < 0) {
        indexTracker = peopleArray.length - 1;
    }

    updateIndexPoints();
}

function createNavButtons($el) {
    $("#lecture").children().prepend("<div id='prev' class='nav-button'><span><</span></div>");
    $el.append("<div id='next' class='nav-button'><span>></span></div>");
}

function createIndexPoints(array, $el) {
    for (var i = 0; i < array.length; i++) {
        $el.append("<div class='index-point' id='index" + i + "'><div class='num'>"+ i +"</div></div>")

    }
}

function updateIndexPoints() {
    for (var i = 0; i < peopleArray.length; i++) {
        $("#index" + i).removeClass("index-point-active");

        if (i == indexTracker) {
            $("#index" + i).addClass("index-point-active");
        }
    }
}
