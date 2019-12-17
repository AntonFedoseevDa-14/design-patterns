const SENTRY_URL = 'http://sentry-main-server.com';

class Sentry {
  _instance = null;

  constructor(params) {
    if (Sentry._instance) {
      return Sentry._instance;
    }

    this.token = params.token;
    this.environment = params.environment;
    this.userData = Sentry._userData || null;

    this.pingServer().then(this.identifySession);

    Sentry._instance = this;
  }

  static getInstance() {
    return Sentry._instance;
  }

  static createInstance(params) {
    this._instance = new Sentry(params);

    return this._instance();
  }

  pingServer() {
    fetch(`${SENTRY_URL}/ping`).catch(this.catchResponseError);
  }

  captureException(error) {
    fetch(`${SENTRY_URL}/log-error`, {
      method: 'POST',
      body: JSON.stringify(error),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(this.catchResponseError);
  }

  identifySession(userData) {
    if (this.userData) {
      return;
    }

    this.userData = userData;

    fetch(`${SENTRY_URL}/identify`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-type': 'application/json',
      },
    }).catch(this.catchResponseError);
  }

  catchResponseError() {
    throw new Error('Sentry service is unavailable');
  }
}

// methods for control

const init = params => {
  if (!Sentry.getInstance()) {
    Sentry.createInstance(params);
  }
};

const captureException = error => {
  if (Sentry.getInstance()) {
    Sentry.getInstance().captureException(error);
  }
};

const identifySession = userData => {
  if (!Sentry.getInstance()) {
    Sentry._userData = userData;
  } else if (!Sentry.getInstance().userData) {
    Sentry.getInstance().identifySession(userData);
  }
};

export default {
  captureException,
  identifySession,
  init,
};
