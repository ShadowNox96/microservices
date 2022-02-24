const bcrypt = require('bcrypt');
const TABLA = 'auth';
const auth = require('../../../auth');
const { error } = require('../../../network/response');

module.exports = (injectedStore) => {
  let store = injectedStore; 

  if(!store) {
    store= require('../../../store/dummy');
  }

  const login = async (username, password) => {
    const data = await store.query(TABLA, { username: username});
    // Comparar si bycript me genera el mismo hash
    return bcrypt.compare(password, data.password).then(result => {
      console.log(result)
      if(result){
        return auth.signToken({...data})
      }else {
        throw error('Informacion invalida')
      }
    })
    
  }

  const upsert = async (data) => {
    const authData = {
      id: data.id
    }
    if(data.username){
      authData.username = data.username
    }

    if(data.password) {
      authData.password = await bcrypt.hash(data.password, 5)
    }

    const flag = await store.get(TABLA, authData.id);

    if(flag.length > 0){
      authData.flag = false;
    }else {
      authData.flag = true;
    }
    return store.upsert(TABLA, authData)
  }

  return {
    upsert, 
    login
  }
}