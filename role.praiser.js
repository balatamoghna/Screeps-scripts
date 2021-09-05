var rolePraise = {
    run: function(creep){
    if(!creep.memory.upgrading && creep.store.getFreeCapacity()>0){

        const src = creep.room.find(FIND_SOURCES);

        if( creep.harvest(src[0]) == ERR_NOT_IN_RANGE)
        creep.moveTo(src[0]);
    }
    else{
        creep.memory.upgrading=true;
        if(creep.store[RESOURCE_ENERGY]==0)
        creep.memory.upgrading=false;
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
        creep.moveTo(creep.room.controller);
    }


    }

}

module.exports =rolePraise