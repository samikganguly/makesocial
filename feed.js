var ACL = require('./acl');
var MakeSocial = MakeSocial || {};
MakeSocial.Feed = function(args) {
    var __feedtypes = ["text", "video", "image", "link", "album"];
    var __defaultACL = new ACL();

    if(!(args && args.owner))
        throw "New feed object must have an owner.";
    this.owner = args.owner;
    this.timestamp = args.timestamp || new Date();
    if(!(args && args.type) || __feedtypes.indexOf(args.type) === -1)
        throw "New feed object must have a valid type";
    this.type = args.type;
    if(!(args && args.content))
        throw "New feed object must have some content.";
    this.content = args.content;
    this.acl = args.acl || __defaultACL;
    
    this.fetch = function(owner, timestamp) {
        for(var feed in sampleFeeds) {
            if(sampleFeeds[feed].owner == owner && sampleFeeds[feed].timestamp == timestamp)
                return sampleFeeds[feed];
        }
    };
};
MakeSocial.Feed.sampleFeeds = [
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
];
MakeSocial.Feed.fetchRecent = function() {
    var feeds = [];
    //the following portion will be replaced by feed fetching code
    //now we just return 100 random feeds at a time to test client durability
    for(var i = 0; i < 100; i++) {
        var index = Math.round(Math.random() * 4);
        feeds.push(MakeSocial.Feed.sampleFeeds[index]);
    }
    return feeds;
};
module.exports = MakeSocial.Feed;