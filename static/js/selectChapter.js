$(document).ready(function(){
    let intro_progress = intro.toString()+"%"
    $("#intro_progress").css("width", intro_progress)
    $("#intro_progress").html(intro_progress)

    let regular_progress = regular.toString()+"%"
    $("#regular_progress").css("width", regular_progress)
    $("#regular_progress").html(regular_progress)

    let warn_progress = warn.toString()+"%"
    $("#warn_progress").css("width", warn_progress)
    $("#warn_progress").html(warn_progress)
});