import _ from 'lodash';
import React from 'react';

import config from 'config';

class CategoryList extends React.Component {
  getSeoCategories(seo) {
    const seoCategories = [];

    seoCategories.push(
        <div key="seo" className="category cell">
        <span className="category-name">
          <i className="fa fa-caret-right 3x"></i>
          Seo
        </span>
      </div>
    );

    seoCategories.push(
      <div key="search" className="section cell tk-bookmania">
        <span className="text">{seo.metrics.search.friendlyName}</span>
      </div>
    );

    _.each(seo.metrics.search.metrics, (metric, index) => {
      seoCategories.push(
        <div key={metric.friendlyName} className="item cell tk-bookmania">
          <span className="text">{metric.friendlyName}</span>
        </div>
      );
    });

    seoCategories.push(
      <div key="links" className="section cell tk-bookmania">
        <span className="text">{seo.metrics.links.friendlyName}</span>
      </div>
    );
    _.each(seo.metrics.links.metrics, (metric) => {
      seoCategories.push(
        <div key={metric.friendlyName} className="item cell tk-bookmania">
          <span className="text">{metric.friendlyName}</span>
        </div>
      );
    });

    seoCategories.push(
      <div key="security" className="section cell tk-bookmania">
        <span className="text">{seo.metrics.security.friendlyName}</span>
      </div>
    );
    _.each(seo.metrics.security.metrics, (metric, index) => {
      seoCategories.push(
        <div key={metric.friendlyName} className="item cell tk-bookmania">
          <span className="text">{metric.friendlyName}</span>
        </div>
      );
    });

    return seoCategories;
  }

  getMobileCategories(mobile) {
    const mobileCategories = [];

    mobileCategories.push(
      <div key="mobile" className="category cell">
        <span className="category-name">
          <i className="fa fa-caret-right 3x"></i>
          Mobile
        </span>
      </div>
    );

    _.each(mobile.rules, (rule) => {
      mobileCategories.push(
        <div key={rule.localizedRuleName} className="item cell tk-bookmania">
          <span className="text">{rule.localizedRuleName}</span>
        </div>
      );
    });

    return mobileCategories;
  }

  getDesktopCategories(desktop) {
    const desktopCategories = [];

    desktopCategories.push(
      <div key="desktop" className="category cell">
        <span className="category-name">
          <i className="fa fa-caret-right 3x"></i>
          Desktop
        </span>
      </div>
    );

    _.each(desktop.rules, (rule) => {
      desktopCategories.push(
        <div key={rule.localizedRuleName} className="item cell tk-bookmania">
          <span className="text">{rule.localizedRuleName}</span>
        </div>
      );
    });

    return desktopCategories;
  }

  getSocialCategories() {
    const socialCategories = [];

    socialCategories.push(
      <div key="social" className="category cell">
        <span className="category-name">
          <i className="fa fa-caret-right 3x"></i>
          Social
        </span>
      </div>
    );

    socialCategories.push(
      <div key="facebook" className="section cell tk-bookmania">
        <span className="text">Facebook</span>
      </div>
    );

    _.each(config.social.facebook, (item) => {
      socialCategories.push(
        <div key={`facebook-${item}`} className="item cell tk-bookmania">
          <span className="text">{item}</span>
        </div>
      );
    });

    socialCategories.push(
      <div key="twitter" className="section cell tk-bookmania">
        <span className="text">Twitter</span>
      </div>
    );

    _.each(config.social.twitter, (item) => {
      socialCategories.push(
        <div key={`twitter-${item}`} className="item cell tk-bookmania">
          <span className="text">{item}</span>
        </div>
      );
    });

    socialCategories.push(
      <div key="googleplus" className="section cell tk-bookmania">
        <span className="text">Google +</span>
      </div>
    );

    _.each(config.social.googleplus, (item) => {
      socialCategories.push(
        <div key={`googleplus-${item}`} className="item cell tk-bookmania">
          <span className="text">{item}</span>
        </div>
      );
    });

    socialCategories.push(
      <div key="pinterest" className="section cell tk-bookmania">
        <span className="text">Pinterest</span>
      </div>
    );

    _.each(config.social.pinterest, (item) => {
      socialCategories.push(
        <div key={`pinterest-${item}`} className="item cell tk-bookmania">
          <span className="text">{item}</span>
        </div>
      );
    });

    return socialCategories;
  }

  render() {
    const seoCategories = this.getSeoCategories(this.props.company.seo);
    const mobileCategories = this.getMobileCategories(this.props.company.mobile);
    const desktopCategories = this.getDesktopCategories(this.props.company.desktop);
    const socialCategories = this.getSocialCategories();
    return (
      <div key="list" className="category-list">
        {seoCategories}
        {mobileCategories}
        {desktopCategories}
        {socialCategories}
      </div>
    );
  }
}

CategoryList.propTypes = {
  company: React.PropTypes.object.isRequired
};

module.exports = CategoryList;