
const nanoid = require("nanoid");
const auth = require("../auth");
const TABLA = "user";

module.exports = (injectedStore, injectedCache) => {
  let cache = injectedCache;
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }
  if (!cache) {
    cache = require("../../../store/dummy");
  }

  const list = async () => {
    let users = await cache.list(TABLA);
    if(!users){
      console.log('No estaba en cache')
      users = await store.list(TABLA)
      cache.upsert(TABLA, users)
    }else {
      console.log('Usuarios en cache')
    }
    return users
  };

  const get = (id) => {
    return store.get(TABLA, id);
  };

  const upsert = async (data) => {
    console.log(data)
    let id = null;
    // si no hay id es un insert
    let flagInsert = false;
    if (!data.id) {
      id = nanoid.nanoid();
      flagInsert = true;
    }
    const user = {
      id: data.id ? data.id : id,
      name: data.name,
      username: data.username,
      flag: flagInsert,
    };

    if (data.password || data.username) {
      await auth.upsert({
        id: user.id,
        username: data.username,
        password: data.password,
      });
    }
    return store.upsert(TABLA, user);
  };

  const follow = (from, to) => {
    return store.upsert(`${TABLA}_follow`, {
      user_from: from,
      user_to: to,
      flag: true,
    });
  };

  const followingList = (user) => {
    const join = {};
    join[TABLA] = "user_to"; // { user: 'user_to' }
    const query = { user_from: user };
    return  store.query(TABLA + "_follow", query, join);
  };

  return {
    list,
    get,
    upsert,
    follow,
    followingList,
  };
};
