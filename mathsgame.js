
/*if start/reset button is clicked*/
// if playing it will be page reload
// if not playing:
// show countdownbox
// time reduces with loop
//  if there is time left we continue reducing time by a sec 
// if no time then its game over
// change button to reset once game begins
// generate new questions and answers

// if answer box is clicked
// if playing
// check is answer is correct and if correct increase 
// score by one and show the correct box and generate new question
// and if wrong the try again box pops up 


var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
var wrongAnswer;

document.getElementById("startreset").onclick = function(){
   if(playing == true){
       location.reload();
   }    
   else{
       playing = true;

      score = 0;

      document.getElementById("scorevalue").innerHTML = score; 

      document.getElementById("timeremaining").style.display = "block";

        timeremaining = 60;
      document.getElementById("timevalue").innerHTML = timeremaining;

      hide("gameover");
    //   document.getElementById("gamover").style.display = "none";

      document.getElementById("startreset").innerHTML = "Reset game";
    //this when in playing mood when game starts, button changes to reset 

    startCountdown();

    // generating questions
      generateQA();
   }
}

// sart countdown

function startCountdown(){
 action = setInterval(function(){
  timeremaining -= 1;
 document.getElementById("timevalue").innerHTML = timeremaining;
 if(timeremaining == 0){
     clearInterval(action);
       stopCountdown(); 
       document.getElementById("gameover").style.display = "block";
    //    show("gameover");

       document.getElementById("gameover").innerHTML 
       = "<p>game over</p><p>your score is "+ score +".</p>";
    
    //    document.getElementById("timeremaining").style.display = "none";
       hide("timeremaining");

    //    document.getElementById("correct").style.display = "none";
       hide("correct");
       //    document.getElementById("wrong").style.display = "none";
       hide("wrong");
       playing= false;
       document.getElementById("startreset").innerHTML ="Start Game";
       document.getElementById("startreset").style.color = red;

          
 }
 }, 1000);
}


// stop countdown
function stopCountdown(){
    clearInterval(action);
}


// hide elements

function hide(Id){
    document.getElementById(Id).style.display = "none";
}

// show elements

function show(Id){
    document.getElementById(Id).style.display = "block";
}

// generate question and answer
function generateQA(){
  var x = 1+ Math.round(9*Math.random());
  var y = 1+ Math.round(9*Math.random());
  correctAnswer = x*y;
  document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+
    Math.round(3*Math.random());

      document.getElementById("box" + correctPosition)
      .innerHTML = correctAnswer;
    //   tis is to fill one box with correct answer


    // fill the boxes with wrong answers

    var answers = [correctAnswer];

    for(i=1; i<5; i++){
        if(i != correctPosition){
          var wrongAnswer ;

           do{
            wrongAnswer = (1+ Math.round(9*Math.random()))
            *(1+ Math.round(9*Math.random())); /*wrong answer*/
   }while(answers.indexOf(wrongAnswer)>-1)
         
             document.getElementById("box"+i).innerHTML = wrongAnswer;

                answers.push(wrongAnswer);
        }
    }

}

// clicking on answer box while playing

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing == true){
          if(this.innerHTML == correctAnswer){
            //   correct answer
    
            score++; /*increase score*/
            document.getElementById("scorevalue").innerHTML = score;
    
            // show correct box and hide wrong box if answer is correct
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            },1000);
    
    
            // generate new question and answer if answer is correct.
                generateQA();
        
    
    
          }else{
            //   wrong answer
            show("wrong");
            hide("correct");
            setTimeout(function(){
               hide("wrong");
            },1000);
          }
        }
    }
}

