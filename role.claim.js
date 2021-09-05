var roleClaim={
    run:function(creep){
       
            creep.moveTo(new RoomPosition(9,44,"W4N8"));
     
        var controll=creep.room.find(FIND_STRUCTURES, {
    filter: function(structure) {
        return (structure.structureType == STRUCTURE_CONTROLLER);
    }
    });
    //console.log(creep.claimController(creep.room.controller))
    if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controll);
    }

    }}



module.exports = roleClaim;