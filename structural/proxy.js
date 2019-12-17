class DatabaseService {
  write(message) {
    // write to database

    return new Promise(resolve => {
      setTimeout(() => {
        console.log(message);
        resolve();
      }, 2000);
    });
  }
}

class DatabaseServiceProxy {
  database = new DatabaseService();

  databaseBusy = false;

  queue = [];

  async write(entityObj) {
    if (!this.databaseBusy) {
      this.databaseBusy = true;

      await this.database.write(entityObj);

      this.databaseBusy = false;
    } else {
      this.queue.push(entityObj);
      return;
    }

    if (this.queue[0]) {
      const obj = this.queue.shift();

      this.write(obj);
    }
  }
}

const databaseProxy = new DatabaseServiceProxy();

databaseProxy.write('New message');

databaseProxy.write('Second message');

databaseProxy.write('Third message');
