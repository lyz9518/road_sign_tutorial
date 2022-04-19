
function timer(){
    let currentTime = new Date();
    let left = $("#timer").text().split(':')
    let seconds = parseInt(left[0] * 60) + parseInt(left[1])
    
    seconds --
    let new_time = String(parseInt(seconds / 60)).padStart(2, '0') + ':' + String((seconds % 60)).padStart(2, '0')
    $("#timer").text(new_time)

	setTimeout(timer, 1000, 0);
}

function clearOptions(){
    $("#A").prop("checked", false);
    $("#B").prop("checked", false);
    $("#C").prop("checked", false);
    $("#D").prop("checked", false);
}

function selectSingle(radio){
	clearOptions()
    let selected = radio.value;
    $("#" + selected).prop("checked", true);

	let request_data = {
		'num': num,
		'answer': selected
	}

	$.ajax({
		type: "POST",
		url: "/answer",
		dataType : "json",
		contentType: "application/json; charset=utf-8",
		data : JSON.stringify(request_data),
		success: function(result){
			console.log('success', result)
			if(result.status == 200){
				goToQuestion(num + 1)
			}
		},
		error: function(request, status, error){
			console.log("Error");
			console.log(request)
			console.log(status)
			console.log(error)
		}
	});

    goToQuestion(num + 1);
}

function mark(){
	let operation = marked_questions.includes(num) ? 'unmark' : 'mark'
	let request_data = {
		'operation': operation,
		'num': num
	}

	$.ajax({
		type: "POST",
		url: "/mark",
		dataType : "json",
		contentType: "application/json; charset=utf-8",
		data : JSON.stringify(request_data),
		success: function(result){
			console.log('success', result)
			if(result.status == 200){
				goToQuestion(num)
			}
		},
		error: function(request, status, error){
			console.log("Error");
			console.log(request)
			console.log(status)
			console.log(error)
		}
	});
}

function submit(){
    if(user_answers.includes('X')){
        if (window.confirm("You have not finished all the questions. Really?")) {
            redirect('/quizresult');
        }
    }else{
        redirect('/quizresult');
    }
}

$(document).ready(function(){
	changeTitle()
	setTimeout(timer, 1000, 0);
});
