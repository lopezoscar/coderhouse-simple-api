"use strict";

var db = require("mongojs")("localhost/specialdom",["hotels"]);

function HotelsDB(){
    //TODO Agregar validation
    return {
        getHotels(params,cb){
            db.hotels.find({}).skip(params.offset).limit(params.limit,cb);
        }
    }
}

module.exports = new HotelsDB();

