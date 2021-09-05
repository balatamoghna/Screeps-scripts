var roleUpgrader=require('role.upgrader')

var roleBuilder={
    run: function(creep){
        if(Game.flags['build']!=undefined){
        if(!(creep.room.name==Game.flags['build'].pos.roomName)){creep.moveTo(new RoomPosition(10, 25, Game.flags['build'].pos.roomName))}
        else
        {
        if(creep.store.getFreeCapacity()>0 && !creep.memory.building && (creep.name.includes(creep.memory.role))){
            
            if(!creep.memory.harvesting){
           var container = creep.room.find(FIND_STRUCTURES,{filter:(i)=>{return (i.structureType==STRUCTURE_CONTAINER || i.structureType==STRUCTURE_STORAGE) && i.store[RESOURCE_ENERGY]>0}})
           if(!container[0]){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0])==OK) creep.memory.harvesting=true;
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'},reusePath: true});
                creep.say("Hrvst");
            }}else{
                if(creep.withdraw(container[0])==OK) creep.memory.harvesting=true;
                if(creep.withdraw(container[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container[0], {visualizePathStyle: {stroke: '#ffaa00'},reusePath: true});
                }
            }
        }//HARVESTING CHECK
            else{
                var container=creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:(i)=>{return i.structureType==STRUCTURE_CONTAINER || i.structureType==STRUCTURE_STORAGE && i.store[RESOURCE_ENERGY]>0}});
                if(!container){
                var sources=creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(sources)==ERR_NOT_IN_RANGE){
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'},reusePath: true});
                creep.say("Harvest");
                }}else{
                    if(creep.withdraw(container)==ERR_NOT_IN_RANGE){
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'},reusePath: true});
                        creep.say("Withdraw"); 
                }}
                
            }
            }else{
            
            creep.memory.harvesting=false;
            
             //console.log(creep.store[RESOURCE_ENERGY])
             if(creep.store[RESOURCE_ENERGY]==0){
             creep.memory.building=false;}
             
            
            
            var targets=creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length){
                
                creep.memory.role='builder'
                creep.say("Building");
                
                targets.sort(function(a,b){
                    a=a.progressTotal-a.progress;
                    b=b.progressTotal-b.progress;
                    return a-b});
                
                if(creep.build(targets[0])==ERR_NOT_IN_RANGE){
                creep.memory.building=true;
                creep.moveTo(targets[0],{visualizePathStyle: {stroke: '#ffaa00'},reusePath: true});
                }
                
                
                else{
                    var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'},reusePath: true});
                }
            }
            else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                    creep.moveTo(creep.room.controller);
                }
            }else{//CHANGE TO OTHER ROLES
            
            creep.memory.building=false;
            
            creep.memory.role="harvester";
            //creep.memory.role="upgrader";
            }
            
        }}
    }},
    
}


module.exports = roleBuilder;