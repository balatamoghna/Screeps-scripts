const { forEach } = require("lodash");

module.exports.commands={
    stats:function(){return `Currently, there are ${_.sum(Memory.creeps,creep=>true)} creeps.
Number of Spawns:${_.sum(Game.spawns,spawner=>true)}
The CPU stats are:${parseInt(Game.cpu.getUsed())} out of 100
Resources Available:${resources()}
Harvesters:${numbers("harvester")}
Upgraders:${numbers("upgrader")}
Repairer:${numbers("repairer")}
Builders:${numbers("builder")}
Scavengers:${numbers("scavenger")}
Praisers:${numbers("praiser")}
`
},

};

function resources(){
    let total=0;
    forEach(Game.spawns,spawn=>{
        _.forEach(spawn.room.find(FIND_MY_STRUCTURES,{filter:x=>{return x.store && x.store[RESOURCE_ENERGY]>0}}),x=>{total=total+x.store[RESOURCE_ENERGY]})
    })
    return total
    }
function numbers(role){
    let a=_.filter(Game.creeps,creep=>creep.memory.role==role).length
    return a
} 
    // 