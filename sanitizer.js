var ACL = require('./acl');
var Feed = require('./feed');
var MakeSocial = MakeSocial || {};
MakeSocial.Sanitizer = function(args) {
    //do initialization tasks with args here
    var __feedtypes = ["text", "video", "image", "link", "album"];
    
    this.sanitizeFeed = function(args) {
        if(!args.owner)
            throw "New feed object must have an owner.";
        if(!args.type || __feedtypes.indexOf(args.type) === -1)
            throw "New feed object must have a valid type";
        if(!args.content)
            throw "New feed object must have some content.";
        if(!this.acl instanceof ACL)
            throw "Invalid ACL";
        return args;
    };
    /**
     * checks for changes that are not allowed while editing a feed. 
     * only description and permission of the feed can be changed
     * @param {object} change
     * @returns {MakeSocial.Sanitizer.sanitizeFeedEdit.actualChange}
     */
    this.sanitizeFeedEdit = function (change) {
        var actualChange = {};
        if(change.content && change.content.desc) {
            actualChange.content = {};
            actualChange.content.desc = change.content.desc;
        }
        if(change.acl && change.acl instanceof ACL) {
            actualChange.acl = change.acl;
        }
        return actualChange;
    };
    this.sanitizePermission = function (permission) {
        if(permission.indexOf(MakeSocial.ACL.PERM_NONE) === -1 &&
                permission.indexOf(MakeSocial.ACL.PERM_READ) === -1 &&
                permission.indexOf(MakeSocial.ACL.PERM_WRITE) === -1) {
            throw "Not a valid permission string";
        }
        return permission;
    }
};
module.exports = MakeSocial.Sanitizer;
