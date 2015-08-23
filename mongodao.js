var Mongo = require('mongodb');
var MakeSocial = MakeSocial || {};
MakeSocial.MongoDAO = function (args) {
    if(!args)
        throw "please supply a valid database configuration";
    this.db = new Mongo.MongoClient();
    if(!args.url)
        throw "please supply a database URL";
    if(!args.collectionNames.feed)
        throw "need feed collection name";
    var self = this;
    
    this.getFeed = function (feed, callback) {
        self.db.connect(args.url, function(err, db){
            if(err) throw err;
            db.collection(args.collectionNames.feed, function(err, feedCollection) {
                if(err) throw err;
                feedCollection.findOne({
                    _id: feed.ID
                }, {
                    fields: {
                        owner: 1,
                        timestamp: 1,
                        type: 1,
                        content: 1,
                        acl: 1,
                        stat: 1
                    }
                },function(err, feedObj) {
                    if(err) throw err;
                    db.close();
                    callback(feedObj);
                });
            });
        });
    };
    
    this.createFeed = function (feed, callback) {
        self.db.connect(args.url, function(err, db){
            if(err) throw err;
            db.collection(args.collectionNames.feed, function(err, feedCollection) {
                if(err) throw err;
                feedCollection.insertOne(feed, function(err, result) {
                    if(err) throw err;
                    db.close();
                    callback(result);
                });
            });
        });
    };
    
    this.editFeed = function (feed, change, callback) {
        self.db.connect(args.url, function(err, db){
            if(err) throw err;
            db.collection(args.collectionNames.feed, function(err, feedCollection) {
                if(err) throw err;
                feedCollection.updateOne({
                    _id: feed.ID
                }, {
                    $set: change
                }, function(err, result) {
                    if(err) throw err;
                    db.close();
                    callback(change, result);
                });
            });
        });
    };
    
    this.removeFeed = function (feed, callback) {
        self.db.connect(args.url, function(err, db){
            if(err) throw err;
            db.collection(args.collectionNames.feed, function(err, feedCollection) {
                if(err) throw err;
                feedCollection.removeOne({
                    _id: feed.ID
                }, function(err, result) {
                    if(err) throw err;
                    db.close();
                    callback(result);
                });
            });
        });
    };
};
module.exports = MakeSocial.MongoDAO;
