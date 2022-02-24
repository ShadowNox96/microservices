const mysql = require("mysql");

const config = require("../config");

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

// Connection
let connection;

const handleConnection = () => {
  connection = mysql.createConnection(dbConfig);

  connection.connect((error) => {
    if (error) {
      console.error("[dberror]", error);
      setTimeout(handleConnection, 2000);
    } else {
      console.log("DB Connected");
    }
  });
  connection.on("error", (err) => {
    console.error("[dberror]", error);
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      setTimeout(handleConnection, 2000);
    } else {
      throw err;
    }
  });
};

handleConnection();

const list = (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};
const get = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};
const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const update = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE  ${table} SET ? WHERE id = ?`,
      [data, data.id],
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
};

const query = (table, query, join) => {
  let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `INNER JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
};

const upsert = (table, data) => {
  // Si el flag es true es un insert
  if (data.flag) {
    delete data.flag
    return insert(table, data);
  } else {
    delete data.flag
    return update(table, data);
  }
};

module.exports = {
  list,
  get,
  upsert,
  update,
  query,
};
