const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
    try{
      await client.connect();
      console.log("Conexion exitosa");
    }catch(err){
      console.log("Error en conexion");
    }
}
run();


module.exports = client.db("todo")