import _ from 'lodash';
import PropTypes from 'prop-types';

import BaseModel from 'isomorphic/models/BaseModel';

export class AddressComponent extends BaseModel {
  constructor(props) {
    super(props);

    this.long_name = props.long_name;
    this.short_name = props.short_name;
    this.types = props.types;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      long_name: PropTypes.string.isRequired,
      short_name: PropTypes.string.isRequired,
      types: PropTypes.arrayOf(PropTypes.string).isRequired,
    };
  }
}

class Period extends BaseModel {
  constructor(props) {
    super(props);

    this.day = props.day;
    this.hours = props.hours;
    this.minutes = props.minutes;
    this.next_date = props.next_date;
    this.time = props.time;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      day: PropTypes.number.isRequired,
      hours: PropTypes.number.isRequired,
      minutes: PropTypes.number.isRequired,
      next_date: PropTypes.number,
      time: PropTypes.string.isRequired,
    };
  }
}

export class OpenClosePeriod extends BaseModel {
  constructor(props) {
    super(props);

    this.open = new Period(props.open);
    this.close = new Period(props.close);

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      open: PropTypes.instanceOf(Period).isRequired,
      close: PropTypes.instanceOf(Period).isRequired,
    };
  }
}

class Photo extends BaseModel {
  constructor(props) {
    super(props);

    this.height = props.height;
    this.width = props.width;
    this.photo_reference = props.photo_reference;
    this.html_attributions = props.html_attributions;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      photo_reference: PropTypes.string,
      html_attributions: PropTypes.arrayOf(PropTypes.string).isRequired,
    };
  }
}

class Review extends BaseModel {
  constructor(props) {
    super(props);

    this.author_name = props.author_name;
    this.author_url = props.author_url;
    this.language = props.language;
    this.profile_photo_url = props.profile_photo_url;
    this.rating = props.rating;
    this.relative_time_description = props.relative_time_description;
    this.text = props.text;
    this.time = props.time;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      author_name: PropTypes.string.isRequired,
      author_url: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      profile_photo_url: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      relative_time_description: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
    };
  }
}

class OpeningHours extends BaseModel {
  constructor(props) {
    super(props);

    this.open_now = props.open_now;
    this.periods = _.map(props.periods, (period) => new OpenClosePeriod(period));
    this.weekday_text = props.weekday_text;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      open_now: PropTypes.bool.isRequired,
      periods: PropTypes.arrayOf(PropTypes.instanceOf(OpenClosePeriod)).isRequired,
      weekday_text: PropTypes.arrayOf(PropTypes.string).isRequired,
    };
  }
}

class Geometry extends BaseModel {
  constructor(props) {
    super(props);

    this.location = props.location;
    this.viewPort = props.viewPort;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      location: PropTypes.shape({
        lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      }),
      viewPort: PropTypes.shape({
        east: PropTypes.string.isRequired,
        north: PropTypes.string.isRequired,
        south: PropTypes.string.isRequired,
        west: PropTypes.string.isRequired,
      }),
    };
  }
}

export default class GooglePlace extends BaseModel {
  constructor(props) {
    super(props);

    this.address_components = _.map(props.address_components, (ac) => new AddressComponent(ac));
    this.formatted_address = props.formatted_address;
    this.formatted_phone_number = props.formatted_phone_number;
    this.geometry = new Geometry(props.geometry);
    this.html_attributions = props.html_attributions;
    this.icon = props.icon;
    this.id = props.id;
    this.international_phone_number = props.international_phone_number;
    this.name = props.name;
    this.opening_hours = new OpeningHours(props.opening_hours);
    this.photos = _.map(props.photos, (photo) => new Photo(photo));
    this.place_id = props.place_id;
    this.price_level = props.price_level;
    this.rating = props.rating;
    this.reference = props.reference;
    this.reviews = _.map(props.reviews, (review) => new Review(review));
    this.scope = props.scope;
    this.types = props.types;
    this.url = props.url;
    this.utc_offset = props.utc_offset;
    this.vicinity = props.vicinity;
    this.website = props.website;

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      address_components: PropTypes.arrayOf(PropTypes.instanceOf(AddressComponent)),
      formatted_address: PropTypes.string.isRequired,
      formatted_phone_number: PropTypes.string.isRequired,
      geometry: PropTypes.instanceOf(Geometry).isRequired,
      html_attributions: PropTypes.arrayOf(PropTypes.string),
      icon: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      international_phone_number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      opening_hours: PropTypes.instanceOf(OpeningHours).isRequired,
      photos: PropTypes.arrayOf(PropTypes.instanceOf(Photo)).isRequired,
      place_id: PropTypes.string.isRequired,
      price_level: PropTypes.number,
      rating: PropTypes.number.isRequired,
      reference: PropTypes.string.isRequired,
      reviews: PropTypes.arrayOf(PropTypes.instanceOf(Review)).isRequired,
      scope: PropTypes.string.isRequired,
      types: PropTypes.arrayOf(PropTypes.string).isRequired,
      url: PropTypes.string.isRequired,
      utc_offset: PropTypes.number.isRequired,
      vicinity: PropTypes.string.isRequired,
      website: PropTypes.string,
    };
  }
}