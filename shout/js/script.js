$(document).ready(function(){
	$("#feature-submit").val('');


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



// function decrementValue(){
    
//     var value = parseInt(document.getElementById('number').value, 10);
//     value = isNaN(value) ? 0 : value;
//     value--;
//     document.getElementById('number').value = value;
// }