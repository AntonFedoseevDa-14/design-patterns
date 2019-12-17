// database services

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

// exchange services

class NasdaqExchangeService {
  constructor(link) {
    this.link = link;
  }

  getQuotes() {
    return fetch(`${this.link}/quotes`);
  }
}

class SkyExchangeService {
  constructor(link) {
    this.link = link;
  }

  getQuotes() {
    return fetch(`${this.link}/quotes`);
  }
}

class UpdateQuoteServiceFactory {
  constructor(props) {
    const {
      DatabaseFactory,
      ExchangeFactory,
      databaseLink,
      exchangeLink,
    } = props;

    this.database = new DatabaseFactory(databaseLink);
    this.exchange = new ExchangeFactory(exchangeLink);
  }
}

const updateQuoteService = new UpdateQuoteServiceFactory({
  DatabaseFactory: MongoDBService,
  ExchangeFactory: NasdaqExchangeService,
  databaseLink: 'localhost/my_database',
  exchangeLink: 'nasdaq.com',
});

updateQuoteService.database.connect();

updateQuoteService.exchange.getQuotes()
  .then(quotes => updateQuoteService.database.setItem(quotes));
