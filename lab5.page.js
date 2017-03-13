var Lab5 = function() {
  //Your base URL should be of the form: xxx.xxx:3005

  var self = this;
  //Comments Form:
  self.name = $('#name');
  self.comment = $('#comment');

  //Buttons:
  self.post = $('#postComment');
  self.get = $('#getComments');
  self.deleteAll = $('#deleteComments');

  //Output Divs:
  self.jsonForm = $('#json');
  self.statusSpot = $('#done');
  self.commentsList = $('#comments');

  //route URL (when appended to the base one)
  self.commentRoute = "/comment"; //Should work for all (GET, POST, DELETE)
}

module.exports = new Lab5();
