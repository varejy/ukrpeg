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

const SMALL_MOBILE_WIDTH = 370;
const NEWS_LINK_BIG_HEIGHT = 40;
const NEWS_LINK_SMALL_HEIGHT = 28;
const mapStateToProps = ({ application }, ownProps) => {
    return {
        langMap: application.langMap,
        langRoute: application.langRoute,
        lang: application.lang,
        pathname: ownProps.location.pathname,
        burgerMenu: application.burgerMenu,
        newsCategories: application.categories,
        mediaWidth: application.media.width
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
        setActiveCategoryIndex: PropTypes.func.isRequired,
        mediaWidth: PropTypes.number.isRequired
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

    handleMenuClick = () => {
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
        const { langMap, langRoute, lang, pathname, mediaWidth } = this.props;
        const { burgerMenuOpen, newsCategoriesOpen, newsCategories } = this.state;
        const menuItems = propOr('menu', {}, langMap);
        const text = propOr('header', {}, langMap);
        const defineMenuMode = matchPath(pathname, { path: '/:lang(en)?', exact: true });
        const newsLinkHeight = mediaWidth > SMALL_MOBILE_WIDTH ? NEWS_LINK_BIG_HEIGHT : NEWS_LINK_SMALL_HEIGHT;

        return <div className={styles.header}>
            <div className={styles.headBg}>
                <div className={!burgerMenuOpen ? styles.wrapper : styles.wrapperBurgerMenu}>
                    <Link to={`${langRoute}/`} className={styles.logoContainer} onClick={this.handleLogoClick}>
                        <img className={styles.img} src='/src/apps/client/ui/components/Header/files/logo.png' alt="РВВ"/>
                    </Link>
                    <nav className={!burgerMenuOpen ? styles.menu : styles.burgerMenuList}>
                        {menu.map((link, i) => {
                            return (
                                <NavLink
                                    key={i}
                                    exact={link.exact}
                                    to={!burgerMenuOpen ? `${langRoute}${link.path}` : link.id !== 'news' && `${langRoute}${link.path}`}
                                    activeClassName={!burgerMenuOpen && styles.activeLink}
                                    className={styles.link}
                                    onClick={burgerMenuOpen ? link.id === 'news' ? this.handleCategoriesOpen : this.handleMenuClick : undefined}
                                >
                                    <div className={styles.linkContainer}>
                                        {menuItems[link.id]}
                                        {burgerMenuOpen && link.id === 'news' &&
                                    <img className={!newsCategoriesOpen ? styles.arrowBtnNews : styles.arrowBtnNewsUp}
                                        src='/src/apps/client/ui/components/Header/files/arrowDown.png'
                                        alt="arrowIcon"
                                    />
                                        }</div>
                                    <div className={classNames(styles.newsCategoriesList, {
                                        [styles.newsCategoriesListAnimated]: (newsCategoriesOpen && link.id === 'news')
                                    })}
                                    style={{ height: `${(newsCategoriesOpen && link.id === 'news') ? newsLinkHeight * newsCategories.length : 0}px` }}
                                    > { link.id === 'news' &&
                                            newsCategories.map((link, j) => {
                                                return (
                                                    <NavLink
                                                        key={j}
                                                        exact={link.exact}
                                                        to={`${langRoute}/news`}
                                                        className={classNames(styles.newsLink, styles.newsLinkCategory, {
                                                            [styles.newsLinkCategoryAnimated]: newsCategoriesOpen
                                                        })}
                                                        style={{ transitionDelay: `${j * 0.05}s` }}
                                                        onClick={(newsCategoriesOpen && burgerMenuOpen) ? this.handleMenuCategoryClick(j) : undefined}
                                                    >
                                                        {link.texts[lang].name}
                                                    </NavLink>);
                                            })
                                        }
                                    </div>
                                </NavLink>
                            );
                        })}
                        <div className={!burgerMenuOpen ? styles.socialhidden : styles.social}>
                            <a className={styles.socialItem} href='https://instagram.com'>instagram</a>
                            <a className={styles.socialItem} href='https://www.facebook.com/ukrpec/'>facebook</a>
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
