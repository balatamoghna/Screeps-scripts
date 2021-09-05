var roleMelee= {
    run:function(creep,num){
        let target="Flag"+num;
        
        
        if(creep.room!=Game.flags[target].room){
        creep.moveTo(Game.flags[target], {visualizePathStyle: {stroke: '#ffaa00'}});}
        else{
        //creep.moveTo(Game.flags.Flag2)
        
        let target =creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:object => object.structureType=="invaderCore" || (object.structureType=="Tower" && !object.my)})
        if(!target)
        target =creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        //const target='7704ffbfe4afa60';
        //console.log(target);
       // if(creep.attack(target)==ERR_NOT_IN_RANGE){
            
         //   creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    //    }
           
        }
    }
}


module.exports = roleMelee;