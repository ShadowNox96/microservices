const db = {
  'user': [
    {id: '1', name: 'Emanuel de la Cruz'}
  ]
}


const list = async (table) => {
  return db[table] || []
}

const get = async (table, id) => {
  let tableCollection = await list(table); 
  return tableCollection.filter( item => item.id === id)[0] || null;

}

const upsert = async (table, data) => {
  if(!db[table]){
    db[table]= []
  }
  await db[table].push(data);
  console.log(db)
}


const remove = async (tabla, id ) => {
  return true
}


const query = async (table, q) => {
  let col = await list(table);
  let keys = Object.keys(q);
  let key = keys[0];
  return col.filter(item => item[key] === q[key])[0] || null;

}

module.exports = {
  list,
  get, 
  upsert, 
  remove, 
  query
}