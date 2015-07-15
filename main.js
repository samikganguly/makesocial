var Express = require('./express');
var Feed = require('./feed');
var app = new Express();
app.use(Express.static(__dirname + "/client"));
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
                content: {
                    link: "http://makesocial.in/media/images/001.jpg",
                    desc: "my first image"
                }
            }),
            new Feed({
                owner: "Tanushree Mukherjee",
                type: "video",
                content: {
                    link: "http://makesocial.in/media/video/001.mp4",
                    desc: "a cool video"
                }
            }),
            new Feed({
                owner: "Samik Ganguly",
                type: "image",
                content: {
                    link: "http://google.com",
                    desc: "World's best search engine"
                }
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