var mongoose = require('mongoose'),
createRecords = require('./createRecords'),
TransactionLog = require('./models/TransactionLog.js');

mongoose.connect('mongodb://127.0.0.1:27017/moongosePlay', function(err) {
    if(err) {
        console.log('MongoDB connection error', err);
    } else {
        console.log('MongoDb connection successful');

        createRecords.createRecords(function(err, result) {
          if (err) {
            console.log(err);
          } else {
            createRecords.countRecords(function(err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log(result);
                createRecords.viewRecords(function(err,result) {
                    if (err) { console.log(err);
                    } else {

                      var nullCounts = 0;
                      var notNullCounts = 0;
                      //display them result
                      for (var i = 0; i < result.length; i++) {
                        if (result[i].queryResult == null) {
                          nullCounts++;
                        } else {
                          notNullCounts++;
                        }

                      }
                      var resultCount = {
                        nullCounts: nullCounts,
                        notNullCounts: notNullCounts
                      }
                      console.log();
                      console.log(resultCount);
                      console.log();
                    ///

                                    createRecords.deleteRecords(function(err, result) {
                                      if (err) {
                                        console.log(err);
                                      } else {
                                        createRecords.countRecords(function(err, result) {
                                          if (err) {
                                            console.log(err);
                                          } else {
                                            console.log(result);

                                          }

                                          process.exit();
                                        });
                                      }
                                    });
                            }
                    ///
                });

              }
            });
          }
        });



    }
});






//process.exit()
