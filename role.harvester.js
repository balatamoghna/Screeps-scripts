
var roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep,num,roomid,origin) {
	    if(creep.store.getFreeCapacity() > 0 && creep.memory.exhausted==true) {
	        if(creep.room.name==roomid){
                if(!creep.harvest(Game.getObjectById(creep.memory.source))==ERR_NOT_IN_RANGE || !creep.memory.source){
	        if(!creep.memory.harvesting){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[num%sources.length])==OK) creep.memory.harvesting=true;
            if(creep.harvest(sources[num%sources.length]) == ERR_NOT_IN_RANGE) {
                if(roomid==origin)
                creep.moveTo(sources[num%sources.length], {visualizePathStyle: {stroke: '#ffaa00'},reusePath: true});
                else creep.moveTo(sources[num%sources.length], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say("Harvest:"+(num%sources.length));
            }}
            else{
                var sources=creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(sources)==ERR_NOT_IN_RANGE){
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'},noPathFinding: true});
                }
                creep.say("Harvest");
                if(creep.harvest(sources==OK)){
                    creep.memory.source=sources.id;
                }
            }
        }else{
            creep.moveTo(Game.getObjectById(creep.memory.source),{visualizePathStyle: {stroke: '#ffaa00'}})
            if(creep.harvest(Game.getObjectById(creep.memory.source))==OK){
                creep.memory.harvesting=true;
            }
        }
        } //CREEP ROOM CHECK
        else{ 
                
                creep.moveTo(new RoomPosition(25, 20, roomid));
            }
            
        }
        else {
            creep.memory.exhausted=false;
            if(creep.room.name==origin){
            creep.memory.harvesting=false;
            var targets= creep.room.find(FIND_MY_SPAWNS,{filter:i=>{return i.store.getFreeCapacity(RESOURCE_ENERGY)>0}})
            if(!targets[0])
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) >0;
                }});
            if(!targets[0])
            targets=creep.room.find(FIND_MY_STRUCTURES,{filter:i=>{return (i.structureType==STRUCTURE_STORAGE) && i.store.getFreeCapacity(RESOURCE_ENERGY)>0}})
            if(!targets[0])
            targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) >0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff',reusePath: true,noPathFinding:true}});
                }
            }
            if(creep.store[RESOURCE_ENERGY]==0) creep.memory.exhausted=true;
        }else{
            
            creep.moveTo(new RoomPosition(25, 20, origin),{reusePath:true});
        }
            
        }
    },
    assign:function(creep){
        creep.memory.origin=creep.room.name
        creep.memory.roomid=creep.room.name
        creep.memory.exhausted=true;
        
    }
};

module.exports = roleHarvester;