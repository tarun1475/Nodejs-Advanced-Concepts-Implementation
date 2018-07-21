const mongoose = require('mongoose');
const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

 mongoose.Query.prototype.exec = function (){
 	console.log("About to..");

 const key =Object.assign({},this.getQuery(),{
 		collection: this.mongooseCollection.name
 	});
 console.log(key);

 	return exec.apply(this , arguments);
 }