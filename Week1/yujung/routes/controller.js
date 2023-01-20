const fs = require('fs');

const parseCookies = ( cookie = '' ) => {
    return cookie
        .split(';')
        .map( v => v.split('=') )
        .map( ([k, ...vs]) => [k, vs.join('=')] )
        .reduce( (acc, [k,v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});
}

exports.getIndex = (req, res) => {
    fs.readFile("./views/index.html", "utf8", (err, buf) => {
        res.end(buf);
    });
};

exports.postIndex = (req, res) => {
    console.log("Listening on : " + process.env.PORT);
    console.log("Post Index!");
    res.json("hi Postman");
};

exports.cookie = (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    res.send(JSON.stringify(cookies));
};

exports.login = (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if(cookies['user'] == undefined){
        res.cookie('user', req.body.user);
        res.send("Cookie Set");
        return;
    }
    res.send("Hi " + cookies['user'])
}

exports.modify = (req, res) => {
    res.cookie(req.body.key, req.body.value);
    res.send("Modify Complete!");
}

exports.withdrawl = (req, res) => {
    res.clearCookie(req.body.key);
    res.send("Withdrawl!");
}