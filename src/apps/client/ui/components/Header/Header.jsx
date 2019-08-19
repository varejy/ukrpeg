import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Header.css';

import { menu } from '../../../constants/routes';
import { Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import setLang from '../../../actions/setLang';
import { EN, UA } from '../../../constants/constants';

const mapStateToProps = ({ application }, ownProps) => {
    return {
        langMap: application.langMap,
        langRoute: application.langRoute,
        lang: application.lang
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLang: payload => dispatch(setLang(payload))
    };
};

class Header extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        langRoute: PropTypes.string,
        lang: PropTypes.string.isRequired,
        setLang: PropTypes.func.isRequired
    };

    static defaultProps = {
        langRoute: ''
    };

    handleLangClick = (lang) => () => {
        this.props.setLang(lang);
    }

    render () {
        const { langMap, langRoute, lang } = this.props;
        const menuItems = propOr('menu', {}, langMap);
        const text = propOr('header', {}, langMap);

        return <div className={styles.header}>
            <div className={styles.wrapper}>
                <Link to={`${langRoute}/`} className={styles.logoContainer}>
                    <img className={styles.img} src='/src/apps/client/ui/components/Header/files/logo.png' alt='logo' />
                </Link>
                <nav className={styles.menu}>
                    {menu.map((link, i) => {
                        return (
                            <NavLink
                                key={i}
                                exact={link.exact}
                                to={`${langRoute}${link.path}`}
                                activeClassName={styles.activeLink}
                                className={styles.link}>
                                {menuItems[link.id]}
                            </NavLink>
                        );
                    })}
                </nav>
                <div className={styles.tools}>
                    <p className={styles.phone}><a href={`tel:${text.phone}`}>{text.phone}</a></p>
                    <div className={styles.toogleLang}>
                        <button onClick={this.handleLangClick(UA)} className={lang === UA ? styles.choosenLang : null}>УКР</button>
                        <p className={styles.verticalLine}>|</p>
                        <button onClick={this.handleLangClick(EN)} className={lang === EN ? styles.choosenLang : null}>ENG</button>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header);
