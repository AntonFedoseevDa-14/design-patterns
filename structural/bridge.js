// logger

class Logger {
  static log = '';

  static add(msg) {
    Logger.log += msg + '\n';
  };

  static show() {
    console.log(Logger.log);
    Logger.log = '';
  };
}

// output devices

class Screen {
  click() {
    Logger.add("Screen select");
  };

  move() {
    Logger.add("Screen move");
  };

  drag() {
    Logger.add("Screen drag");
  };

  zoom() {
    Logger.add("Screen zoom in");
  };
};

class Audio {
  click() {
    Logger.add("Sound oink");
  };

  move() {
    Logger.add("Sound waves");
  };

  drag() {
    Logger.add("Sound screetch");
  };

  zoom() {
    Logger.add("Sound volume up");
  }
};

// input devices

class Gestures {
  constructor(output) {
    this.output = output; 
  }

  tap() {
    this.output.click();
  };

  swipe() {
    this.output.move();
  };

  pan() {
    this.output.drag();
  };
  
  pinch() {
    this.output.zoom();
  }
};

class Mouse {
  constructor(output) {
    this.output = output; 
  }

  click() {
    this.output.click();
  };

  move() {
    this.output.move();
  };

  down() {
    this.output.drag();
  };

  wheel() {
    this.output.zoom();
  };
};

var screen = new Screen();
var audio = new Audio();

var hand = new Gestures(screen);
var mouse = new Mouse(audio);

hand.tap();
hand.swipe();
hand.pinch();

mouse.click();
mouse.move();
mouse.wheel();

Logger.show();
