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

    var question = $("<div class='mx-2 questioin-padding'>")
    var stem = $("<p class='text-light my-3 question-stem'>")

    var details = $("<div class='row'>")

    var left = $("<div class='col-9'>")
    var option1 = $("<p class='text-light lead'>")
    var option2 = $("<p class='text-light lead'>")
    var option3 = $("<p class='text-light lead'>")
    var option4 = $("<p class='text-light lead'>")
    var selection = $("<p class='text-light lead result-wrong'>")

    var right = $("<div class='col-3'>")
    var image = $("<img src='" + value["image"] + "' class='question-image'>")

    $(stem).append((index+1).toString() + ". ")
    $(stem).append(value["stem"])

    $(option1).append("A. " + value["A"])
    $(option2).append("B. " + value["B"])
    $(option3).append("C. " + value["C"])
    $(option4).append("D. " + value["D"])

    if(value["A"] != '')
      $(left).append(option1)
    if(value["B"] != '')
      $(left).append(option2)
    if(value["C"] != '')
      $(left).append(option3)
    if(value["D"] != '')
      $(left).append(option4)
    $(left).append(selection)

    $(right).append(image)

    $(details).append(left)
    $(details).append(right)


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
