const axios = require('axios');
const express = require('express');
const protobuf = require('protobufjs');

const app = express();

run().catch(err => console.log(err));

async function run() {
    const root = await protobuf.load('user.proto');

    const doc = {
        name: 'Bill',
        age: 30,
        email: 'nitin.sharma@gmail.com',
        phone: '1234567890',
        address: { city: 'Bangalore', state: 'Karnataka' },
        friends: [{ name: 'John', age: 20 }, { name: 'Jane', age: 21 }],
        hobbies: ['cricket', 'football', 'hockey'],
        salary: { amount: 10000, currency: 'INR' },
        isActive: true,
        birthDate: new Date(1980, 1, 1),
    };
    const User = root.lookupType('userpackage.User');

    app.get('/user', function (req, res) {
        res.send(User.encode(doc).finish());
    });

    app.post('/user', express.text({ type: '*/*' }), function (req, res) {
        // Assume `req.body` contains the protobuf as a utf8-encoded string
        const user = User.decode(Buffer.from(req.body));
        Object.assign(doc, user);
        res.end();
    });
    
    app.get('/share', function(req, res) {
        
         let html = "<html><head><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />" +
        "<meta property=\"og:title\" content=\"Nitin Sharma\">" +
        "<meta property=\"og:description\" content=\"Testing of share functionality\">" +
        "<meta property=\"og:type\" content=\"text\">" +
        "<meta property=\"fb:app_id\" content=\"" + "228474151382870" + "\">" +
        "<meta property=\"og:url\" content=\"http://www.fb.com\">" +
        "<meta property=\"og:image\" itemprop=\"image\" content=\"https://picsum.photos/200/300?random=2\">" +
        "<meta property=\"og:image:width\" content=\"" + "200" + "\">" +
        "<meta property=\"og:image:height\" content=\"" + "200" + "\">" +
        "<meta property=\"og:site_name\" content=\"MyAPP\">"

        + "<meta name=\"twitter:card\" content=\"media\">" +
        "<meta name=\"twitter:image\" content=\"https://picsum.photos/200/300?random=2\">" +
        "<meta name=\"twitter:creator\" content=\"@myAPP\">" +
        "<meta name=\"twitter:site\" content=\"@fb\">" +
        "<meta name=\"twitter:url\" content=\"\">" +
        "<meta name=\"twitter:title\" content=\"nitinhsharma\">" +
        "<meta name=\"twitter:description\" content=\"Follow me on twitter\">" +
        "<title>\"Nitin Sharma\"</title><script>" + getStringifiedScript() + "</script></head></html>";
        
        res.send(html);
        
        
    });
    
    
    function getStringifiedScript() {
        let dataFromLink = {
            'id': 1,
            'catId': 1
        };
        
        return "window.onload = function() { generatePath(); };" +
            "function getOS() {"+
                "const userAgent = window.navigator.userAgent,"+
                "platform = window.navigator.platform,"+
                "iosPlatforms = ['iPhone', 'iPad', 'iPod'];"+
                "let os = null;"+
                "if (iosPlatforms.indexOf(platform) !== -1) {"+
                    "os = 'iOS';"+
                "} else if (/Android/.test(userAgent)) {"+
                    "os = 'Android';"+
                "}"+
                "return os;"+
            "}"+
            "function generatePath() {" +
                "let locationPath = '?promotion=true&page=magazines&s=1';" +
                "let basePath = '\"https://protobuf-sample.herokuapp.com/;\"" +
                "window.location = encodeSpaceInUrl(\"https://twitter.com/_nitinhsharma\");" +
            "}" +

            "function encodeSpaceInUrl(url) {" +
                "return url.replace(/ /g, '-');" +
            "}" +

            "function removeUnsafeChars(str) {" +
                "return str.replace(/[`~!@#$%^&*()_|+\\-=?;:'\",.<>\\{\\}\\[\\]\\\\\\/]/gi, '')" +
            "}"
    }

    await app.listen(process.env.PORT, () => {
        console.log('Listening on port 3000');
    }
        );

    //   let data = await axios.get('http://localhost:3000/user').then(res => res.data);

    //   // "Before POST User { name: 'Bill', age: 30 }"
    //   console.log('Before POST', User.decode(Buffer.from(data)));
    //   const postBody = User.encode({ name: 'Joe', age: 27 }).finish();
    //   await axios.post('http://localhost:3000/user', postBody).
    //     then(res => res.data);

    //   data = await axios.get('http://localhost:3000/user').then(res => res.data);
    //   // "After POST User { name: 'Joe', age: 27 }"
    //   console.log('After POST', User.decode(Buffer.from(data)));
}
