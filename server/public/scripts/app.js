$(document).ready(function(){
    $.ajax({
        url:"/data",
        success: function(){
            console.log("ajax worked");
        }
    })
});
