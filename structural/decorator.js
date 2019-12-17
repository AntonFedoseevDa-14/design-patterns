import nodemailer from 'nodemailer';
import { WebClient } from '@slack/web-api';
import facebookLogin from 'facebook-chat-api';

// email message service

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

// slack message service

const token = process.env.SLACK_TOKEN;
const slackChannelId = 'C1232456';

const web = new WebClient(token);

// facebook credentials

const facebookCredentials = {
  email: 'FB_EMAIL',
  password: 'FB_PASSWORD',
};

// event options

const mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// enabled notifiers

const slackEnabled = true;
const facebookEnabled = true;



class Notifier {
  constructor(props) {
    this.transporter = props.transporter;
  }

  send(options) {
    this.transporter.sendEmail(options);
  }
}

class SlackNotifier {
  constructor(notifierObj) {
    this.notifier = notifierObj;
  }

  send(options) {
    this.send(options);

    web.chat.postMessage({ channel: slackChannelId, text: options.text });
  }
}

class FacebookNotifier {
  constructor(notifierObj) {
    this.notifier = notifierObj;
  }

  send(options) {
    this.notifier.send(options);

    facebookLogin(facebookCredentials, (err, api) => {
      if(err) return console.error(err);

      const id = '315316421631';

      api.sendMessage(options.text, id);
    });
  }
}



let notifierObj = new Notifier(transporter);

if (slackEnabled) {
  notifierObj = new SlackNotifier(notifierObj);
}

if (facebookEnabled) {
  notifierObj = new FacebookNotifier(notifierObj);
}

notifierObj.send(mailOptions);
