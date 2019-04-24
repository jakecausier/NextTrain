
$(function(){

	$.ajax({
		method: "GET",
		url: "https://huxley.apphb.com/crs"
	})
	.done(function (res) {
		for (var i = 0; i < res.length; i++) {
			$('#station-from').append('<option value="' + res[i].crsCode +'">' + res[i].stationName + "</option>");
			$('#station-to').append('<option value="' + res[i].crsCode +'">' + res[i].stationName + "</option>")
		}
	})


	$('#submit').click(function(e) {
		e.preventDefault();

		var value_from = $('#station-from').val();
		var value_to = $('#station-to').val();

		$.ajax({
		  method: "POST",
		  url: "/search",
		  data: {
		  	from: value_from,
		  	to: value_to
		  }
		})
		.done(function(res) {
	    console.log("Response received...");
	    console.log(res);
	  });
	})
});