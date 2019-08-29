import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Header.css';
import { withRouter } from 'react-router';

import { menu } from '../../../constants/routes';
import { Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import setLang from '../../../actions/setLang';
import setMenuOpen from '../../../actions/setMenuOpen';
import { EN, UA } from '../../../constants/constants';

const mapStateToProps = ({ application }, ownProps) => {
    return {
        langMap: application.langMap,
        langRoute: application.langRoute,
        lang: application.lang,
        pathname: ownProps.location.pathname,
        burgerMenu: application.burgerMenu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLang: payload => dispatch(setLang(payload)),
        setMenuOpen: payload => dispatch(setMenuOpen(payload))
    };
};

class Header extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        langRoute: PropTypes.string,
        lang: PropTypes.string.isRequired,
        setLang: PropTypes.func.isRequired,
        setMenuOpen: PropTypes.func.isRequired,
        pathname: PropTypes.string,
        burgerMenu: PropTypes.bool.isRequired
    };

    static defaultProps = {
        langRoute: ''
    };

    state = {
        burgerMenuOpen: false
    }

    handleMenuClick = event => {
        const { burgerMenu, setMenuOpen } = this.props;
        this.setState({
            burgerMenuOpen: !this.state.burgerMenuOpen
        });

        setMenuOpen(!burgerMenu);
    }

    handleLangClick = (lang) => () => {
        this.props.setLang(lang);
    }

    componentWillReceiveProps (nextProps) {
        const { pathname, setMenuOpen } = this.props;
        if (nextProps.pathname !== pathname) {
            this.setState({
                burgerMenuOpen: false
            });
            setMenuOpen(false);
        }
    }

    render () {
        const { langMap, langRoute, lang } = this.props;
        const { burgerMenuOpen } = this.state;
        const menuItems = propOr('menu', {}, langMap);
        const text = propOr('header', {}, langMap);

        return <div className={styles.header}>
            <div className={styles.headBg}>
                <div className={!burgerMenuOpen ? styles.wrapper : styles.wrapperBurgerMenu}>
                    <Link to={`${langRoute}/`} className={styles.logoContainer}>
                        <img className={styles.img} src='/src/apps/client/ui/components/Header/files/logo.png' alt='logo' />
                    </Link>
                    <nav className={!burgerMenuOpen ? styles.menu : styles.burgerMenuList}>
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
                        <div className={!burgerMenuOpen ? styles.toogleLang : styles.toogleLangBurgerMenu}>
                            <button onClick={this.handleLangClick(UA)} className={lang === UA ? styles.choosenLang : styles.lang}>УКР</button>
                            <p className={styles.verticalLine}>|</p>
                            <button onClick={this.handleLangClick(EN)} className={lang === EN ? styles.choosenLang : styles.lang}>ENG</button>
                        </div>
                    </div>
                    <div className={!burgerMenuOpen ? styles.burgerMenu : styles.burgerMenuOpen} onClick={this.handleMenuClick} >
                        <hr className={!burgerMenuOpen ? styles.menuLines : styles.menuLinesCross} />
                        <hr className={!burgerMenuOpen ? styles.menuLines : styles.menuLinesCross} />
                        <hr className={!burgerMenuOpen ? styles.menuLines : styles.menuLinesCross} />
                    </div>
                    <div className={!burgerMenuOpen ? styles.socialhidden : styles.social}>
                        <p className={styles.socialItem}>instagram</p>
                        <p className={styles.socialItem}>facebook</p>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header));
