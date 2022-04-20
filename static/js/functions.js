
function refresh() {
    window.location.reload()
}

function homePage() {
    redirect('/')
}

function selectMode() {
    redirect('/mode')
}

function quizPage() {
    redirect('/quiz')
}

function learnPage() {
	redirect('/selectChapter')
}

function redirect(url) {
    window.location.href = url
}

function changeTitle(){
	if(title == "")
		return;
	$(document).attr("title", title + " | " + $(document).attr("title"));
}


function goToQuestion(num){
	if(num > 10)
		return
	redirect("/quiz/" + num);
}