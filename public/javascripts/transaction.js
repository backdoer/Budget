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


  var ind_trans_header = "<tr><th>Category</th><th>Amount</th><th>Notes</th><th>Month</th></tr>"

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
      var everything = ind_trans_header;
      for(var comment in data) {
        com = data[comment];
        everything += "<tr><td>" + com.Category + "</td> <td> " + com.Amount + " </td><td>" + com.Notes + " </td><td> " + com.Month + "</td></tr>";
      }
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