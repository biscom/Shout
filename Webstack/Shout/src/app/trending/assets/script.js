var fs = require('fs');
const cheerio = require('cheerio')
const $ = cheerio.load(fs.readFileSync('./trending.component.html'))


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


$('input[type=checkbox]').change(function() {
    counter = 0;
    clicked = $(this).data('index');
    $('input[type=checkbox]').each(function() {
      if($(this)[0].checked) {
      counter++;
    } });

    if(counter == 3) {    
      toDisable = clicked;
      while(toDisable==clicked) {
        toDisable=Math.round(Math.random()*2);
      }

      $("input:eq("+toDisable+")")[0].checked = false;
    }

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
