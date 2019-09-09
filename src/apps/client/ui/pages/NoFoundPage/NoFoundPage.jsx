import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './NoFoundPage.css';
import propOr from '@tinkoff/utils/object/propOr';
import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap
    };
};

class NoFoundPage extends Component {
  static propTypes = {
      langMap: PropTypes.object.isRequired
  };

  render () {
      const { langMap } = this.props;
      const text = propOr('noFoundPage', {}, langMap);

      return (
          <div className={styles.noFound}>
              <p className={styles.text}>404</p>
              <p>{text.desc}</p>
          </div>
      );
  }
}

export default connect(mapStateToProps)(NoFoundPage);
