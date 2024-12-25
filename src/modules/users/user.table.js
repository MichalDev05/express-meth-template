const columns = {
    _id: {
        title: "ID",
        width: 3
    },
    username: {
        title: "Username",
        width: 2
    },
    email: {
        title: "Email",
        width: 3
    },

};

function resource(user){
    return {
        _id: user._id,
        username: user.username,
        email: user.email
    }
}


module.exports = {columns, resource};