function displayResult(quiz_questions, user_answers){
  $("#result").empty()
  score = 100
  var result = $("<h2 class='text-light'>")
  $.each(quiz_questions, function(index, value){
    answer = value["answer"]
    user_answer = user_answers[index]
    if(answer != user_answer){
      score = score - 10
    }
  });
  $(result).append("Score: " + score + "/100.")
  if(score < 80){
    $(result).append(" You did not pass this quiz!")
  }
  else{
    $(result).append(" Good job!")
  }
  $("#result").append(result)
}

function displayQuestions(quiz_questions, user_answers){
  $("#detail").empty()
  $.each(quiz_questions, function(index, value){
    var question = $("<div class='mx-2 questioin-padding'>")
    var stem = $("<p class='text-light my-3 question-stem'>")
    var correct_icon = $("<svg xmlns='http://www.w3.org/2000/svg' width='35' height='35' fill='green' class='bi bi-check' viewBox='0 0 16 16'><path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z' /></svg>")
    var wrong_icon = $("<svg xmlns='http://www.w3.org/2000/svg' width='35' height='35' fill='red' class='bi bi-x' viewBox='0 0 16 16'><path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' /></svg>")
    var details = $("<div class='row'>")
    var left = $("<div class='col-8'>")
    var option1 = $("<p class='text-light lead margin-left'>")
    var option2 = $("<p class='text-light lead margin-left'>")
    var option3 = $("<p class='text-light lead margin-left'>")
    var option4 = $("<p class='text-light lead margin-left'>")
    var selection = $("<p class='text-light result-text lead margin-left'>")

    var right = $("<div class='col-3'>")
    var image = $("<img src='" + 'static/images/road_sign_img/' + value["id"] + '.png' + "' class='question-image'>")

    selected = user_answers[index]
    answer = value["answer"]

    if(selected == answer){
      $(stem).append(correct_icon)
    }
    else{
      $(stem).append(wrong_icon)
    }

    $(stem).append((index+1).toString() + ". ")
    $(stem).append(value["stem"])

    if(value["A"] != ''){
      $(option1).append("A. " + value["A"])
      if(answer == "A"){
        $(option1).removeClass("text-light")
        $(option1).addClass("result-correct")
      }
      if(selected != answer && selected == "A"){
        $(option1).removeClass("text-light")
        $(option1).addClass("result-wrong")
      }
      $(left).append(option1)
    }
    if(value["B"] != ''){
      $(option2).append("B. " + value["B"])
      if(answer == "B"){
        $(option2).removeClass("text-light")
        $(option2).addClass("result-correct")
      }
      if(selected != answer && selected == "B"){
        $(option2).removeClass("text-light")
        $(option2).addClass("result-wrong")
      }
      $(left).append(option2)
    }
    if(value["C"] != ''){
      $(option3).append("C. " + value["C"])
      if(answer == "C"){
        $(option3).removeClass("text-light")
        $(option3).addClass("result-correct")
      }
      if(selected != answer && selected == "C"){
        $(option3).removeClass("text-light")
        $(option3).addClass("result-wrong")
      }
      $(left).append(option3)
    }
    if(value["D"] != ''){
      $(option4).append("D. " + value["D"])
      if(answer == "D"){
        $(option4).removeClass("text-light")
        $(option4).addClass("result-correct")
      }
      if(selected != answer && selected == "D"){
        $(option4).removeClass("text-light")
        $(option4).addClass("result-wrong")
      }
      $(left).append(option4)
    }

    $(right).append(image)

    $(details).append(left)
    $(details).append(right)

    if(selected == "X"){
      $(selection).append("You did not answer this question")
      $(left).append(selection)
    }

    if(value["D"] == '' && value["C"] == ''){
      $(option1).addClass('two-options')
      $(option2).addClass('two-options')
    }
    else if(value["D"] == ''){
      $(option1).addClass('three-options')
      $(option2).addClass('three-options')
      $(option3).addClass('three-options')
    }

    $(question).append(stem)
    $(question).append(details)
    $("#detail").append(question)
  });
}

$(document).ready(function(){
  displayResult(quiz_questions, user_answers);
  displayQuestions(quiz_questions, user_answers);
});
