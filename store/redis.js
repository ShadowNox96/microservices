//Todo lo de Redis
const redis = require("redis");
const config = require("../config");

let client;

const handleConnect = () => {
  client = redis.createClient({
    url: "redis://shadow:CEdlcr+3134@redis-11137.c16.us-east-1-3.ec2.cloud.redislabs.com:11137/#10898098",
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  client.connect();

  
};

handleConnect();

const list = async (table) => {
  const value = await client.get(table)
  return JSON.parse(value) || null;
};
const get = async (table, id) => {
  const value = await client.get(table) 
  return JSON.parse(value) || null;
};
const upsert = async (table, data) => {
  await client.set(table, JSON.stringify(data), {
    EX: 10,
    NX: true,
  });
  return true;
};

module.exports = {
  list,
  get,
  upsert,
};
