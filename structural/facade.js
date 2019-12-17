class DatabaseService {
  write(data) {
    return Promise.resolve(data);
  }
}

class LoggerService {
  write(data) {
    return Promise.resolve(data);
  }
}

class QuotesService {
  constructor(props) {
    this.serviceLink = props.serviceLink;
    this.database = props.database;
    this.logger = props.logger;
  }

  downloadQuotes() {
    return fetch(`${this.link}/quotes`);
  }

  writeToDatabase(quotes) {
    return this.database.write(quotes);
  }

  logAction(action) {
    this.logger.write(action);
  }
}

class QuotesServiceFacade {
  constructor() {
    this.quotesService = new QuotesService({
      serviceLink: 'nasdaq.com',
      database: new DatabaseService(),
      logger: new LoggerService(),
    });
  } 

  getQuotes() {
    this.quotesService.downloadQuotes()
      .then(this.quotesService.writeToDatabase)
      .then(this.quotesService.logAction);
  }
}

const quotesService = new QuotesServiceFacade();

quotesService.getQuotes().then(quotes => console.log(quotes));
