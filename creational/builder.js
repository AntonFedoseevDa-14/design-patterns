class RequestBuilder {
  constructor() {
    this.verb = null;
    this.host = null;
    this.userName = null;
    this.password = null;
    this.scheme = null;
    this.path = null;
    this.port = null;
    this.query = null;
  }

  setVerb(verb) {
    this.verb = verb;
  }

  setHost(host) {
    this.host = host;
  }

  setUserName(userName) {
    this.userName = userName;
  }

  setPassword(password) {
    this.password = password;
  }

  setScheme(scheme) {
    this.scheme = scheme;
  }

  setPath(path) {
    this.path = path;
  }

  setPort(port) {
    this.port = port;
  }

  setQuery(query) {
    this.query = query;
  }
}

class Request {
  constructor(builder) {
    Object.assign(this, builder);
  }

  toString() {
    return `${this.Scheme}${this.Host}${this.Port}${this.Path}${this.Query}`;
  }
}

class RequestDirector {
  Builder = null;

  setBuilder(Builder) {
    this.Builder = Builder;
  }

  createUnauthRequest(props) {
    const builder = new this.Builder();

    builder
      .setVerb(props.verb)
      .setHost(props.host)
      .setScheme(props.scheme)
      .setPath(props.path)
      .setPort(props.path)
      .setQuery(props.query);

    return new Request(builder);
  }

  createAuthRequest(props) {
    const builder = new this.Builder();

    builder
      .setVerb(props.verb)
      .setHost(props.host)
      .setUserName(props.userName)
      .setPassword(props.setPassword)
      .setScheme(props.scheme)
      .setPath(props.path)
      .setPort(props.path)
      .setQuery(props.query);

    return new Request(builder);
  }
}

// usage

const requestInitialData = {
  // long list of data for request creation
};

const director = new RequestDirector();

director.setBuilder(RequestBuilder);

const request = director.createAuthRequest(requestInitialData);
