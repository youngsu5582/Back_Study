const User = require("../Schema/User");

exports.register = async(req,res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phone_number = req.body.phonenumber;

    const result = await User.exists({email: email})
    if(result) {
        res.json("이미 존재하는 이메일입니다.");
    }else {
        console.log("없음");
        const user = new User({
            name: name,
            email : email,
            password : password,
            phone_number : phone_number
        })
        user.save();
        res.json("회원가입 완료.");
    }
}

exports.getLogin = (req, res) => {
    res.render("login.ejs");
}

exports.postLogin = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email, password: password}).exec((err, result) => {
        console.log(result);
        if(result != null) {
            req.session._id = result._id;
            req.session.email = email;
            console.log("로그인 성공!");
            res.redirect('/');
        } else {
            console.log("존재하지 않는 회원정보 입니다.");
        }
    })
}

exports.home =  (req,res) => {
   
    res.render('main.ejs', {
        email : req.session.email,
        orderid : req.session._id
    });
}