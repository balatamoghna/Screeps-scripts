
var structTower={
    defendRoom:function (roomName) {
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
    },
    repairRoom:function(roomName){
        var structs=Game.rooms[roomName].find(FIND_STRUCTURES,{filter:i=>{return i.hits<(0.5*i.hitsMax) && (i.structureType!=STRUCTURE_WALL && i.structureType!=STRUCTURE_RAMPART)}})
        //console.log(Game.rooms[roomName].find(FIND_STRUCTURES),{filter:i=>{return i.hits<(i.hitsMax/2)}})
        if(structs[0]){
            var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower=>tower.repair(structs[0]));
        }
    }

    }
    
    module.exports= structTower;