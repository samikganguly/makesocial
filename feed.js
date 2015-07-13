var MakeSocial = MakeSocial || {};
MakeSocial.Feed = function(args) {
    var __feedtypes = ["text", "video", "image", "link"];
    var __defaultACL = {
        me: "rw",
        connections: "r",
        public: "r"
    };

    if(!args.owner)
        throw "New feed object must have an owner.";
    this.owner = args.owner;
    this.timestamp = args.timestamp || new Date();
    if(!args.type || __feedtypes.indexOf(args.type) === -1)
        throw "New feed object must have a valid type";
    this.type = args.type;
    if(!args.content)
        throw "New feed object must have some content.";
    this.content = args.content;
    this.acl = args.acl || __defaultACL;
};
module.exports = MakeSocial.Feed;