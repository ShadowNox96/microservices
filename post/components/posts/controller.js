
const TABLA = 'post'
module.exports = (injectedStore) => {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  const list = () => {
    return store.list(TABLA);
  };

  const get = (id) => {
    return store.get(TABLA, id);
  };

  const upsert = async ({ data }) => {
    // si no hay id es un insert
    let flagInsert = false;
    if (!data.id) {
      flagInsert = true;
    }
    const post = {
      title: data.title,
      user: data.user,
      flag: flagInsert,
    };

    if(data.id){
      post.id = data.id
    }

    return store.upsert(TABLA, post);
  };

 

  return {
    list,
    get, 
    upsert
    
  };
};
