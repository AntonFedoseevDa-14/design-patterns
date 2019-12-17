import Analytics from 'xml-analytics';

class Session {
  constructor(props) {
    this.userName = props.userName;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
  }

  setToDatabase() {
    const sessionJson = this.toJson();
    // setting session to database
  }

  toJson() {
    return JSON.stringify(this);
  }
}

class SessionXmlAdapter {
  constructor(sessionObj) {
    this.sessionObj = sessionObj;
  }

  toXml() {
    // transform session to XML
  }
}

const sessionObj = new Session({
  userName: 'Anton Fedoseev',
  startAt: new Date().setHours(8),
  endAt: new Date().setHours(12),
});

const sessionAdapter = new SessionXmlAdapter(sessionObj);

Analytics.send(sessionAdapter.toXml());
