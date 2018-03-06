$(document).ready(function() {
});

var correct = 0;
var incorrect = 0;

reset = function() {
    correct = 0;
    incorrect = 0;
    $('.correct').html('Correct answers: ' + correct);
    $('.incorrect').html('Incorrect answers: ' + incorrect);
}

resetBtn = function () {
    $('#start_button').text('Restart').appendTo('#restart').show().addClass("text-center");
}



    //Game Logic //
    trivia = function() {
    var t = this;
    t.userPick = null;
    t.answers = {
        correct: 0,
        incorrect: 0
    };
    t.images = null;
    t.count = 30;
    t.current = 0;

    //Create Questions As Objects//
    t.questions = [{
        question: "Who killed Jon Arryn?",
        choices: ["Cersei Lannister", "Petyr Baelish", "Lysa Arryn", "Jaime Lannister"],
        images: ["../images/Lysa.gif"],
        correct: 2
    }, {
        question: 'Who says, "The worst ones always live"?',
        choices: ["Sansa Stark", "Arya Stark", "Daenerys Targaryen", "Cersei Lannister"],
        images: ["../images/Sansa.gif"],
        correct: 0

    }, {
        question: 'Fill in the blank: "What is _______ may never die."',
        choices: ["Iron", "Reborn", "Drowned", "Dead"],
        images: ["../images/ironborn.gif"],
        correct: 3

    }, {
        question: "Who is known as the Young Wolf?",
        choices: ["Jon Snow", "Robb Stark", "Bran Stark", "Ned Stark"],
        images: ["../images/robbstark.gif"],
        correct: 2
    }];

    //Ask Question + Create Question Button In Html//
    t.ask = function() {
        if (t.questions[t.current]) {
            $("#timer").addClass("text-center", "Time remaining: " + "00:" + t.count + " secs");
            $("#question_div").html(t.questions[t.current].question);
            var choicesArr = t.questions[t.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]).attr('data-id', i).addClass('btn btn-primary',);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(t.timer, 1000);
        } else { 
            $('.correct').show();
            $('.incorrect').show();     
            $('.unanswered').show();
            $('.unanswered').append('Unanswered: ' + (t.questions.length - (t.answers.correct + t.answers.incorrect)));
            resetBtn();
            // $('#start_button').text('Restart').appendTo('#restart').show().addClass("text-center");
        } 
    };


    t.timer = function() {
        t.count--;
        if (t.count <= 0) {
            setTimeout(function() {
                t.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + t.count + " secs");
        }
    };

    t.nextQ = function() {
        t.current++;
        clearInterval(window.triviaCounter);
        t.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            t.cleanUp();
            t.ask();
        }, 1000)
    };
    t.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + t.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + t.answers.incorrect);
    };
    t.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        t.answers[string]++;
        $('.' + string).html(string + ' answers: ' + t.answers[string]);
    };
    return t;
};
var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    Trivia = trivia();
    Trivia.ask();
    reset();
    $('.correct').hide();
    $('.incorrect').hide();
    $('.unanswered').hide();

});

$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        t = Trivia || $(window).trivia(),
        index = t.questions[t.current].correct,
        correct = t.questions[t.current].choices[index];


    if (userPick !== index) {
        $('#choices_div').text("Wrong Answer... The correct answer was: " + correct);
        t.answer(false);
        $('body').append('<img src="../images/wrong.gif">');
        $('.incorrect').show();
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        t.answer(true);
        $('#theDiv').prepend('<img id="correct" src />')
        //couldn't get this to work, scope issue//
        // $('body').append(`<img src="${t.question.images}">`);
        $('.correct').show();
    }
    t.nextQ();
});
