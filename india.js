$( document ).ready(function() {
    $('.questionForms').css('display','none');
	$('.end').css('display','none');
	$('.intro').css('display','block');
	$('#tohome').css('display','none');
	$('#endgame').css('display','none');
	$('.contentbody').css('height',$('#coverbox').height()-2*$('#coverbox').css('padding')-$('.headline').height()-$('.datarow').height());
	// $('#IndiaMap').css('left',$('#IndiaMap').width()/2);
	// console.log($('#IndiaMap').width());
	$('.introbuttons').css('left',$('.contentbody').width()/2-$('.introbuttons').width()/2);
	$('.introbuttons').css('top',$('.contentbody').height()/2-$('.introbuttons').height()/2);
});

$( window ).resize(function() {
	$('.contentbody').css('height',$('#coverbox').height()-2*$('#coverbox').css('padding')-$('.headline').height()-$('.datarow').height());
	$('.introbuttons').css('left',$('.contentbody').width()/2-$('.introbuttons').width()/2);
	$('.introbuttons').css('top',$('.contentbody').height()/2-$('.introbuttons').height()/2);
});

var timer = 0;
var gamepaused=0;
var hours =0;
var mins =0;
var seconds =0;
var wrongattempts=0;

var myQuiz = {
  currentQuestion:0,
  correctTally: 0,
  questionList: [
  {
    question: "Locate Jharkhand :",
	correct: "IN-JH"
  },
  {
    question: "Locate Maharastra :",
	correct: "IN-MH"
  },
  {
    question: "Locate Gujarat :",
	correct: "IN-GJ"
  },
  {
    question: "Locate Nagaland :",
	correct: "IN-NL"
  },
  {
    question: "Locate Punjab :",
	correct: "IN-PB"
  },
  {
    question: "Locate J&K :",
	correct: "IN-JK"
  },
  {
    question: "Locate West Bengal :",
	correct: "IN-WB"
  },
  {
    question: "Locate Uttrakhand :",
	correct: "IN-UT"
  },
  {
    question: "Locate Uttar Pradesh :",
	correct: "IN-UP"
  },
  {
    question: "Locate Tripura :",
	correct: "IN-TR"
  },
  {
    question: "Locate Tamil Nadu :",
	correct: "IN-TN"
  },
  {
    question: "Locate Telangana :",
	correct: "IN-TG"
  },
  {
    question: "Locate Sikkim :",
	correct: "IN-SK"
  },
  {
    question: "Locate Rajasthan :",
	correct: "IN-RJ"
  },
  {
    question: "Locate Puducherry :",
	correct: "IN-PY"
  },
  {
    question: "Locate Mizoram :",
	correct: "IN-MZ"
  },
  ]
};

// $("path").hover(function(e) {
  // $('#info-box').css('display','block');
  // $('#info-box').html('<div>'+$(this).attr('title')+'</div>');
// });

// $("path").mouseleave(function(e) {
  // $('#info-box').css('display','none');
// });

// $(document).mousemove(function(e) {
  // $('#info-box').css('top',e.pageY-$('#info-box').height()-30-$('#mainbox').offset().top);
  // $('#info-box').css('left',e.pageX-($('#info-box').width())/2-$('#mainbox').offset().left);
// }).mouseover();

$('body').append($('<span class="ripple"></span>'));

$(".ripple").on('animationend webkitAnimationEnd oAnimationEnd oanimationend MSAnimationEnd', 
function() {
 $('.ripple').removeClass('active');
});  

$("path").click(function(e) {
	// var that = $(this);
	// (that.attr('data-active') === 'true') ? that.attr('data-active', 'false') : that.attr('data-active', 'true');
	var choice = $(this).attr('id');
	$('#info-box').css('display','block');
	$('#info-box').css('top',e.pageY-$('#info-box').height()-15-$('#mainbox').offset().top);
    $('#info-box').css('left',e.pageX-($('#info-box').width())/2-$('#mainbox').offset().left);
	if (choice === myQuiz.questionList[myQuiz.currentQuestion].correct){ // condition to check if the answer is the same as the user choice
		$('#info-box').css('background-color','#99ffbb');
		$('#info-box').html('<div><b>CORRECT !</b></br>'+$(this).attr('title')+'</div>');
		var xPos = e.clientX, yPos = e.clientY;
		$('.ripple').css({
			top: yPos-$('.ripple').height()/2,
			left: xPos-$('.ripple').height()/2
		}).addClass('active')
		
		if (wrongattempts>=3){
			$("#"+myQuiz.questionList[myQuiz.currentQuestion].correct).removeClass("flashing");
		}
		myQuiz.currentQuestion++;
		myQuiz.correctTally++;
		wrongattempts=0;
		if (myQuiz.currentQuestion < myQuiz.questionList.length){
			let nextq = myQuiz.questionList[myQuiz.currentQuestion];
			$('#scorenum').text(myQuiz.correctTally);
			setTimeout(function(){
					$('#info-box').css('display','none');
					$('#titlecontent').text(nextq.question);
			}, 500);

		}
		else{
			$('#scorenum').text(myQuiz.correctTally);
			setTimeout(function(){
					$('#info-box').css('display','none');
					$('.questionForms').css('display','none');
					clearTimeout(timex);
					$('#score').text('You scored '+ myQuiz.correctTally);
					$('.end').css('display','block');
					$('.intro').css('display','none');
					$('#tohome').css('display','none');
					$('#titlecontent').html('Thanks for Playing!');
			}, 500);
		}
	}
	else{
		$('#info-box').css('background-color','#ff8566');
		$('#info-box').html('<div><b>WRONG !</b></br>'+$(this).attr('title')+'</div>');
		myQuiz.correctTally = myQuiz.correctTally-0.25;
		wrongattempts = wrongattempts+1;
		$('#scorenum').text(myQuiz.correctTally);
		setTimeout(function(){
				$('#info-box').css('display','none');
				if (wrongattempts>=3){
					$("#"+myQuiz.questionList[myQuiz.currentQuestion].correct).addClass("flashing");
				}
		}, 500);
	}
	
});

$('#begingame').click(function(e){                   //when 'lets begingame button is clicked
  // $('.intro').css('display','none');                // add the hidden class to intro page, which will hide it
  $('.intro').fadeOut(500, function() {
		$('.questionForms').css('display','block');
		$('#tohome').css('display','block');
		if (gamepaused==0){
			let firstPage = myQuiz.questionList[0];       //targets the first questionList object and assigns to variable 
			$('#titlecontent').text(firstPage.question);	
		}
		else{
			gamepaused=0;
			let nextq = myQuiz.questionList[myQuiz.currentQuestion];
			$('#titlecontent').text(nextq.question);
		}
		startTimer();
	});
});

$('#tohome').click(function(e){                   //when 'lets main menu button is clicked
	$('.questionForms').css('display','none');
	$('.end').css('display','none');
	$('.intro').css('display','block');
	clearTimeout(timex);
	$('#endgame').css('display','block');
	gamepaused=1;
	$('#titlecontent').html('Game Paused!');
	$('#begingame').html('Resume Game');
	
});
$('#endgame').click(function(e){                   //when 'lets begingame button is clicked
	$('.questionForms').css('display','none');
	$('#score').text('You scored '+ myQuiz.correctTally);
	$('.end').css('display','block');
	$('.intro').css('display','none');
	$('#tohome').css('display','none');
	$('#titlecontent').html('Thanks for Playing!');
});

$('.end').on('click', '#restart', function (e) {
	$('.questionForms').css('display','none');
	$('.end').css('display','none');
	$('.intro').css('display','block');
	$("#"+myQuiz.questionList[myQuiz.currentQuestion].correct).removeClass("flashing");
	myQuiz.currentQuestion=0;
	myQuiz.correctTally=0;
	timer = 0;
	gamepaused=0;
	wrongattempts=0;
	$('#scorenum').text(myQuiz.correctTally);
	$('#timenum').text(timer);
	$('#titlecontent').html('Game : Indian States and UTs');
	$('#endgame').css('display','none');
	$('#begingame').html('Let\'s Begin!');
	$('path').attr('data-active','false');
	hours =0;      mins =0;      seconds =0;
	$('#hours','#mins').html('00:');
	$('#seconds').html('00');
});

function startTimer(){
  timex = setTimeout(function(){
      seconds++;
    if(seconds >59){seconds=0;mins++;
       if(mins>59) {
       mins=0;hours++;
         if(hours <10) {$("#hours").text('0'+hours+':')} else $("#hours").text(hours+':');
                       }
                       
    if(mins<10){                     
      $("#mins").text('0'+mins+':');}       
       else $("#mins").text(mins+':');
                   }    
    if(seconds <10) {
      $("#seconds").text('0'+seconds);} else {
      $("#seconds").text(seconds);
      }
     
    
      startTimer();
  },1000);
}