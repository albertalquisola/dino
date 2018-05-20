import _ from 'lodash';
import PropTypes from 'prop-types';

import BaseModel from 'isomorphic/models/BaseModel';

class Category extends BaseModel {
  constructor(props) {
    super(props);

    this.alias = props.alias;
    this.title = props.title;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      alias: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    };
  }
}

class Coordinates extends BaseModel {
  constructor(props) {
    super(props);

    this.latitude = props.latitude;
    this.longitude = props.longitude;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      latitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      longitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    };
  }
}

class OpenDetails extends BaseModel {
  constructor(props) {
    super(props);

    this.day = props.day;
    this.end = props.end;
    this.is_overnight = props.is_overnight;
    this.start = props.start;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      day: PropTypes.number.isRequired,
      end: PropTypes.string.isRequired,
      is_overnight: PropTypes.bool.isRequired,
      start: PropTypes.string.isRequired,
    };
  }
}

class Hours extends BaseModel {
  constructor(props) {
    super(props);

    this.hours_type = props.hours_type;
    this.is_open_now = props.is_open_now;
    this.open = _.map(props.open, (openDetails) => new OpenDetails(openDetails));

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      hours_type: PropTypes.string.isRequired,
      is_open_now: PropTypes.bool.isRequired,
      open: PropTypes.arrayOf(PropTypes.instanceOf(OpenDetails)),
    };
  }
}

class Location extends BaseModel {
  constructor(props) {
    super(props);

    this.address1 = props.address1;
    this.address2 = props.address2;
    this.address3 = props.address3;
    this.city = props.city;
    this.country = props.country;
    this.cross_streets = props.cross_streets;
    this.display_address = props.display_address;
    this.state = props.state;
    this.zip_code = props.zip_code;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      address1: PropTypes.string.isRequired,
      address2: PropTypes.string.isRequired,
      address3: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      cross_streets: PropTypes.string.isRequired,
      display_address: PropTypes.array.isRequired,
      state: PropTypes.string.isRequired,
      zip_code: PropTypes.string.isRequired,
    };
  }
}

export default class YelpPlace extends BaseModel {
  constructor(props) {
    super(props);

    this.alias = props.alias;
    this.categories = _.map(props.categories, (category) => new Category(category));
    this.coordinates = new Coordinates(props.coordinates);
    this.display_phone = props.display_phone;
    this.hours = _.map(props.hours, (hours) => new Hours(hours));
    this.id = props.id;
    this.image_url = props.image_url;
    this.is_claimed = props.is_claimed;
    this.is_closed = props.is_closed;
    this.location = new Location(props.location);
    this.name = props.name;
    this.phone = props.phone;
    this.photos = props.photos;
    this.price = props.price;
    this.rating = props.rating;
    this.review_count = props.review_count;
    this.transactions = props.transactions;
    this.url = props.url;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      alias: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.instanceOf(Category)).isRequired,
      coordinates: PropTypes.instanceOf(Coordinates).isRequired,
      display_phone: PropTypes.string.isRequired,
      hours: PropTypes.arrayOf(PropTypes.instanceOf(Hours)),
      id: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      is_claimed: PropTypes.bool.isRequired,
      is_closed: PropTypes.bool.isRequired,
      location: PropTypes.instanceOf(Location).isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      review_count: PropTypes.number.isRequired,
      transactions: PropTypes.array.isRequired,
      url: PropTypes.string.isRequired,
    };
  }
}