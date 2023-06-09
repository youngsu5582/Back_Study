exports.isVaildSession = (request) => {
    if(request._id && request.name && request.email && request.phone)
        return true;
    return false;
}