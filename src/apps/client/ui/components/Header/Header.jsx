import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Header.css';
import { withRouter, matchPath } from 'react-router';

import { menu } from '../../../constants/routes';
import { Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import classNames from 'classnames';

import setLang from '../../../actions/setLang';
import setMenuOpen from '../../../actions/setMenuOpen';
import { EN, UA } from '../../../constants/constants';
import setActiveCategoryIndex from '../../../actions/setActiveCategoryIndex';

const mapStateToProps = ({ application }, ownProps) => {
    return {
        langMap: application.langMap,
        langRoute: application.langRoute,
        lang: application.lang,
        pathname: ownProps.location.pathname,
        burgerMenu: application.burgerMenu,
        newsCategories: application.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLang: payload => dispatch(setLang(payload)),
        setMenuOpen: payload => dispatch(setMenuOpen(payload)),
        setActiveCategoryIndex: payload => dispatch(setActiveCategoryIndex(payload))
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
        burgerMenu: PropTypes.bool.isRequired,
        newsCategories: PropTypes.array.isRequired,
        setActiveCategoryIndex: PropTypes.func.isRequired
    };

    static defaultProps = {
        langRoute: ''
    };

    constructor (...args) {
        super(...args);

        const { newsCategories } = this.props;

        const allNews = { texts: {
            en: { name: 'All news' },
            ua: { name: 'Всі новини' }
        } };
        const categoriesFull = [allNews, ...newsCategories];

        this.state = {
            burgerMenuOpen: false,
            newsCategoriesOpen: false,
            newsCategories: categoriesFull
        };
    }

    handleMenuClick = event => {
        const { burgerMenu, setMenuOpen } = this.props;
        this.setState({
            burgerMenuOpen: !this.state.burgerMenuOpen
        });

        setMenuOpen(!burgerMenu);
    };

    handleLangClick = (lang) => () => {
        this.props.setLang(lang);
    };

    componentWillReceiveProps (nextProps) {
        const { pathname, setMenuOpen } = this.props;
        if (nextProps.pathname !== pathname) {
            this.setState({
                burgerMenuOpen: false
            });
            setMenuOpen(false);
        }
    }

    handleLogoClick = event => {
        this.setState({
            burgerMenuOpen: false
        });
    };

    handleCategoriesOpen = event => {
        this.setState({
            newsCategoriesOpen: !this.state.newsCategoriesOpen
        });
    };

    handleMenuCategoryClick = (index) => () => {
        this.props.setActiveCategoryIndex(index);
        this.handleMenuClick();
        this.handleCategoriesOpen();
    };

    render () {
        const { langMap, langRoute, lang, pathname } = this.props;
        const { burgerMenuOpen, newsCategoriesOpen, newsCategories } = this.state;
        const menuItems = propOr('menu', {}, langMap);
        const text = propOr('header', {}, langMap);
        const defineMenuMode = matchPath(pathname, { path: '/:lang(en)?', exact: true });

        return <div className={styles.header}>
            <div className={styles.headBg}>
                <div className={!burgerMenuOpen ? styles.wrapper : styles.wrapperBurgerMenu}>
                    <Link to={`${langRoute}/`} className={styles.logoContainer} onClick={this.handleLogoClick}>
                        <img className={styles.img} src='/src/apps/client/ui/components/Header/files/logo.png' alt="РВВ"/>
                    </Link>
                    <nav className={!burgerMenuOpen ? styles.menu : styles.burgerMenuList}>
                        {menu.map((link, i) => {
                            return (
                                <div key={i}>
                                    <NavLink
                                        exact={link.exact}
                                        to={link.id !== 'news' && `${langRoute}${link.path}`}
                                        activeClassName={styles.activeLink}
                                        className={styles.link}
                                        onClick={link.id !== 'news' ? this.handleMenuClick : this.handleCategoriesOpen}
                                    >
                                        {menuItems[link.id]}
                                        {burgerMenuOpen && link.id === 'news' &&
                                    <img className={!newsCategoriesOpen ? styles.arrowBtnNews : styles.arrowBtnNewsUp}
                                        src='/src/apps/client/ui/components/Header/files/arrowDown.png'
                                        alt="arrowIcon"
                                    />
                                        }
                                    </NavLink>
                                    {
                                        (link.id === 'news' && newsCategoriesOpen) && <div className={styles.newsCategoriesList}> {
                                            newsCategories.map((link, j) => {
                                                return (
                                                    <NavLink
                                                        key={j}
                                                        exact={link.exact}
                                                        to={`${langRoute}/news`}
                                                        activeClassName={styles.activeLink}
                                                        className={classNames(styles.link, styles.newsLink)}
                                                        onClick={newsCategoriesOpen ? this.handleMenuCategoryClick(j) : undefined}
                                                    >
                                                        {link.texts[lang].name}
                                                    </NavLink>);
                                            })
                                        }
                                        </div>}
                                </div>
                            );
                        })}
                        <div className={!burgerMenuOpen ? styles.socialhidden : styles.social}>
                            <p className={styles.socialItem}>instagram</p>
                            <p className={styles.socialItem}>facebook</p>
                        </div>
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
                        <hr className={!burgerMenuOpen ? (defineMenuMode ? styles.menuLines : styles.menuLinesPages) : styles.menuLinesCross} />
                        <hr className={!burgerMenuOpen ? (defineMenuMode ? styles.menuLines : styles.menuLinesPages) : styles.menuLinesCross} />
                        <hr className={!burgerMenuOpen ? (defineMenuMode ? styles.menuLines : styles.menuLinesPages) : styles.menuLinesCross} />
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header));
