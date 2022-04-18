
function changeTitle(){
	if(title == "")
		return;
	$(document).attr("title", title + " | " + $(document).attr("title"));
}

$(document).ready(function(){
	changeTitle()
	timer(1)
});
