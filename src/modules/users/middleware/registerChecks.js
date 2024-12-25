function registerCheck(req, res, next) {

    next();
    return;

    const data = req.body;

    const username = data.username;
    const password = data.password;
    const email = data.email;
    const phone = data.phone;


    //TODO: check and desinfect data
    //username
    if(username == null || username == undefined || username == ""){
        res.status(400).json({status: 400, message: "Username is required"});
        return;
    }
    if (username.length < 8){
        res.status(400).json({status: 400, message: "Username must be at least 8 characters long"});
        return;
    }
    if (username.length > 20){
        res.status(400).json({status: 400, message: "Username must be at most 20 characters long"});
        return;
    }
    if (username.includes(" ")){
        res.status(400).json({status: 400, message: "Username must not contain spaces"});
        return;
    }
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)){
        res.status(400).json({status: 400, message: "Username must only contain letters and numbers"});
        return;
    }
    //password
    if(password == null || password == undefined || password == ""){
        res.status(400).json({status: 400, message: "Password is required"});
        return;
    }
    if (password.length < 8){
        res.status(400).json({status: 400, message: "Password must be at least 8 characters long"});
        return;
    }
    if (password.length > 20){
        res.status(400).json({status: 400, message: "Password must be at most 20 characters long"});
        return;
    }
    if (password.includes(" ")){
        res.status(400).json({status: 400, message: "Password must not contain spaces"});
        return;
    }

    //email
    if(email == null || email == undefined || email == ""){
        res.status(400).json({status: 400, message: "Email is required"});
        return;
    }
    //check if email is valid
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    if (!emailRegex.test(email)){
        res.status(400).json({status: 400, message: "Email is invalid"});
        return;
    }

    //phone
    if(phone == null || phone == undefined || phone == ""){
        res.status(400).json({status: 400, message: "Phone is required"});
        return;
    }
    //check if phone is valid
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone)){
        console.log(phone);
        res.status(400).json({status: 400, message: "Phone is invalid"});
        return;
    }


    next();
}

module.exports = registerCheck;