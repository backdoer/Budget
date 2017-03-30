$(document).ready(function(){

	//load comments on page load
	// getTransactions();

  $("#postTransaction").click(function(){
	var transaction = {Category:$("#category").val(),Amount:$("#amount").val(), Notes:$("#notes").val(), Month:$("#month").val() };
	json_trans = JSON.stringify(transaction);

	var url = "/transaction";
	$.ajax({
	url:url,
	type: "POST",
	data: json_trans,
	contentType: "application/json; charset=utf-8",
	success: function(data,textStatus) {
	    console.log(textStatus);
	    getTransactions();
	}
	})

  });

  function deleteByValue(obj, val) {
    for(var f in obj) {
        if(obj[f] == val) {
            delete obj[f];
        	}
    	}
	}

  // Extracted logic into function so it can be used elsewhere
  function getTransactions(){
  	var parameters = {
  		Category: $("#category_filter").val(),
  		Month: $("#month_filter").val(),
  		Type: $("#type_filter").val()
  	}

  	deleteByValue(parameters, '*');
  	console.log(parameters);

	$.getJSON('transaction?' + $.param(parameters), function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li> Category: " + com.Category + " -- Amount: " + com.Amount + " -- Notes: " + com.Notes + " -- Month: " + com.Month + "</li>";
      }
      everything += "</ul>";
      $("#transactions").html(everything);
    })
  }

  $("#getTransactions").click(function() {
  	getTransactions();
  });

//   $('#deleteComments').click(function(){
//   	$.ajax({
// 	    url: 'comment',
// 	    type: 'DELETE',
// 	    success: function(result) {
// 	    	console.log(result);
// 	    	getTransactions();
// 	        // Do something with the result
//     }
// });
//   });

});