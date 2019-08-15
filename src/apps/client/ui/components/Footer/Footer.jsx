import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Footer.css';
import { Link } from 'react-router-dom';
import { menu } from '../../../constants/routes';

import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap,
        langRoute: application.langRoute
    };
};

class Footer extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        langRoute: PropTypes.string.isRequired
    };

    static defaultProps = {
        langRoute: ''
    };

    render () {
        const { langMap, langRoute } = this.props;
        const menuItems = propOr('menu', {}, langMap);

        return <div className={styles.footer}>
            <div className={styles.content}>
                {menu.map((link, i) => {
                    return (
                        <Link
                            key={i}
                            to={`${langRoute}${link.path}`}
                            className={styles.link}>
                            {menuItems[link.id]}
                        </Link>
                    );
                })}
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(Footer);
