
function timer(){
    let time_left = Math.round(end_time - Date.now() / 1000);
    let minute = parseInt(time_left / 60)
    let second = time_left % 60
    let new_time = String(minute).padStart(2, '0') + ':' + String(second).padStart(2, '0')
    $("#timer").text(new_time)

    if(minute < 1 && second < 1){
    	setTimeout(submit, 10, false)
    	return
    }

    let current_time = Date.now() / 1000
    let A = parseInt((end_time - parseInt(end_time)) * 1000)
    let B = parseInt((current_time - parseInt(current_time)) * 1000)
    
   	if(A > B){
		setTimeout(timer, A - B, 0);
   	}else if (A == B){
		setTimeout(timer, 1000, 0);
   	}else{
		setTimeout(timer, A + 1000 - B, 0);
   	}

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

function hint(){
    if($("#hint").text() == '')
    	$("#hint").text(question.hint)
    else
    	$("#hint").text("")
}

function submit(confirm = true){
    if(user_answers.includes('X')){
    	if(!confirm){
    		alert("Time up. Your quiz will be sumitted.")
            redirect('/quizresult');
    	}else if(window.confirm("You have not finished all the questions. Really?")) {
            redirect('/quizresult');
        }
    }else{
        redirect('/quizresult');
    }
}

$(document).ready(function(){
	changeTitle()
	timer()
});
