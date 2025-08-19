const PERSISTENCE="MONGO"
let dao
if(PERSISTENCE=="FS"){
    dao=require("./daoFS.js").dao
}else{
    dao=require("./daoMongo.js").dao
}

console.log(dao)