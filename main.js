var listenPort = process.argv[2] || 8180;
var Path = require('path');
var Express = require('./express');
var Feed = require('./feed.js');
var Album = require('./album.js');
var app = new Express();
app.use(Express.static(Path.normalize(__dirname + "/client")));
app.get('/feed', function(rq, rs){
    try {
        rs.json(Feed.fetchRecent());
    } catch(err) {
        console.trace(err);
        rs.status(500).end();
    }
});
app.get("/media/album/:id", function(rq, rs) {
    try {
        var album = new Album({
            id: rq.params.id
        });
        rs.json(album.preview());
    } catch(err) {
        console.trace(err);
        rs.status(500).end();
    }
});
app.listen(listenPort);