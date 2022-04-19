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
  if(score < 60){
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
    console.log(index, value)

    var question = $("<div class='questioin-padding'>")
    var stem = $("<div class='text-light result-stem'>")
    var options = $("<div>")
    var option1 = $("<div class='text-light'>")
    var option2 = $("<div class='text-light'>")
    var option3 = $("<div class='text-light'>")
    var option4 = $("<div class='text-light'>")
    var selection = $("<div class='text-light result-wrong'>")

    $(stem).append((index+1).toString() + ". ")
    $(stem).append(value["stem"])

    $(option1).append("A. " + value["A"])
    $(option2).append("B. " + value["B"])
    $(option3).append("C. " + value["C"])
    $(option4).append("D. " + value["D"])

    $(options).append(option1)
    $(options).append(option2)
    $(options).append(option3)
    $(options).append(option4)

    selected = user_answers[index]
    answer = value["answer"]
    if(selected == "X"){
      $(selection).append("You did not answer this question. Answer is " + answer)
    }
    else{
      $(selection).append("You selected " + selected + ". Answer is " + answer)
      if(selected == answer){
        $(selection).removeClass("result-wrong")
        $(selection).addClass("result-correct")
      }
    }

    $(question).append(stem)
    $(question).append(options)
    $(question).append(selection)
    $("#detail").append(question)
  });
}

$(document).ready(function(){
  displayResult(quiz_questions, user_answers);
  displayQuestions(quiz_questions, user_answers);
});
