class MongoDBService {
  constructor(props = {}) {
    this.databaseLink = props.databaseLink;
  }

  connect() {
    // open connection through databaseLink
  }

  getItem() {
    // request item through conenction
  }

  setItem() {
    // add item through connection
  }
}

class MySQLService {
  constructor(props = {}) {
    this.databaseLink = props.databaseLink;
  }

  connect() {
    // open connection through databaseLink
  }

  getItem() {
    // request item through conenction
  }

  setItem() {
    // add item through connection
  }
}

class DatabaseService {
  createDatabase(databaseType, props) {
    switch(databaseType) {
      case 'mongodb':
        return new MongoDBService(props);
      case 'mysql':
        return new MySQLService(props);
    } 
  }
}

const databaseService = new DatabaseService();

const database = databaseService.createDatabase('mongodb', { databaseLink: 'localhost/my_database' });
