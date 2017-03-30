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


  var ind_trans_header = "<tr><th>Category</th><th>Amount</th><th>Month</th><th>Notes</th></tr>";
  var agg_trans_header = "<tr><th>Category</th><th>Amount</th><th>Month</th></tr>";

  // Extracted logic into function so it can be used elsewhere
  function getTransactions(){
  	var display_type = $("#type_filter").val()
  	var parameters = {
  		Category: $("#category_filter").val(),
  		Month: $("#month_filter").val(),
  		Type: display_type
  	}

  	deleteByValue(parameters, '*');
  	var everything = display_type == 'individual_trans' ? ind_trans_header : agg_trans_header;


	$.getJSON('transaction?' + $.param(parameters), function(data) {
      console.log(data);
      
      for(var comment in data) {
        com = display_type == 'individual_trans' ? data[comment] : data[comment]._id;
        static_com = data[comment];
        everything += "<tr><td>" + com.Category + "</td> <td> " + static_com.Amount + " </td><td> " + com.Month + "</td>";
        everything += display_type == 'individual_trans' ? "<td>" + com.Notes + " </td>" : "";
        everything += "</tr>";
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