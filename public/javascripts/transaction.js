$(document).ready(function(){
  

	//load comments on page load
	// getTransactions();
	

  $("#postTransaction").click(function(){
	var transaction;

	var category = $("#category").val() == 'other' ? $('#otherCategory').val() : $("#category").val();
	var transaction = {Category:category,Amount:$("#amount").val(), Notes:$("#notes").val(), Month:$("#month").val() };

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


  var ind_trans_header = "<tr><th>Category</th><th>Amount</th><th>Notes</th><th>Month</th></tr>";
  var agg_trans_header = "<tr><th>Category</th><th>Amount</th><th>Month</th></tr>";
  

  // Extracted logic into function so it can be used elsewhere
  function getTransactions(){
  	var parameters = {
  		Category: $("#category_filter").val(),
  		Month: $("#month_filter").val(),
  		Type: $("#type_filter").val()
  	}
  	var individual_trans = $("#type_filter").val() == 'individual_trans';

  	deleteByValue(parameters, '*');
  	console.log(parameters);


	$.getJSON('transaction?' + $.param(parameters), function(data) {
      var everything = individual_trans ? ind_trans_header : agg_trans_header;

      for(var transaction in data) {
        com = individual_trans ? data[transaction] : data[transaction]._id;
        everything += "<tr><td>" + com.Category + "</td> <td> " + data[transaction].Amount + " </td>";
        everything += individual_trans ? "<td>" + com.Notes + " </td>" : "";
        everything += "<td> " + com.Month + "</td></tr>";
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
	  
	  $('#category').change(function() {
    	if ($(this).val() === 'other') {
		$("#otherCategories").html('<input type="text" id="otherCategory" placeholder="enter new category">');
		}
		else {
			$("#otherCategories").html('');
		}
	});

});


//get categories on page load
$(function() {
	var defaultCategories = ["Food","Entertainment","Transportation","Housing","Dates"];
	var list = $('#category');
	var list2 = $('#category_filter');
	//go to "/type" route
	
	 $.getJSON('type', function(data) {
      console.log(data);
	  //for each thing in list:
		jQuery.each(data, function( i, obj ) {
		  //add to categories.
		  console.log(obj);
		  	list.append($('<option>', {value:obj.Category, text:obj.Category}));
		    list2.append($('<option>', {value:obj.Category, text:obj.Category}));

      });

		//if the server didn't gimme any responses, do it the regular way, with the default categories.
		if($('#category option').length < 2) {
			jQuery.each( defaultCategories, function( i, category ) {
				list.append($('<option>', {value:category, text:category}));
			    list2.append($('<option>', {value:category, text:category}));
			  });
		}
	});
	
});

