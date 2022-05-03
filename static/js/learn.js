
function popUp() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

$(document).ready(function(){
    let img_path = "../static/images/road_sign_img/" + num.toString() + ".png"
    $("#sign_img").attr("src", img_path)

    let prev_num = num - 1
    next_num = num + 1
    if (prev_num == 20) {
        prev_num = 18
    }

    if (next_num == 19){
        next_num = 21
    }

    prev_link = "../learn/" + prev_num.toString()
    next_link = "../learn/" + next_num.toString() 

    if (num == 1) {
        prev_link = "../intro"
    }
    else if (num == 45) {
        next_link = "../quiz/1"       
    }

    // if (marked) {
    //     $("#mark").html("Marked")
    //     // $(".mark").get(0).style.setProperty("--border-color", "antiquewhite")
    // }
    
    $("#prev").on("click", function() {
        window.location.href = prev_link
    });

    $("#next").on("click", function() {
        $.ajax({
            type: "POST",
            url: "../complete_learn",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(num),
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
        
        setTimeout("window.location.href= '"+next_link+"'",300);
        console.log("delay for fixing safari bug")
         
    });

    $("#mark").on("click", function() {
        $.ajax({
            type: "POST",
            url: "../mark_learn",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(num),
            success: function (response) {
                // var mark = response["mark"]
                // if (mark){
                //     $("#mark").html("Marked")
                // }
                // else {
                //     $("#mark").html("Not Marked")
                // }
                refresh()
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
    });

});