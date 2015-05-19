
exports.generateGameId = function() {
    return Math.floor(1+Math.random() * 0x10000);
};