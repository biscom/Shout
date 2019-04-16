$(document).ready(function(){
	$("#feature-submit").val('');
	$("#search-bar").val('');


   $("[data-toggle=popover]").each(function(i, obj) {
   	$(this).popover({
   		html: true,
   		trigger: 'focus',
   		content: function() {
   			var id = $(this).attr('id')
   			return $('#popover-content-' + id).html();
   		}
   	});
   });

   var maxLength = 200;
	$('#feature-submit').keyup(function() {
  		var length = $(this).val().length;
  		var length = maxLength-length;
  		$('#rant-chars').text(length);
	});

	$('#submit-entry').click(function() {
		console.log("here");
		$('#tod').css("display", "none");
		$('#rant-chars').css("display", "none");
		$('.submit-status').css("display", "block");
		$('.rant-popover').css("visibility", "hidden");
		$('#topic').css("display", "none");
		$('#feature-submit').css("display", "none");
		$('#submit-entry').css("display", "none");
		$('.feature-btn').css("display", "none");
		$('.featured').css("height", "42vh");
		$('.feature-btns').css("display", "inline-block");
		$('#view-entry').css("display", "inline-block");
		$('#submit-topic').css("display", "inline-block");
		$('.circle-loader').css("display", "inline-block");
		$('.circle-loader').css("visibility", "visible");

		
		setTimeout(function(){
			$('.circle-loader').toggleClass('load-complete');
			$('.checkmark').toggle();
			$('.submit-status').text("Submitted your Shout!");
		}, 3000);
		
	});

	addTags();
});

function incrementValue() {
    var value = parseInt(document.getElementById('msg1-rating').innerHTML, 10);
    console.log(value);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('msg1-rating').innerHTML = value;
}


function decrementValue() {
    var value = parseInt(document.getElementById('msg1-rating').innerHTML, 10);
    console.log(value);
    value = isNaN(value) ? 0 : value;
    value--;
    document.getElementById('msg1-rating').innerHTML = value;
}

$( "#regional" ).click(function() {
	$(this).css("color", '#fff');
	$(this).css("background-color", '#ffc15e');
	$("#local" ).css("color", '#ffc15e');
	$("#local" ).css("background-color", '#fff');
});

$( "#local" ).click(function() {
	$(this).css("color", '#fff');
	$(this).css("background-color", '#ffc15e');
	$("#regional" ).css("color", '#ffc15e');
	$("#regional" ).css("background-color", '#fff');
});

$( "#darrow" ).click(function(e) {
        e.preventDefault();
        $(".comments").not(".comments").slideDown();
        $( ".comments" ).slideToggle( "slow", function() {});
});

generalId = "";

$('.post-options').click(function(){
	var buttonId = $(this).attr('id');
	var postText = $(this).closest('div').find('.msg-content').text();
	console.log(postText)
	var id = buttonId.split("-")[0];
	$('#modal-container').removeAttr('class').addClass(id);
  	$('body').addClass('modal-active');

  	$('#share-post').click(function() {
  		console.log("here")
  		$('.choices').hide('slide', {direction: 'left'}, 1000);
  		$('#copy-text').append(postText);
  		$('#copy-post').css('display', 'inline-block');
  		$('#share-fb').css('display', 'inline-block');
  		$('#share-tw').css('display', 'inline-block');
  		$('#copy-text').css('display', 'inline-block');
	});
 });

$('.post').click(function(){
  var buttonId = $(this).attr('id');
  generalId = buttonId;
  var postText = $(this).closest('div').find('#post-details').text();
  var postStatus = $(this).closest('div').find('#flag-status').text();
  console.log(postStatus);
  console.log(postText);
  console.log(buttonId);
  $('.post-status').css("background-color", "rgb(255, 199, 79)");
  $(".new-post-status").html(postStatus);
  $( ".full-post-words" ).empty();
  $( ".full-post-words" ).append(postText);
  console.log(postText)
  var id = buttonId.split("-")[0];
  console.log(id);
  if (id === "flagged") {
  	console.log("here")
  	$('#modal-container').removeAttr('class').addClass(id);
  	$('body').addClass('modal-active');

	$('i.fas.fa-plus').click(function() {
		$('#view-shout').css("margin-top", "-5vh");
		$(this).css("background-color", "#fcb165");
		console.log(postText);
		$('.full-post-words').empty();
		moderatedWords(postText);
		$('#save-changes').css("display", "block");
		$('div.word').click(function() {
			$(this).css("background-color", "rgb(255, 199, 79)");
			//rgb(255, 199, 79)

			});
	});


  	// $('#save-changes').click(function() {
  // 		// $(".post-summary").hide("slide", { direction: "left" }, 10000);
  // 		$('i.fas.fa-times').css("background-color", "#47C5C0");
		// $('i.fas.fa-user-times').css("background-color", "#47C5C0");
		// $('i.fas.fa-folder').css("background-color", "#47C5C0");
		// $('i.fas.fa-plus').css("background-color", "#47C5C0");
		// document.getElementById(generalId).remove();

		// $('#modal-container').addClass('out');
  // 		$('body').removeClass('modal-active');
  // 		$('#save-changes').css("display", "none");
  	// });
  }

});

$('#save-changes').click(function() {
	console.log("here")
	$('.post-summary').hide('slide', {direction: 'left'}, 1000);
	console.log("safe");
	getAllModified();
	$('.modal').css('margin-top', '3%');
	$('.changes-summary').css('display', 'block');
	$('#fail-safe-title').css('display', 'block');
	$('#save-all-changes').click(function() {
  		// $(".post-summary").hide("slide", { direction: "left" }, 10000);
  		$('i.fas.fa-times').css("background-color", "#47C5C0");
		$('i.fas.fa-user-times').css("background-color", "#47C5C0");
		$('i.fas.fa-folder').css("background-color", "#47C5C0");
		$('i.fas.fa-plus').css("background-color", "#47C5C0");
		document.getElementById(generalId).remove();

		$('#modal-container').addClass('out');
  		$('body').removeClass('modal-active');
  		$('#save-changes').css("display", "none");
  	});
  
});


$('.modal-background').click(function(ev) {
	console.log(ev.target);
	if(ev.target != this) return;
	else {
		$('#new-post-status').removeClass('typcn-arrow-up-thick');
		$('#new-post-status').addClass('typcn-warning');
		$('#save-changes').css("display", "none");
		$('#modal-container').addClass('out');
  		$('body').removeClass('modal-active');
	}
	
});

function moderatedWords(text) {
	moderateWords = text.split(" ");
	for (i = 0; i < moderateWords.length; i++) {
		modWord = "<div class=\"word\">" + moderateWords[i] + "</div>"
		$( ".full-post-words" ).append( modWord );
	}
	
}

function getAllModified() {
	words = []
	$( ".word" ).each(function() {
		if ($(this).css("background-color") == "rgb(255, 199, 79)") {
			console.log($(this).text())
			modWord = "<div class=\"mword\">" + $(this).text() + "</div>"
			$( ".modified-words" ).append( modWord );
		}
	});
}

$('.post-status').click(function() {
	bColor = $(this).css("background-color");
	console.log(bColor);
	if (bColor === "rgb(6, 214, 160)") {
		$('#new-post-status').removeClass('typcn-arrow-up-thick');
		$('#new-post-status').addClass('typcn-warning');
		$('.post-status').css("background-color", "rgb(255, 199, 79)");
		$('.new-post-status').text("Removed");
	}

	else if (bColor === "rgb(255, 199, 79)") {
		$('#new-post-status').removeClass('typcn-warning');
		$('#new-post-status').addClass('typcn-arrow-up-thick');
		$('.post-status').css("background-color", "rgb(6, 214, 160)");
		$('.new-post-status').text("Restored");
	}
		
});


$('.fas.fa-check-circle').click(function() {
	color = $(this).css("color");
	console.log(color);
	if (color === "rgb(255, 255, 255)") {
		$(this).css("color", "rgb(6, 214, 160)");
	}

	else if (color === "rgb(6, 214, 160)") {
		$(this).css("color", "rgb(255, 255, 255)");

	}

});

$('i.fas.fa-times').click(function() {
	$(this).css("background-color", "#fcb165");
	$('#new-post-status').removeClass('typcn-arrow-up-thick');
	$('#new-post-status').addClass('typcn-warning');
	$('.post-status').css("background-color", "rgb(255, 199, 79)");
	$('.new-post-status').text("Removed");
});

$('i.fas.fa-user-times').click(function() {
	$(this).css("background-color", "#fcb165");
	strikes = $('#strikes-stat').text();
	newStrikes =  parseInt(strikes) + 1;
	$('#strikes-stat').text(newStrikes);
});

function addTags() {
	colors = ["#fcb165", "#E75A7C", "#47C5C0", "#485977", "rgb(6, 214, 160)", "#FFC74F", "#95DBD2"];
  	hashtags = ["#hot", "#boy", "#follow", "#style", "#work", "#fit", 
  				"#fashion", "#igers", "#black", "#beach", "#food", "#music",
  				 "#healthy", "#nyc", "#picture", "#business", "#l4l", "#training", "#Family", 
  				 "#autumn", "#mood", "#makeup", "#vsco", "#sunset", "#explore", "#weekend", "#success",
  				 "#friends", "#baby", "#City", "#USA", "#goals", "#instapic", "#blogger"];
  	// hashtags.sort(key=len);
  	c = 0;
  	for (i = 0; i < hashtags.length; i++) {
  		hashTag = "<div class=\"hashtag\" style=\"background-color:" + colors[c]  + ";\">" + hashtags[i] + "</div>"
  		$( ".pending-tags" ).append(hashTag);
  		c += 1;
  		if (c == 7) {
  			c = 0;
  		}
  	}
}

// function decrementValue(){
    
//     var value = parseInt(document.getElementById('number').value, 10);
//     value = isNaN(value) ? 0 : value;
//     value--;
//     document.getElementById('number').value = value;
// }