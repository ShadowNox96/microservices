const axios = require("axios").default;

const createRemoteDB = (host, port) => {
  const URL = `http://${host}:${port}`;

  const list = (table) => {
    return req("GET", table);
  };

  const get = (table, id) => {
    return req("GET", table, '', id);
  };

  const upsert = (table, data) => {
    console.log('Upsert llegando ', table, data)
    if(data.flag){
      return req("POST", table, data);
    }else {
      return req("PUT", table, data);
    }
    
  };
  const query = (table, query, join) => {};

  const req = (method, table, data, params='') => {
    let url = URL + "/" + table+ '/'+params;
    let body;
    if(data){
      body = data;
    }else {
      body = ''
    }
    let requests;
    switch (method) {
      case 'GET':
        requests = axios.get(url,body);
        break;
      case 'POST':
        requests = axios.post(url,body);
        break;
      case 'PUT': 
        requests = axios.put(url,body);
        break;
      default:
        break;
    }
    return new Promise ((res, rej) => {
      
      requests.then(result => {
        console.log(result)
        // const resp = JSON.parse(result)
        return res(result.data.body)
      })
      .catch(err => {
        console.log("error con la base de datos remota", err);
            return rej(err.message);
      })
    })
      
  };
  return {
    list, 
    get, 
    upsert
  }
};


module.exports = createRemoteDB;