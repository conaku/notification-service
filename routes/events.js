var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI ||process.env.MONGOHQ_URL ||'mongodb://localhost/mydb';
 

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving event: ' + id);
    ndb.collection('events', function(err, collection) {
        collection.findOne({'_id':new ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {

  mongo.Db.connect(mongoUri, function (err, db) {

    db.collection('events', function(er, collection) {
      collection.find().toArray(function(err, items) {
        res.send(items)
      });
    });
  });

};
 
exports.addEvent = function(req, res) {
  var event = req.body;
  console.log('Adding event: ' + JSON.stringify(event));

  mongo.Db.connect(mongoUri, function (err, db) {

    db.collection('events', function(er, collection) {
      collection.insert(event, {safe:true}, function(err, result) {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
           console.log('Success: ' + JSON.stringify(result[0]));
           res.send(result[0]);
        }
      });
    });
  
   });

}
 
exports.updateEvent = function(req, res) {
    var id = req.params.id;
    var event = req.body;
    console.log('Updating event: ' + id);
    console.log(JSON.stringify(event));
    ndb.collection('events', function(err, collection) {
        collection.update({'_id':new ObjectID(id)}, event, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating event: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(event);
            }
        });
    });
}
 
exports.deleteEvent = function(req, res) {
    var id = req.params.id;
    console.log ('creating ObjectID');
    newId = new ObjectID(id);
    console.log ('Here it is: ', newId);
    console.log('Deleting event: ' + id);
    ndb.collection('events', function(err, collection) {
        collection.remove({'_id':new ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 