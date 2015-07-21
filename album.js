var ACL = require('./acl');
var MakeSocial = MakeSocial || {};
MakeSocial.Album = function(args) {
    var previewLength = 2;
    var __defaultACL = new ACL();
    
    if(!(args && args.id))
        throw "New album object must have an ID";
    this.id = args.id;
    this.acl = args.acl || __defaultACL;
    this.preview = function() {
        var returnAlbum = {};
        var sampleAlbum = MakeSocial.Album.sampleAlbum;
        if(sampleAlbum.length > previewLength) {
            returnAlbum.preview = sampleAlbum.slice(0, previewLength);
            returnAlbum.more = sampleAlbum.length - previewLength;
        } else
            returnAlbum.preview = sampleAlbum;
        return returnAlbum;
    };
};
MakeSocial.Album.sampleAlbum = [{
    type: "image",
    link: "media/images/001.jpg",
    desc: "image of mind"
}, {
    type: "image",
    link: "media/images/001.jpg",
    desc: "my second image"
}, {
    type: "video",
    link: "media/video/001.mp4",
    desc: "a cool video"
}];
module.exports = MakeSocial.Album;
