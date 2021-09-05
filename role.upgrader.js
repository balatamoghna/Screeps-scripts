var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!(creep.memory.upgrading))
        creep.memory.upgrading=false

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0 && (creep.name.includes(creep.memory.role) || !creep.name.includes("upgrader"))) {
            creep.memory.upgrading = false;
            creep.say('Transfer');
        }
        
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0 && (creep.name.includes(creep.memory.role) || !(creep.name.includes("upgrader")))) {
	        creep.memory.upgrading = true;
	        creep.say('Upgrade');
        }
        
	    if(creep.memory.upgrading) {
            
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            if(!(creep.memory.storage==0)){
                //console.log("Deleting from "+creep.name)
            var sources;
            sources=creep.room.find(FIND_STRUCTURES,{filter:i=>{return i.structureType==STRUCTURE_STORAGE && i.store[RESOURCE_ENERGY]>0 && i.store[RESOURCE_ENERGY]>(0.4*i.store.getCapacity())}});
            if(sources[0]) Game.spawns['Spawn1'].memory.upg=true;
            if(!sources[0])
            sources = creep.room.find(FIND_STRUCTURES,{filter:i=>{return (i.structureType==STRUCTURE_CONTAINER || i.structureType==STRUCTURE_STORAGE) && i.store[RESOURCE_ENERGY]>=(0.4*i.store.getCapacity())}});
            //sources = creep.room.find(FIND_SOURCES);
            if(Game.spawns['Spawn1'].memory.upg) sources=creep.room.find(FIND_STRUCTURES,{filter:i=>{return i.structureType==STRUCTURE_STORAGE && i.store[RESOURCE_ENERGY]>0 && i.store[RESOURCE_ENERGY]>0}});
            if(sources[0]){
                creep.memory.storage=sources[0].id;
                creep.memory.role="upgrader";
            if(creep.withdraw(sources[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else{
            creep.memory.role="harvester";
        }}
        else{
            var sources=creep.room.find(FIND_STRUCTURES,{filter:i=>{return i.id==creep.memory.storage && i.store[RESOURCE_ENERGY]>0}});
            if(!sources[0]){
            //console.log("Deleting from "+creep.name)
            creep.memory.storage=0;
        }
            if(sources[0]){
                creep.memory.storage=sources[0].id;
                creep.memory.role="upgrader";
            if(creep.withdraw(sources[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else{
            creep.memory.role="harvester";
        }

        }
        if(Game.spawns['Spawn1'].memory.upg){
            var sources=creep.room.find(FIND_STRUCTURES,{filter:i=>{return i.id==creep.memory.storage && i.store[RESOURCE_ENERGY]>0}});
            if(!sources[0]){
            //console.log("Deleting from "+creep.name)
            Game.spawns['Spawn1'].memory.upg=false;
        }
        }
        
        }
	}
};

module.exports = roleUpgrader;