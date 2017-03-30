var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/transactionDB'); //Connects to a mongo database called "commentDB"

var transactionSchema = mongoose.Schema({ //Defines the Schema for this database
	Category: String,
	Notes: String,
	Amount: Number,
	Month: Number
});

//have an array of addable types
var transactionType = mongoose.Scheme({
	Category: String
});

var defaults = ["Food","Entertainment","Transportation","Housing","Dates"];

var Transaction = mongoose.model('Transaction', transactionSchema); //Makes an object from that schema as a model
var Types = mongoose.model('TransactionType', transactionType);

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
console.log('Connected');

//write default categories
for(i = 0; i < defaultTypes.length; i++) {
	var newType = new Types(defaultTypes[i]); //[3]
	// console.log(newcomment); //[3]
	newType.save(function(err, post) { //[4]
		  if (err) return console.error(err);
		  console.log(post);
		});
}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET comments from database */
router.get('/transaction', function(req, res, next) {
	console.log("In the GET route?");
	var type = req.query['Type'];
	delete req.query['Type'];
	if (type == 'individual_trans'){
		Transaction.find(req.query, function(err,transactionList) { //Calls the find() method on your database
		  if (err) return console.error(err); //If there's an error, print it out
		  else {
		    console.log(transactionList); //Otherwise console log the comments you found
		    res.json(transactionList); //Then send the comments
		  }
		}).sort( { Month: 1 } )
	}
	else {
		//Kind of annoying but the match function doesn't work with strings, so need to convert to int
		if (req.query['Month']){
			req.query['Month'] = parseInt(req.query['Month']);
		}
		var data = Transaction.aggregate([{$match:req.query},{$group:{"_id":{"Category":"$Category", "Month":"$Month"}, "Amount":{$sum:"$Amount"}}},{ $sort: { "_id.Month": 1 } }], function(err,transactionList) { //Calls the find() method on your database
		  if (err) return console.error(err); //If there's an error, print it out
		  else {
		    console.log(transactionList); //Otherwise console log the comments you found
		    res.json(transactionList); //Then send the comments
		  }
		})
	}		
});

/* POST comment to database */
router.post('/transaction', function(req, res, next) {
	// console.log(req.body);
	var newtransaction = new Transaction(req.body); //[3]
	// console.log(newcomment); //[3]
	newtransaction.save(function(err, post) { //[4]
		  if (err) return console.error(err);
		  console.log(post);
		  res.sendStatus(200);
	});
});

/* POST comment to database */
router.delete('/transaction', function(req, res, next) {
	console.log("IN THE DELETE ROUTE");
	db.collections.transaction.remove({});
    res.sendStatus(200);
});

/* POST type to database */
router.post('/type', function(req, res, next) {
	// console.log(req.body);
	var newType = new transactionType(req.body); //[3]
	// console.log(newcomment); //[3]
	newtransaction.save(function(err, post) { //[4]
		  if (err) return console.error(err);
		  console.log(post);
		  res.sendStatus(200);
	});
});

router.get('/type', function(req, res, next) {
	console.log("In the GET route");
	transactionType.find(function(err,categories) { //Calls the find() method on your database
	  if (err) return console.error(err); //If there's an error, print it out
	  else {
		console.log(categories); //Otherwise console log the comments you found
			res.json(categories); //Then send the comments
		  }
	  });
});

module.exports = router;
