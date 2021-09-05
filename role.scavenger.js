var roleScavenger = {

    /** @param {Creep} creep **/
    run: function(creep,num) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.pos.findClosestByRange(FIND_TOMBSTONES);
            
            //console.log(sources);
            if(sources){
                creep.memory.harvesting=false;
                if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
                creep.say("Scavenge");
                }
            
            }else{
             var sources=creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES,{filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}})
              //console.log(sources);
              //console.log(creep.pickup(sources));
             if(sources){
                creep.memory.harvesting=false;
                if(creep.pickup(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
                creep.say("Scavenge");
                }
            }else{
                if(!creep.memory.harvesting){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0])==OK) creep.memory.harvesting=true;
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'},reusePath: true});
                creep.say("Hrvst");
            }}
            else{
                var sources=creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(sources)==ERR_NOT_IN_RANGE){
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'},reusePath: true});
                creep.say("Hrvsting");
                }
                
            }
            
            }}
        }
        else {
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType== STRUCTURE_CONTAINER || structure.structureType==STRUCTURE_STORAGE) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'},reusePath: true});
                }
            }
        }
	}
};

module.exports = roleScavenger;