import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Header.css';
import { withRouter, matchPath } from 'react-router';

import { menu, subMenu } from '../../../constants/routes';
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
const MAIN_NEWS_LINK_HEIGHT = 81;
const mapStateToProps = ({ application }, ownProps) => {
    return {
        langMap: application.langMap,
        langRoute: application.langRoute,
        lang: application.lang,
        pathname: ownProps.location.pathname,
        burgerMenu: application.burgerMenu,
        newsCategories: application.categories,
        mediaWidth: application.media.width,
        mediaHeight: application.media.height
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
        mediaWidth: PropTypes.number.isRequired,
        mediaHeight: PropTypes.number.isRequired,
        location: PropTypes.object.isRequired
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
            lawsCategoriesOpen: false,
            newsCategories: categoriesFull,
            lawsHover: false
        };
    }

    handleLawsHover = () => {
        this.setState({ lawsHovered: true });
    };

    handleLawsBlur = () => {
        this.setState({ lawsHovered: false });
    };

    handleMenuClick = () => {
        const { burgerMenu, setMenuOpen } = this.props;
        this.setState({
            burgerMenuOpen: !this.state.burgerMenuOpen,
            newsCategoriesOpen: false,
            lawsCategoriesOpen: false
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
                burgerMenuOpen: false,
                newsCategoriesOpen: false
            });
            setMenuOpen(false);
        }
    }

    handleLogoClick = event => {
        this.setState({
            burgerMenuOpen: false,
            newsCategoriesOpen: false
        });
    };

    handleCategoriesOpen = event => {
        this.setState({
            newsCategoriesOpen: !this.state.newsCategoriesOpen
        });
    };

    handleLawsCategoriesOpen = event => {
        this.setState({
            lawsCategoriesOpen: !this.state.lawsCategoriesOpen
        });
    };

    handleMenuCategoryClick = (index) => () => {
        this.props.setActiveCategoryIndex(index);
        this.handleMenuClick();
        this.handleCategoriesOpen();
    };

    handleMenuLawsCategoryClick = () => {
        this.handleMenuClick();
        this.handleLawsCategoriesOpen();
    };

    handleMobileMenuLawsCategoryClick = () => {
        this.setState({ lawsHovered: false });
    };

    render () {
        const { langMap, langRoute, lang, pathname, mediaWidth, mediaHeight, location } = this.props;
        const { burgerMenuOpen, newsCategoriesOpen, lawsCategoriesOpen, newsCategories, lawsHovered } = this.state;
        const menuItems = propOr('menu', {}, langMap);
        const subMenuItems = propOr('subMenu', {}, langMap);
        const text = propOr('header', {}, langMap);
        const defineMenuMode = matchPath(pathname, { path: '/:lang(en)?', exact: true });
        const newsLinkHeight = mediaWidth > SMALL_MOBILE_WIDTH ? NEWS_LINK_BIG_HEIGHT : NEWS_LINK_SMALL_HEIGHT;
        const isLandscape = mediaWidth > mediaHeight;

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
                                    to={!burgerMenuOpen ? link.id !== 'laws' ? `${langRoute}${link.path}` : `${location.pathname}`
                                        : link.id !== 'news' && link.id !== 'laws' && `${langRoute}${link.path}`}
                                    activeClassName={!burgerMenuOpen &&
                                    link.id === 'laws' ? (location.pathname === `${langRoute}/laws/eu` || location.pathname === `${langRoute}/laws/ua`)
                                            ? styles.activeLink : '' : styles.activeLink}
                                    className={classNames(styles.link, {
                                        [styles.lawsLink]: link.id === 'laws' && !burgerMenuOpen
                                    })}
                                    onClick={burgerMenuOpen
                                        ? link.id === 'news' ? this.handleCategoriesOpen
                                            : link.id === 'laws' ? this.handleLawsCategoriesOpen
                                                : this.handleMenuClick : undefined}
                                    onMouseOver={link.id === 'laws' ? this.handleLawsHover : undefined}
                                    onMouseOut={link.id === 'laws' ? this.handleLawsBlur : undefined}
                                >
                                    <div className={styles.linkContainer}>
                                        {menuItems[link.id]}
                                        {burgerMenuOpen && (link.id === 'news' || link.id === 'laws') &&
                                    <img className={link.id === 'news' ? !newsCategoriesOpen ? styles.arrowBtnNews : styles.arrowBtnNewsUp
                                        : !lawsCategoriesOpen ? styles.arrowBtnNews : styles.arrowBtnNewsUp}
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
                                    <div className={classNames(styles.newsCategoriesList, {
                                        [styles.newsCategoriesListAnimated]: (lawsCategoriesOpen && link.id === 'laws')
                                    })}
                                    style={{ height: `${(lawsCategoriesOpen && link.id === 'laws') ? newsLinkHeight * subMenu.length : 0}px` }}
                                    > { link.id === 'laws' &&
                                    subMenu.map((link, n) => {
                                        return (
                                            <NavLink
                                                key={n}
                                                exact={link.exact}
                                                to={`${langRoute}${link.path}`}
                                                className={classNames(styles.newsLink, styles.newsLinkCategory, {
                                                    [styles.newsLinkCategoryAnimated]: lawsCategoriesOpen
                                                })}
                                                style={{ transitionDelay: `${n * 0.05}s` }}
                                                onClick={(lawsCategoriesOpen && burgerMenuOpen) ? this.handleMenuLawsCategoryClick : undefined}
                                            >
                                                {subMenuItems[link.id]}
                                            </NavLink>);
                                    })
                                        }
                                    </div>
                                    {
                                        (link.id === 'laws' && !burgerMenuOpen) && <div className={classNames(styles.subLinks, {
                                            [styles.subLinksVisible]: lawsHovered
                                        })}>
                                            {
                                                subMenu.map((subLink, k) =>
                                                    <NavLink
                                                        key={k}
                                                        exact={link.exact}
                                                        to={!burgerMenuOpen && `${langRoute}${subLink.path}`}
                                                        activeClassName=""
                                                        className={styles.subLink}
                                                        onClick={this.handleMobileMenuLawsCategoryClick}
                                                    >
                                                        {subMenuItems[subLink.id]}
                                                    </NavLink>
                                                )
                                            }
                                        </div>
                                    }
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
                        <hr className={!burgerMenuOpen ? (defineMenuMode ? styles.menuLines : styles.menuLinesPages) : styles.menuLinesCross} />
                        <hr className={!burgerMenuOpen ? (defineMenuMode ? styles.menuLines : styles.menuLinesPages) : styles.menuLinesCross} />
                        <hr className={!burgerMenuOpen ? (defineMenuMode ? styles.menuLines : styles.menuLinesPages) : styles.menuLinesCross} />
                    </div>
                    <div className={!burgerMenuOpen ? styles.socialhidden : styles.social}
                        style={{ bottom: `${isLandscape ? 0.7 * -MAIN_NEWS_LINK_HEIGHT * menu.length +
                                (newsCategoriesOpen ? -newsLinkHeight * newsCategories.length : 0)
                            : newsCategoriesOpen ? -newsLinkHeight * newsCategories.length : 0}px` }}
                    >
                        <a className={styles.socialItem} href='https://instagram.com'>instagram</a>
                        <a className={styles.socialItem} href='https://www.facebook.com/ukrpec/'>facebook</a>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header));
