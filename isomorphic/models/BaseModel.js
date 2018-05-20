import PropTypes from 'prop-types';

export default class BaseModel {
  checkPropTypes() {
    if (!this.constructor.propTypes)
      throw new Error('prop types must be implemented for model');

    PropTypes.checkPropTypes(this.constructor.propTypes, this, 'prop', this.constructor.name);
  }
}