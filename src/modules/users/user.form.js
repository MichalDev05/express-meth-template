const fields = {
    _id: {
        title: "ID",
        type: "text",
        editable: false
    },
    username: {
        title: "Username",
        type: "text",
        editable: true
    },
    email: {
        title: "Email",
        type: "email",
        editable: true
    },
    phone: {
        title: "Phone",
        type: "text",
        editable: true
    },
    isAdmin:{
        title: "Is Admin",
        type: "checkbox",
        editable: true
    },
};

function resource(user){
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,e
    }
}


module.exports = {fields, resource};