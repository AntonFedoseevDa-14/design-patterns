class Flyweight {
  constructor(props) {
    this.radius = props.radius;
    this.type = props.type;
    this.color = props.color;
  }
}

class FlyweightFactory {
  static flyweights = {};

  static get(props) {
    const flyweights = FlyweightFactory.flyweights;
    const { raduis, type, color } = this.props;
    const identificator = `${raduis}${type}${color}`;

    if (!flyweights[identificator]) {
      flyweights[identificator] = new Flyweight(props);
    }

    return flyweights[identificator];
  };
}

class Star {
  constructor(props) {
    const { radius, type, color, positionX, positionY } = props;

    this.flyweight = FlyweightFactory.get({ radius, type, color });
    this.positionX = positionX;
    this.positionY = positionY;
  }
}

const star1 = new Star({
  radius: 15,
  type: 'dwarf',
  color: 'yellow',
  positionX: 10,
  positionY: 24,
});

const star2 = new Star({
  radius: 15,
  type: 'dwarf',
  color: 'yellow',
  positionX: 15,
  positionY: 53,
});

const star3 = new Star({
  radius: 15,
  type: 'dwarf',
  color: 'yellow',
  positionX: 63,
  positionY: 21,
});
