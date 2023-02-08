RandomString = async function() {
    return await Math.random().toString(36).substr(2,11);
}

module.exports = RandomString;