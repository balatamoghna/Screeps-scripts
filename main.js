const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepair = require('role.repairer');
const roleScavenge = require('role.scavenger');
const roleMelee = require('role.melee');
const roleClaim = require('role.claim');
const rolePraise = require('role.praiser')
const structTower= require('tower');
const { forEach } = require('lodash');
let worked=false;
let priority=false;
module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('<font color=green>Clearing non-existing creep memory:', name);
        }
    }
    //Game.notify("Testing")
for(let i in Game.spawns) {
    if(Game.spawns[i].room.find(FIND_HOSTILE_CREEPS)[0]){
    structTower.defendRoom(Game.spawns[i].room.name);
    var towers = Game.rooms[Game.spawns[i].room.name].find(
        FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        if(_.filter(towers,tower=>tower.store[RESOURCE_ENERGY]==0)){
        //console.log("Hello");
        Game.notify("There's been an attack!")
        Game.spawns[i].room.controller.activateSafeMode();
    }

}
    else{
        structTower.repairRoom(Game.spawns[i].room.name);
    }
    
    
var hrt=_.filter(Game.creeps,(creep)=>creep.name.includes('harvester') && creep.memory.origin==Game.spawns[i].room.name);
//console.log(_.sum(Memory.creeps,creep=>true))
//console.log("<font color=red>Hello</font>")           //GIVE COLORS THIS WAY
//console.log(`<img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com"></img>`)                 //GIVE IMAGES THIS WAY LMAO
var harvestRoom=Game.spawns[i].room.name
let cInRoomTemp=_.filter(Game.creeps,(creep)=>(creep.memory.origin==Game.spawns[i].room.name || creep.memory.origin==Game.spawns[i].id) && (!creep.memory.roomid || creep.memory.roomid==Game.spawns[i].room.name));
let cInRoom=Game.spawns[i].room.find(FIND_MY_CREEPS)
//console.log(cInRoom.length)
//console.log(calcMaxEnergy(Game.spawns[i]))
//console.log(calcMaxEnergy(Game.spawns[i])==calcCreep(harvestCreep(calcMaxEnergy(Game.spawns[i]))))
//console.log(calcCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]))
//console.log(harvestCreep(calcMaxEnergy(Game.spawns[i]),1))
//console.log(upgradeCreep(calcMaxEnergy(Game.spawns[i])))
if(cInRoom.length>9 && false){
    //console.log("Hello")
    let W=Number(harvestRoom.substr(1,1));
    
    let N=Number(harvestRoom.substr(3,1));

    harvestRoom="W"+(W+1)+"N"+N;
    //console.log(harvestRoom)
}
if(hrt.length<3){
    priority=true;
    
    let newName='harvester_'+Game.time+"_"+(hrt.length+1);
    //console.log(harvestCreep(curEnergy(Game.spawns[i]),1))
    let spawned=Game.spawns[i].spawnCreep(harvestCreep(curEnergy(Game.spawns[i])),newName,{memory:{role:'harvester',origin:Game.spawns[i].room.name,roomid:Game.spawns[i].room.name}});
    //Game.spawns[i].spawnCreep(harvestCreep(curEnergy(Game.spawns[i])),newName,{memory:{role:'harvester',origin:Game.spawns[i].room.name,roomid:Game.spawns[i].room.name}})
    //console.log(spawned)
    if(spawned==0 && !(worked)){
    worked=true;
    console.log("<font color=cyan> New Harvester:"+newName+" is going to harvest from "+harvestRoom+"</font>")
    console.log("<font color=cyan>There are now a total of "+cInRoom.length+" number of creeps in "+Game.spawns[i].room.name+" room. There is a grand total of "+_.sum(Memory.creeps,creep=>true)+" creeps.")
    }
    if(worked && !spawned!=0) worked=false; 
}else priority=false;
if(!hrt.length){
    let newName='harvester_'+Game.time+"_"+(hrt.length+1);
    let spawned=Game.spawns[i].spawnCreep([WORK,CARRY,MOVE],newName,{memory:{role:'harvester',origin:Game.spawns[i].room.name,roomid:Game.spawns[i].room.name}});
    if(spawned==0 && !(worked)){
        worked=true;
        console.log("<font color=red> Auxiliary Harvester:"+newName+" has been deployed. Check your code!"+"</font>")
        console.log("<font color=red> Number of creeps in "+Game.spawns[i].room.name+" are "+cInRoom.length+" and creeps set to spawn room:"+Game.spawns[i].room.name+" are "+cInRoomTemp.length+"</font>")
        }
        if(worked && !spawned!=0) worked=false; 
}
if(!priority){
    var hrtL=_.filter(Game.creeps,(creep)=>creep.name.includes('LARGE_harvester') && creep.memory.origin==Game.spawns[i].room.name);
    if(curEnergy(Game.spawns[i])==calcMaxEnergy(Game.spawns[i]) && hrtL.length<1 && false){
        let newName='LARGE_harvester_'+Game.time+"_"+(hrtL.length+1);
        //console.log(harvestRoom)
        let spawned=Game.spawns[i].spawnCreep(harvestCreep(curEnergy(Game.spawns[i])),newName,{memory:{role:'harvester',origin:Game.spawns[i].room.name,roomid:Game.spawns[i].room.name}});
        if(spawned==0 && !(worked)){
        
        worked=true;
        console.log("<font color=gold> Spawning LargeHarvester:"+newName+" to harvest from "+Game.spawns[i].room.name+"</font>")
        console.log("<font color=gold>There are now a total of "+cInRoom.length+" number of creeps in "+Game.spawns[i].room.name+" room. There is a grand total of "+_.sum(Memory.creeps,creep=>true)+" creeps.")
        }
        if(worked && !spawned!=0) worked=false;    
    }
    var updrL=_.filter(Game.creeps,(creep)=>creep.name.includes('LARGE_upgrader') && creep.memory.origin==Game.spawns[i].room.name);
//console.log(curEnergy(Game.spawns[i])==calcMaxEnergy(Game.spawns[i]))
//console.log(updrL.length<2)
    if(curEnergy(Game.spawns[i])==calcMaxEnergy(Game.spawns[i]) && !updrL.length){
        let newName='LARGE_upgrader_'+Game.time+"_"+(updrL.length+1);
        console.log(harvestRoom)
        let spawned=Game.spawns[i].spawnCreep(upgradeCreep((curEnergy(Game.spawns[i])-250)),newName,{memory:{role:'upgrader',origin:Game.spawns[i].room.name}});
        if(spawned==0 && !(worked)){
        
        worked=true;
        console.log("<font color=gold> Spawning Modified LargeUpgrader:"+newName+" to build on "+Game.spawns[i].room.name+"</font>")
        console.log("<font color=gold>There are now a total of "+cInRoom.length+" number of creeps in "+Game.spawns[i].room.name+" room. There is a grand total of "+_.sum(Memory.creeps,creep=>true)+" creeps.")
        }
        if(worked && !spawned!=0) worked=false;    
    }

var bldr=_.filter(Game.creeps,(creep)=>creep.name.includes('builder'));
if(bldr.length<1){
    let newName='builder'+"_"+Game.time+"_"+(bldr.length+1);
    Game.spawns[i].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE],newName,{memory:{role:'builder',origin:Game.spawns[i].room}});
}
var updr=_.filter(Game.creeps,(creep)=>creep.name.includes('upgrader'));
if(updr.length<1){
    let newName='upgrader'+"_"+Game.time+"_"+(updr.length+1);
    Game.spawns[i].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],newName,{memory:{role:'upgrader',origin:Game.spawns[i].room}});
}
var rpr=_.filter(Game.creeps,(creep)=>creep.name.includes('repairer'));
if(rpr.length<2){
    let newName='repairer'+"_"+Game.time+"_"+(rpr.length+1);
    Game.spawns[i].spawnCreep([WORK,CARRY,CARRY,MOVE],newName,{memory:{role:'repairer',origin:Game.spawns[i].room}});
}
var scv=_.filter(Game.creeps,(creep)=>creep.name.includes('scavenger'));
if(scv.length<1){
    let newName='scavenger'+"_"+Game.time+"_"+(scv.length+1);
    Game.spawns[i].spawnCreep([WORK,CARRY,CARRY,MOVE],newName,{memory:{role:'scavenger',origin:Game.spawns[i].room}});
}
var praise=_.filter(Game.creeps,(creep)=>creep.name.includes('praiser'));
if(!praise.length){
    
    let newName='praiser'+"_"+Game.time+"_"+(praise.length+1);
    Game.spawns[i].spawnCreep([WORK,CARRY,CARRY,MOVE],newName,{memory:{role:'praiser',origin:Game.spawns[i].room}});
}
}

}

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        
        let num= name.substr(-1);
        
        if(name.includes('harvester') || (promoted(creep) && creep.memory.role=='harvester')) {
            //if(!creep.memory.origin) creep.memory.origin=Game.spawns.Spawn1.room.name;
            if(!(creep.memory.roomid)){
                roleHarvester.assign(creep);
            }
            else{
                roleHarvester.run(creep,num,creep.memory.roomid,creep.memory.origin);
            }
        }
        if(name.includes('upgrader') || (promoted(creep) && creep.memory.role=='upgrader')){
            //creep.memory.upgrading=false;
            roleUpgrader.run(creep);
        }
        if(name.includes('builder') || (promoted(creep) && creep.memory.role=='builder')){
            roleBuilder.run(creep);
        }
        if(name.includes('repairer') || (promoted(creep) && creep.memory.role=='repairer')){
            roleRepair.run(creep);
        }
        if(name.includes('scavenger') || (promoted(creep) && creep.memory.role=='scavenger')){
            roleScavenge.run(creep,num);
        }
        if(name.includes('melee') || (promoted(creep) && creep.memory.role=='melee')){
            roleMelee.run(creep,num);
        }
        if(name.includes('claimer') || (promoted(creep) && creep.memory.role=='claimer')){
            roleClaim.run(creep);
        }
        if(name.includes('praiser') || (promoted(creep) && creep.memory.role=='praiser')){
            rolePraise.run(creep);
        }
    }
    
    
    
    
}
    

    function promoted(creep){
        if(!creep.name.includes(creep.memory.role)) return true;
        else return false;
    }

    function calcMaxEnergy(spawn){
        return (spawn.room.find(FIND_MY_STRUCTURES,{filter:i=>{return i.structureType==STRUCTURE_EXTENSION}}).length*50)+300;
    }
    
    function curEnergy(spawn){
        let sum=0;
        let extensions=spawn.room.find(FIND_MY_STRUCTURES,{filter:i=>{return i.structureType==STRUCTURE_EXTENSION}});
        _.forEach(extensions,extension=>{sum+=extension.store[RESOURCE_ENERGY]});
        sum+=spawn.store[RESOURCE_ENERGY];
        return sum
    }

    function calcCreep(array){
        let sum=0;
        forEach(array,comp=>{
            if(comp==WORK) sum+=100;
            if(comp==MOVE) sum+=50;
            if(comp==CARRY) sum+=50;
            if(comp==ATTACK) sum+=80;
            if(comp==RANGED_ATTACK) sum+=150;
            if(comp==HEAL) sum+=250;
            if(comp==CLAIM) sum+=600;
            if(comp==TOUGH) sum+=10;
        })
        return sum;
    }

    function harvestCreep(energy,check){
        let p=energy/250;
        let z=energy/125;
        if((2*p+z)>50) z=energy/250;
        let arr=[];
        for(let i=0;i<(p-1);i++){
            arr.push(WORK)
            arr.push(CARRY)
        }
        for(let i=0;i<z;i++) arr.push(MOVE);
        if(!check)
        return arr;
        else return `There can be:\nNo. of WORK:${parseInt(p)}\nNo. of CARRY:${parseInt(p)}\nNo. of MOVE:${parseInt(z)}\n`
        
    }
    
    function upgradeCreep(energy,check){
        let x=energy/250;
        let z=energy/125;
        if((2*x+z)>50) z=energy/250;
        let arr=[];
        
        for(let i=0;i<(x);i++){
            arr.push(WORK)
            
            if(i%2==0){arr.push(CARRY)}
            else arr.push(WORK)
        }
        for(let i=0;i<(z/4);i++) arr.push(MOVE);
        if(!check)
        return arr;
        else return `There can be:\nNo. of WORK:${parseInt(x)}\nNo. of CARRY:${parseInt(x)}\nNo. of MOVE:${parseInt(z)}\n`
        
    }