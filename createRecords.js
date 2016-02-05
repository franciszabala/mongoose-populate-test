var mongoose = require('mongoose');

var Schema = mongoose.Schema,
TerminalLocation = require('./models/TerminalLocation.js'),
TransactionLog = require('./models/TransactionLog.js');



var initialData = [{
      address:'New York',
      currentLocation: 'Saint Orleans',
      locationRetrievalStatus: 'success'
    },
    {
      address:'Madrid',
      currentLocation: 'New Shanghai',
      locationRetrievalStatus: 'success'
    },
    {
      address:'Dakar',
      currentLocation: 'Pax Atlanta',
      locationRetrievalStatus: 'success'
    },
    {
      address:'Stanley',
      currentLocation: 'Cuidad de Raaisel',
      locationRetrievalStatus: 'fail'
    }];


console.log("data: " +initialData);

module.exports = {
   createRecords : function(callback) {
     TerminalLocation.create(initialData, function(err, object) {
              console.log('Saving Terminal Location records to MongoDb...');

             if (err) {
               console.log(err)
               callback(err, null);
             };

              var user = 'Ted';
              var transLogArray = [];

              console.log('Creating Transaction Log records');

              for (i = 0; i < object.length; i++) {
                  var temp = {
                    user : user,
                    queryResult: object[i]._id
                  }
                  transLogArray.push(temp);
              }


              TransactionLog.create(transLogArray, function (err, result){

                console.log('Saving Transaction Log records to MongoDb...');

                if (err) {
                  console.log(err)
                  callback(err, null);
                }
                callback(null,result);
              });
     });
   },

   countRecords : function (callback) {
     var termCount = 0;
     TerminalLocation.count({}, function(err,termcount){
       if (err) {
         console.log(err)
         callback(err, null);
       }
       TransactionLog.count({}, function (err, transcount) {
         if (err) {
           console.log(err)
           callback(err, null);
         }
         var result  =  {
           terminalcount: termcount,
           transactioncount: transcount
         }
         callback(null, result);
       });
   });
 },

    deleteRecords : function(callback) {
      TerminalLocation.remove({}, function(err, termRemove){
        if (err) {
          console.log(err);
          callback(err, null);
        }
        TransactionLog.remove({}, function(err, transRemove){
          if (err) {
            console.log(err);
            callback(err, null);
          }
          var result = {
            terminallog: "deleted",
            transactionlog : "deleted"
          }
          callback(null, result);
        });
      });



    },

    viewRecords: function(callback) {
      TransactionLog.find({}, null, {sort: '-created_at'})
      .populate({
        path:'queryResult',
        match: {locationRetrievalStatus: 'fail'}
      })
      .exec(function (err, result) {
        if (err) console.log(err);
        callback(null, result);
        });
    }
}

/*
TerminalLocation.remove({}, function(err, object) {
        if (err) console.log(err);
        console.log("Deleted" +object);
});

TerminalLocation.count({}, function(err, object) {
        if (err) console.log(err);
        console.log("Object deleted");
});
*/
