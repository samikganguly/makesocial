var Express = require('/home/samik/node_modules/express');
var Feed = require('./feed');
var app = new Express();
app.get('/feed', function(rq, rs){
    try {
        var sampleFeeds = [
            new Feed({
                owner: "Samik Ganguly",
                type: "text",
                content: "This is a test post."
            }),
            new Feed({
                owner: "Mrityunjoy Mukherjee",
                type: "image",
                content: "http://makesocial.in/media/images/001.jpg"
            }),
            new Feed({
                owner: "Tanushree Mukherjee",
                type: "video",
                content: "http://makesocial.in/media/video/001.mp4"
            }),
            new Feed({
                owner: "Samik Ganguly",
                type: "image",
                content: "http://google.com"
            })
        ];
        var feeds = [];
        for(var i = 0; i < 100; i++) {
            var index = Math.round(Math.random() * 3);
            feeds.push(sampleFeeds[index]);
        }
        rs.json(feeds);
    } catch(err) {
        console.trace(err);
        rs.status(500).end();
    }
});
app.listen(8080);