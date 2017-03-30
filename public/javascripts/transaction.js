$(document).ready(function(){
  


function getCategories(){
	var defaultCategories = ["Food","Entertainment","Transportation","Housing","Dates"];
	var list = $('#category');
	var list2 = $('#category_filter');
	list.empty();
	list2.empty();
	list.append($('<option>', {value:'other', text:'Other'}));
	list2.append($('<option>', {value:'*', text:'All Categories'}));
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
}

  var ind_trans_header = "<tr><th>Category</th><th>Amount</th><th>Notes</th><th>Month</th></tr>";
  var agg_trans_header = "<tr><th>Category</th><th>Amount</th><th>Month</th></tr>";

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
        everything += "<tr><td>" + com.Category + "</td> <td> $" + data[transaction].Amount + " </td>";
        everything += individual_trans ? "<td>" + com.Notes + " </td>" : "";
        everything += "<td> " + com.Month + "</td></tr>";
      }
      $("#transactions").html(everything);
    })
  }
	//load transactions and categories on page load
	// getTransactions();
	getCategories();
	

  $("#postTransaction").click(function(){
	var transaction;

	var category;
	if ($("#category").val() == 'other'){
		category = $('#otherCategory').val();
			var url = "/type";
			$.ajax({
			url:url,
			type: "POST",
			data: JSON.stringify({Category: category}),
			contentType: "application/json; charset=utf-8",
			success: function(data,textStatus) {
			    console.log(textStatus);
			}
		})

	}
	else {
		category = $("#category").val();
	}
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
	    // getTransactions();
	    getCategories();
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
		$("#otherCategories").show();
		$('#otherCategory').attr('required', 'required');

		}
		else {
			$("#otherCategories").hide();
			$('#otherCategory').removeAttr('required');
		}
	});

});



	
	

