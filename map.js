
var Map = function() {
    this.map = [];
};

Map.prototype.add = function(clientid, gameid) {
    this.map.push({client:clientid, game:gameid});
};

Map.prototype.remove = function(clientid) {
    var map = this.map;
    this.map.forEach(function(e,i) {
        if(e.client == clientid) {
            map.splice(i,1);
        }
    });
};

Map.prototype.isGameInUse = function(gameid) {
    this.map.forEach(function(e) {
        if(e.game == gameid) {
            return true;
        }
    });
    return false;
};

exports.Map = Map;
