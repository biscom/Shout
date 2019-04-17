$(".showComments").click(function() {
	$(this).parent().siblings(".postBottom").slideToggle();
	$(this).toggleClass("fa-chevron-down fa-chevron-up");
});

$(".up").click(function() {
	var score = parseInt($(this).siblings(".score").html());
	$(this).siblings(".score").html(score+1);
});

$(".down").click(function() {
	var score = parseInt($(this).siblings(".score").html());
	$(this).siblings(".score").html(score-1);
});

// :(