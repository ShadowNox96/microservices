module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.SECRET || "notasecret",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "master",
    database: process.env.MYSQL_DATABASE || "backendtest",
  },
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT || 3001,
    host: process.env.MYSQL_SRV_HOST || "localhost",
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  cacheService: {
    port: process.env.MYSQL_SRV_PORT || 3003,
    host: process.env.MYSQL_SRV_HOST || "localhost",
  },
  redis: {
    host: "redis-11886.c91.us-east-1-3.ec2.cloud.redislabs.com",
    port: 11886,
    password: "GpXeJcOxYHRFntPPjZyiw3ZvcsiFTwRO",
  },
};
