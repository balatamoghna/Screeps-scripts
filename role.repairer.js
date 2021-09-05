var roleRepairing={
    run: function(creep){
        if(creep.store.getFreeCapacity()>0 && !creep.memory.repairing){
            var sources = creep.room.find(FIND_STRUCTURES,{filter:i=>{return i.structureType==STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY]>0}});
            if(sources[0]){
            if(creep.withdraw(sources[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }}
            else if(!sources[0])
            sources = creep.room.find(FIND_SOURCES)
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
        }else{
            creep.memory.repairing=true;
            
            if(creep.store[RESOURCE_ENERGY]==0)
            creep.memory.repairing=false;
            var towers = creep.room.find(FIND_STRUCTURES ,{
                filter: (structure) => {
                    return structure.structureType==STRUCTURE_TOWER && (structure.store[RESOURCE_ENERGY]<structure.store.getCapacity(RESOURCE_ENERGY)*0.7);
                }
                
        });
        //console.log(towers)
        if(!towers[0]){
            var targets = creep.room.find(FIND_STRUCTURES ,{
                    filter: (structure) => {
                        return structure.structureType==STRUCTURE_CONTAINER && structure.hits < (structure.hitsMax)
                    }
            });
            //if(!targets[0])
            
            targets=creep.room.find(FIND_STRUCTURES,{
                filter: structure =>{
                    return structure.structureType==STRUCTURE_WALL;
                }
            })
            //var targets=creep.room.find(FIND_MY_STRUCTURES, {filter:(i)=>{return (i.structureType==STRUCTURE_CONTAINER && (i.hitsMax>i.hits));}});
            
            
            
                if(targets){
                creep.say("Repairing");
                targets.sort(function(a,b){
                    return a.hits-b.hits;
                })
                if(creep.repair(targets[0])==ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }}}
                else{
                    if(towers[0]){
                        creep.say("Transfer");
                        if(creep.transfer(towers[0], RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                        creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }}

                }
                
            
            
        }
    }
}


module.exports = roleRepairing;