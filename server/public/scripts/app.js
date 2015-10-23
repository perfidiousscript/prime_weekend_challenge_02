$(document).ready(function(){
    $.ajax({
        url:"/data",
        success: function(data){
            console.log(data);
        }
    })
});
