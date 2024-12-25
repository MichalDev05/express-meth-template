function formatData(data) {
    return {
        id: data.id,
        username: data.username,
        fullName: data.fullName

    };
}

module.exports = {
    formatData,
};