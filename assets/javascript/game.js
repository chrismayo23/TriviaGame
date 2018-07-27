// Make arrays for questions, possible answers, correct answers, and image file names
var questions = [
    "This NFL quarterback from the 1990's led his team to 4 consecutive Super Bowl appearances while innovating the \"no-huddle\" offense.",
    "This bicycle racer, nicknamed \"The Cannibal\", rocketed his way to 5 Tour de France wins between 1969 and 1974.",
    "This track and field star won the 100 meter and 200 meter dash at the 1988 Olympics on her way to 3 gold medals.",
    "This tennis legend won the 2017 Australian Open to surpass Steffi Graf's record of 22 major championships.",
    "This New York Yankee had his 1952 Tops baseball card sell for $2.88 million at a 2018 sports memorabilia auction.",
    "This basketball mega-star signed to play for the Los Angeles Lakers in 2018 after winning championships with Miami Heat and Cleveland Cavaliers.",
    "This legendary golfer was the only one to complete the Grand Slam by winning all 4 major championships in a single year. He would go on to design Augusta National Golf Club and found The Masters tournament.",
    "This multi-sport athlete was raised in the Sac and Fox Indian tribe. He won 2 gold medals in the 1912 Olympics and went on to star in NFL in the 1920's.",
    "This pioneer in women's sport won 2 gold medals in the 1932 Olympics and went on to win 10 major championships as an LPGA Golfer.",
    "This track and field athlete entered the 1936 Olympics in Berlin and took home a record 4 gold medals.",
];
var possibleAnswers = [
    ["John Elway", "Tom Brady", "Jim Kelly", "Dan Marino"],
    ["Lance Armstrong", "Eddy Merckx", "Miguel Indurain", "Chris Froome"],
    ["Jackie Joyner-Kersey", "Allyson Felix", "Brenda Martinez", "Florence Griffith-Joyner"],
    ["Venus Williams", "Chris Evert", "Serena Williams", "Monica Seles"],
    ["Mickey Mantle", "Babe Ruth", "Lou Gehrig", "Joe DiMaggio"],
    ["Michael Jordan", "Wilt Chamberlain", "Kobe Bryant", "LeBron James"],
    ["Jack Nicklaus", "Bobby Jones", "Old Tom Morris", "Tiger Woods"],
    ["Jim Thorpe", "Jim Brown", "Muhammad Ali", "Red Grange"],
    ["Nancy Lopez", "Billy Jean King", "Babe Didrikson Zaharias", "Anika Sorenstam"],
    ["Carl Lewis", "Usain Bolt", "Michael Phelps", "Jesse Owens"],
];
var answers = [2, 1, 3, 2, 0, 3, 1, 0, 2, 3];
var imageName = [
    "kelly.jpg",
    "merckx.jpg",
    "flojo.jpg",
    "serena.jpg",
    "mickey.jpg",
    "lebron.gif",
    "jones.jpg",
    "thorpe.jpg",
    "babe.jpg",
    "owens.jpg",
];

// Hide other tiles upon loading
$("#question-tile").hide();
$("#answer-tile").hide();
$("#final-score-tile").hide();

// Start the game on click function. Takes user to first question screen.
$("#startButton").on("click", function() {
    $("#opening-message").hide();
    $("#question-tile").show();
    run();
});

// Initalize count variable to designate which question we are on.
// numberCorrect to designate number right answers.
var count = 0;
var numberCorrect = 0;

// Function to fill in the #question-tile with info.
var fillInQuestion = function() {
    $("#question-number").text(count + 1);
    $("#question-words").text(questions[count]);
}
fillInQuestion();

// Function to fill in possible answers
var fillInAnswers = function() {
    $("[value=0]").text(possibleAnswers[count][0]);
    $("[value=1]").text(possibleAnswers[count][1]);
    $("[value=2]").text(possibleAnswers[count][2]);
    $("[value=3]").text(possibleAnswers[count][3]);
}
fillInAnswers();

// Function to handle answer button click
$(".answer").on("click", function() {
    var answerValue = parseInt($(this).attr("value"));
    if (answerValue === answers[count]) {
        $("#answer-message").text("Yes! " + possibleAnswers[count][answers[count]] + " is the correct answer.");
        numberCorrect++;
        count++;
        stop();
    }
    else {
        $("#answer-message").text("Oh no. " + possibleAnswers[count][answers[count]] + " is the correct answer.");
        count++;
        stop();
    }

    // Put these before if statement below so that they show up properly when game is reloaded.
    $("#number-correct").show();
    $("#next-question").show();

    // Insert picture into #image-div
    $("#image-div").html($("<img>").attr('src', 'assets/images/' + imageName[count - 1]));

    // Content and showing #answer-tile
    $("#number-correct").text("Score: " + numberCorrect + "/" + count);
    $("#question-tile").hide();
    $("#answer-tile").show();

    // Actions if on final question
    if (count === 10) {
        $("#image-div").html($("<img>").attr('src', 'assets/images/' + imageName[count - 1]));
        $("#number-correct").hide();
        $("#next-question").hide();
        $("#final-score-tile").show();
        $("#final-score").text("Your final score is: " + numberCorrect + "/" + count);
    }

    // Fill in text for next question. TODO: This has to be after "if (count=10)""
    fillInQuestion();
    fillInAnswers();
});

// Function to handle #next-question button click
$("#next-question").on("click", function() {
    $("#answer-tile").hide();
    $("#question-tile").show();
    fillInQuestion();
    fillInAnswers();
    run();
});

// Function to handle #play-again button click.
$("#play-again").on("click", function() {
    count = 0;
    numberCorrect = 0;
    fillInQuestion();
    fillInAnswers();
    $("#answer-tile").hide();
    $("#final-score-tile").hide();
    $("#opening-message").show();
    $("#next-question").show();
    $("#answer-message").show();
    $("#number-correct").show();
});

// Timer related functions
var number;
var intervalId;

function run() {
    $("#counter").text("15")
    number = 15;
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    number--
    $("#counter").text(number)
    if (number === 0) {
        if (count === 9) {
            $("#answer-message").text("Out of time. " + possibleAnswers[count][answers[count]] + " is the correct answer.");
            count++
            $("#question-tile").hide();
            $("#answer-tile").show();
            $("#image-div").html($("<img>").attr('src', 'assets/images/' + imageName[count - 1]));
            $("#number-correct").hide();
            $("#next-question").hide();
            $("#final-score-tile").show();
            $("#final-score").text("Your final score is: " + numberCorrect + "/" + count);
        } else {
            $("#answer-message").text("Out of time. " + possibleAnswers[count][answers[count]] + " is the correct answer.");
            count++;
            $("#question-tile").hide();
            $("#answer-tile").show();
            $("#image-div").html($("<img>").attr('src', 'assets/images/' + imageName[count - 1]));
            $("#number-correct").text("Score: " + numberCorrect + "/" + count); 
        } 
    }
}

function stop() {
    clearInterval(intervalId);
}