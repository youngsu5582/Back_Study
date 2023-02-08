const { faker } = require('@faker-js/faker');
const url = require('url');
const memberDAO = require('../dao/member');
const postDAO = require('../dao/post');

exports.testingUser = async (req, res) => {
    const members = new Array();
    const seed = req.body.seed;

    faker.seed(seed);

    for (let i = 0; i < 100; i++) {
        // fake data 생성
        const email = faker.internet.email();
        const password = faker.internet.password();

        // 배열에 정보 저장
        const member = new Object();
        member.email = email;
        member.password = password;
        members.push(member);

        // 데이터베이스에 정보 저장
        await memberDAO.addMember(email, password);
    }

    res.send(members);
}

exports.testingPost = async (req, res) => {
    const posts = new Array();
    const seed = req.body.seed;

    faker.seed(seed);

    for (let i = 0; i < 100; i++) {
        // fake data 생성
        const title = faker.hacker.phrase();
        const content = faker.lorem.paragraph();
        const date = faker.date.past();
        const views = faker.datatype.number();
        const like_count = faker.datatype.number();

        const member = await memberDAO.findRandomMember();
        const memberId = member.memberId;

        // 배열에 정보 저장
        const post = new Object();
        post.title = title;
        post.content = content;
        post.date = date;
        post.views = views;
        post.like_count = like_count;
        post.memberId = memberId;
        posts.push(post);

        // 데이터베이스에 정보 저장
        await postDAO.addPost(title, content, date, views, like_count, memberId);
    }

    res.send(posts);
}

exports.list = async (req, res) => {
    var result;

    const querys = url.parse(req.url, true).query;
    const type = querys.type;
    const count = parseInt(querys.count);

    if (type == "most") {
        result = await postDAO.findPostMost(count);
    } else if (type == "recent") {
        result = await postDAO.findPostRecent(count);
    }

    res.send(result);

}

exports.search = async (req, res) => {
    var result;

    const querys = url.parse(req.url, true).query;
    const type = querys.type;
    const text = querys.text;

    if (type == "title") {
        result = await postDAO.findPostByTitle(text);
    } else if (type == "content") {
        result = await postDAO.findPostByContent(text);
    } else if (type == "writer") {
        result = await postDAO.findPostByWriter(text);
    }

    res.send(result);
}