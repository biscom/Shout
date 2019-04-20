// Toggle chevron icon for comment dropdown button
$(".showComments").click(function() {
	$(this).parent().siblings(".postBottom").slideToggle();
	$(this).toggleClass("fa-chevron-down fa-chevron-up");
});

// Category interface in sidebar
$("#categoryViewSelect").children().click(function() {
	var selectedClasses = $(this).attr('class');
	selectedClasses = selectedClasses.replace("notSelected", "");

	$(this).parent().siblings(".categoryLabel").attr("class", selectedClasses);
});

// Category interface in new post
$("#categoryOptions").children().click(function() {
	$(this).removeClass("notSelected");
	$(this).siblings().each(function() {
		if (!$(this).hasClass("notSelected")) {
			$(this).addClass("notSelected");
		}
	});
});




/*
$(".up").click(function() {
	var score = parseInt($(this).siblings(".score").html());
	$(this).siblings(".score").html(score+1);
});

$(".down").click(function() {
	var score = parseInt($(this).siblings(".score").html());
	$(this).siblings(".score").html(score-1);
});
*/
