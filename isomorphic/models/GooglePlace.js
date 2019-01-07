import _ from 'lodash';
import PropTypes from 'prop-types';

import BaseModel from 'isomorphic/models/BaseModel';

export class AddressComponent extends BaseModel {
  constructor(props) {
    super();

    this.long_name = _.get(props, 'long_name');
    this.short_name = _.get(props, 'short_name');
    this.types = _.get(props, 'types');

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
    super();

    this.day = _.get(props, 'day');
    this.hours = _.get(props, 'hours');
    this.minutes = _.get(props, 'minutes');
    this.next_date = _.get(props, 'next_date');
    this.time = _.get(props, 'time');

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      day: PropTypes.number,
      hours: PropTypes.number,
      minutes: PropTypes.number,
      next_date: PropTypes.number,
      time: PropTypes.string,
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

    this.height = _.get(props, 'height');
    this.width = _.get(props, 'width');
    this.photo_reference = _.get(props, 'photo_reference');
    this.html_attributions = _.get(props, 'html_attributions');

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

    this.author_name = _.get(props, 'author_name');
    this.author_url = _.get(props, 'author_url');
    this.language = _.get(props, 'language');
    this.profile_photo_url = _.get(props, 'profile_photo_url');
    this.rating = _.get(props, 'rating');
    this.relative_time_description = _.get(props, 'relative_time_description');
    this.text = _.get(props, 'text');
    this.time = _.get(props, 'time');

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

    this.open_now = _.get(props, 'open_now', false);
    this.periods = props && props.periods ? _.map(props.periods, (period) => new OpenClosePeriod(period)) : [];
    this.weekday_text = _.get(props, 'weekday_text', null);

    super.checkPropTypes();
  }

  static get propTypes() {
    return {
      open_now: PropTypes.bool.isRequired,
      periods: PropTypes.arrayOf(PropTypes.instanceOf(OpenClosePeriod)).isRequired,
      weekday_text: PropTypes.arrayOf(PropTypes.string),
    };
  }
}

class Geometry extends BaseModel {
  constructor(props) {
    super();

    this.location = _.get(props, 'location');
    this.viewPort = _.get(props, 'viewPort');

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

  getTypes() {
    return _.join(this.types, ', ');
  }

  getCity() {
    const ac = _.find(this.address_components, (a) => _.includes(a.types, ['locality']));
    return _.get(ac, 'long_name', 'Unknown Location');
  }


  static get propTypes() {
    return {
      address_components: PropTypes.arrayOf(PropTypes.instanceOf(AddressComponent)),
      formatted_address: PropTypes.string.isRequired,
      formatted_phone_number: PropTypes.string,
      geometry: PropTypes.instanceOf(Geometry).isRequired,
      html_attributions: PropTypes.arrayOf(PropTypes.string),
      icon: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      international_phone_number: PropTypes.string,
      name: PropTypes.string.isRequired,
      opening_hours: PropTypes.instanceOf(OpeningHours).isRequired,
      photos: PropTypes.arrayOf(PropTypes.instanceOf(Photo)).isRequired,
      place_id: PropTypes.string.isRequired,
      price_level: PropTypes.number,
      rating: PropTypes.number,
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