var Sanitizer = require('./sanitizer');
var ACL = require('./acl');
var DAO = require('./mongodao');
var dbURL = "";
var MakeSocial = MakeSocial || {};
/**
 * Represents a news feed
 * @param {object} args the constructor arguments
 * @property {object} owner user responsible for creating the feed
 * @property {Date} timestamp creation time of the feed
 * @property {string} type type of feed
 * @property {object} content feed content
 * @property {string} content.link optional URL of the resource
 * @property {string} content.desc feed body
 * @property {ACL} acl access control list for current feed
 * @constructor
 */
MakeSocial.Feed = function(args) {
    var __defaultACL = new ACL();
    var self = this;
    var dao = new DAO({
        url: dbURL,
        collectionNames: {
            feed: "FEED"
        }
    });

    if(!args || args === {})
        throw "Ignoring creation of empty feed object";
    if(args.ID) { //Feed has an ID it's a parsistent feed
        this.ID = args.ID;
    } else {//if Feed doesn't have an ID, it a new feed yet to be parsisted
        args = Sanitizer.sanitizeFeed(args);
        this.owner = args.owner;
        this.timestamp = args.timestamp || new Date();
        this.type = args.type;
        this.content = args.content;
        this.acl = args.acl || __defaultACL;
    }
    
    this.fetch = function(callback) {
        dao.getFeed(self, function (feedObj) {
            self.owner = feedObj.owner;
            self.timestamp = feedObj.timestamp;
            self.type = feedObj.type;
            self.content = feedObj.content;
            self.acl = feedObj.acl;
            self.stat = feedObj.stat;
            if(typeof(callback) === "function")
                callback(self);
        });
    };
    this.create = function(callback) {
        if(self.ID)
            throw "Feed already exists";
        dao.createFeed(self, function (insertResult) {
            self.ID = insertResult.ops[0]._id;//ops = inserted object(s)
            if(typeof(callback) === "function")
                callback(self);
        });
    };
    this.edit = function(change, callback) {
        if(!change || change === {})
            throw "Ignoring empty change";
        //santitize change list, keep only allowed changes
        change = Sanitizer.sanitizeFeedEdit(change);
        if(self.ID) {
            dao.editFeed(self, change, function (change, updateResult) {
                if(change.content && change.content.desc)
                    self.content.desc = updateResult.ops[0].content.desc;
                if(change.acl)
                    self.acl = updateResult.ops[0].acl;
                if(typeof(callback) === "function")
                    callback(self);
            });
        } else {
            if(change.content && change.content.desc)
                self.content.desc = change.content.desc;
            if(change.acl)
                self.acl = change.acl;
            if(typeof(callback) === "function")
                callback(self);
        }
    };
    this.remove = function (callback) {
        if(self.ID) {
            dao.removeFeed(self, function (removeResult) {
                callback(self);
            });
        }
    };
};
/*MakeSocial.Feed.sampleFeeds = [
    new MakeSocial.Feed({
        owner: "Samik Ganguly",
        type: "text",
        content: "This is a test post."
    }),
    new MakeSocial.Feed({
        owner: "Mrityunjoy Mukherjee",
        type: "image",
        content: {
            link: "media/images/001.jpg",
            desc: "my first image"
        }
    }),
    new MakeSocial.Feed({
        owner: "Tanushree Mukherjee",
        type: "video",
        content: {
            link: "media/video/001.mp4",
            desc: "a cool video"
        }
    }),
    new MakeSocial.Feed({
        owner: "Samik Ganguly",
        type: "image",
        content: {
            link: "http://google.com",
            desc: "World's best search engine"
        }
    }),
    new MakeSocial.Feed({
        owner: "Samik Ganguly",
        type: "album",
        content: {
            link: "media/albums/001",
            desc: "memories"
        }
    })
];*/
MakeSocial.Feed.fetchRecent = function(options, callbackForEach) {
    
};
module.exports = MakeSocial.Feed;