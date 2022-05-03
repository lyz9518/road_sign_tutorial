$(document).ready(function(){
    $("#next").on("click", function() {
        let complete = 1
        $.ajax({
            type: "POST",
            url: "./complete_intro",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(complete),
            success: function (response) {
                // refresh()
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
        let next_link = "./learn/1"
        setTimeout("window.location.href= '"+next_link+"'",500);
        console.log("delay for fixing safari bug")
    });

});