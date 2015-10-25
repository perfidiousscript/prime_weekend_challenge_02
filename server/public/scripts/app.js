//This is a script this creates a text carousel. The script pulls down a JSON object containing and array
// of objects. Each object had three elements, a name, a github URL and s shout out text.
// The script populates three divs with the elements from one object.

//'peopleArray' will hold the data pulled from the server, 'indexTrack' holds the number that specifies
//which object's information will be presented.
var peopleArray = [], indexTracker = 0;

//Main jQuery script.
$(document).ready(function() {
    //ajax call pulls down the object from server.
    $.ajax({
        type : "GET",
        url  : "/data",
        success : function(data) {

            peopleArray = data.zeta;
            //console.log("This is result of ajax call: ", peopleArray);

            createCarousel(peopleArray);

            updateIndexPoints();
            //Advances the carousel when the next button is clicked.
            $("#next").on('click', nextSlide);

            $("#prev").on('click', prevSlide);
            //Advances the carousel after ten seconds of user inactivity.
        }
    });
});


//Creates a div called main and calls functions that populate the index points and nav buttons.
function createCarousel(array) {
    $("#lecture").append("<div class='main'></div>");
    var $el = $("#lecture").children().last();
    createIndexPoints(array, $el);
    createNavButtons($el);
    var nextInterval = setInterval(nextSlide, 10000);
}

//Function which updates the indexTracker and active point when advanced. Also updates information presented in the
// currentInterval div with the object specified by indexTracker.
function nextSlide() {
    indexTracker++;
    if (indexTracker >= peopleArray.length) {
        indexTracker = 0;
    }
    allFadeOut();
    window.setTimeout(updateIndexPoints,500);
    allFadeIn();
    intervalReset();
}

//Function which updates the indexTracker and active point when reversed. Also updates information presented in the
// currentInterval div with the object specified by indexTracker.
function prevSlide() {
    indexTracker--;
    if (indexTracker < 0) {
        indexTracker = peopleArray.length - 1;
    }
    allFadeOut();
    window.setTimeout(updateIndexPoints,500);
    allFadeIn();
    intervalReset();
}
//Prepends a div to the lecture div that reverses the carousel when clicked and appends a div to the lecture
// div that advances the carousel when clicked.
function createNavButtons($el) {
    $el.prepend("<div id='prev' class='nav-button'><span><</span></div>");
    $el.append("<div id='next' class='nav-button'><span>></span></div>");
}

//Function which populates a number of index points equivalent to the number of elements in the
//uploaded object.
function createIndexPoints(array, $el) {
    for (var i = 0; i < array.length; i++) {
        $el.append("<div class='index-point' id='index" + i + "'><div class='num'>"+ i +"</div></div>")

    }
}

//Changes the active index point to that index point specified bu the index tracker variable.
function updateIndexPoints() {
    for (var i = 0; i < peopleArray.length; i++) {
        $("#index" + i).removeClass("index-point-active");

        if (i == indexTracker) {
            $("#index" + i).addClass("index-point-active");
        }
        updateCurrentStudent(indexTracker);
    }
}


//This function updates the information in the 'currentStudent' div with that data stored in the object at the
// 'indexTracker' position of the zeta array.
function updateCurrentStudent(position){
    $('#studentName').text(peopleArray[position].name);
    $('#studentGithub').text(peopleArray[position].github);
    $('#studentShoutout').text(peopleArray[position].shoutout);
}

//Fades out all divs with class 'info'
function allFadeOut(){
    $('.info').fadeOut();

}

//Fades in all divs with class 'info'
function allFadeIn(){
    $('.info').fadeIn();
}


function intervalReset(){
    clearInterval(nextInterval);
    setTimeout(function() {
        nextInterval = setInterval(nextSlide, 10000);
    }, 10000);
}