$(document).ready(function(){

	//load comments on page load
	getComments();

  $("#postComment").click(function(){
	var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()};
	jobj = JSON.stringify(myobj);
	$("#json").text(jobj);

	var url = "/comment";
	$.ajax({
	url:url,
	type: "POST",
	data: jobj,
	contentType: "application/json; charset=utf-8",
	success: function(data,textStatus) {
	    $("#done").html(textStatus);
	    getComments();
	}
	})

  });

  // Extracted logic into function so it can be used elsewhere
  function getComments(){
	$.getJSON('comment', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  }

  $("#getComments").click(function() {
  	getComments();
  });

  $('#deleteComments').click(function(){
  	$.ajax({
	    url: 'comment',
	    type: 'DELETE',
	    success: function(result) {
	    	console.log(result);
	    	getComments();
	        // Do something with the result
    }
});
  });

});