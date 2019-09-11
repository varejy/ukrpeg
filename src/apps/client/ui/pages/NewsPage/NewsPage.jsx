import React, { Component } from 'react';
import styles from './NewsPage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getDateFormatted from '../../../../../../utils/getDateFormatted';
import { withRouter, matchPath, Link } from 'react-router-dom';
import find from '@tinkoff/utils/array/find';
import setActiveCategoryIndex from '../../../actions/setActiveCategoryIndex';
import findIndex from '@tinkoff/utils/array/findIndex';
import propOr from '@tinkoff/utils/object/propOr';
import StyleRenderer from '../../components/StyleRenderer/StyleRenderer';
import NoFoundPage from '../NoFoundPage/NoFoundPage.jsx';

const TABLET_WIDTH = 780;
const CATEGORY_HEIGHT = 58;
const DESKTOP_TOP = 235;
const MOBILE_TOP = 300;
const ANIMATION_DURATION = 700;

const mapStateToProps = ({ application, news }) => {
    return {
        news: news.news,
        langRoute: application.langRoute,
        lang: application.lang,
        langMap: application.langMap,
        categories: application.categories,
        mediaWidth: application.media.width,
        activeCategoryIndex: application.activeCategoryIndex
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActiveCategoryIndex: payload => dispatch(setActiveCategoryIndex(payload))
    };
};

class NewsPage extends Component {
    static propTypes = {
        mediaWidth: PropTypes.number.isRequired,
        activeCategoryIndex: PropTypes.number.isRequired,
        setActiveCategoryIndex: PropTypes.func.isRequired,
        news: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
        location: PropTypes.object.isRequired,
        langRoute: PropTypes.string,
        lang: PropTypes.string.isRequired,
        langMap: PropTypes.object.isRequired
    };

    static defaultProps = {
        langRoute: ''
    };

    constructor (...args) {
        super(...args);

        this.state = {
            ...this.getNewState(this.props),
            animation: false
        };
    }

    getNewState = (props) => {
        const { location: { pathname }, news, langRoute, categories, activeCategoryIndex } = props;
        const PRODUCT_PATH = `${langRoute}/:news/:alias`;
        const allNews = { texts: {
            en: { name: 'All news' },
            ua: { name: 'Всі новини' }
        } };
        const categoriesFull = [allNews, ...categories];
        const categoriesArr = categoriesFull.map(newsCategory => {
            return { ...newsCategory, opened: false };
        });
        categoriesArr[activeCategoryIndex].opened = true;
        const newsArr = activeCategoryIndex ? news.filter(news => news.categoryId === categoriesArr[activeCategoryIndex].id) : news;
        const match = matchPath(pathname, { path: PRODUCT_PATH, exact: true });
        const article = find(news => news.alias === match.params.alias, newsArr);
        const articleIndex = findIndex(news => news.alias === match.params.alias, newsArr);
        const nextArticle = newsArr[articleIndex + 1];

        this.notFoundPage = !article;

        return {
            article: article,
            mobileMenuListVisible: false,
            nextArticle: nextArticle,
            categories: categoriesArr,
            newsCategoryRendered: newsArr
        };
    };

    componentDidMount () {
        setTimeout(() => {
            this.setState({
                animation: true
            });
        }, 0);
    }

    componentWillReceiveProps (nextProps, nextContext) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.setState({
                animation: false
            }, () => {
                setTimeout(() => {
                    this.setState({
                        ...this.getNewState(nextProps),
                        animation: true
                    });
                }, ANIMATION_DURATION);
            });
        }
    }

    handleCategoryClick = i => () => {
        const { news, setActiveCategoryIndex } = this.props;
        const { categories } = this.state;
        const categoriesArr = categories.map(newsCategory => {
            return { ...newsCategory, opened: false };
        });
        categoriesArr[i].opened = true;
        const newsArr = i ? news.filter(news => news.categoryId === categoriesArr[i].id) : news;

        this.setState({
            mobileMenuListVisible: !this.state.mobileMenuListVisible,
            categories: categoriesArr,
            newsCategoryRendered: newsArr
        });

        setActiveCategoryIndex(i);
    };

    handleOpenMenuList = () => {
        this.setState({ mobileMenuListVisible: !this.state.mobileMenuListVisible });
    };

    render () {
        const { article, mobileMenuListVisible, newsCategoryRendered, categories, nextArticle, animation } = this.state;
        const { mediaWidth, activeCategoryIndex } = this.props;
        const isDesktop = mediaWidth > TABLET_WIDTH;
        const { langMap, lang, langRoute } = this.props;
        const text = propOr('news', {}, langMap);

        if (this.notFoundPage) {
            return <NoFoundPage />;
        }

        return <section className={styles.newsContainer}>
            <div className={styles.gridContainer}>
                <div className={classNames(styles.column, styles.column1)}/>
                <div className={classNames(styles.column, styles.column2)}/>
                <div className={classNames(styles.column, styles.column3)}/>
                <div className={classNames(styles.column, styles.column4)}/>
            </div>
            <div className={styles.newsContentContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.rectangleGreen}/>
                    <div className={styles.title}>{text.title}</div>
                </div>
                <div className={styles.newsContent}>
                    <div className={classNames(styles.newsCover)}
                        style={{ top: `${isDesktop ? DESKTOP_TOP : mobileMenuListVisible ? MOBILE_TOP + CATEGORY_HEIGHT * categories.length : MOBILE_TOP}px` }}>
                        <img className={classNames(styles.coverImage, {
                            [styles.coverImageAnimated]: animation
                        })} src={article.avatar} alt={article.texts[lang].name}/>
                    </div>
                    <div className={classNames(styles.news, {
                        [styles.newsAnimated]: animation
                    })}>
                        <div className={styles.newsDate}>
                            {getDateFormatted(article.date, lang)}
                        </div>
                        <div className={styles.newsTitle}>{article.texts[lang].name}</div>
                        <div className={styles.newsText}><StyleRenderer html={article.texts[lang].description}/></div>
                    </div>
                </div>
                {nextArticle &&
                <div className={styles.nextNews}>
                    <div className={styles.nextNewsBg}/>
                    <div className={styles.nextNewsInfo}>
                        <div className={styles.nextNewsHeader}>
                            <div className={styles.next}>{text.nextNews}</div>
                            <div className={styles.nextNewsDate}>{nextArticle ? getDateFormatted(nextArticle.date, lang) : ''}</div>
                        </div>
                        <div className={styles.nextNewsTitle}>{nextArticle ? nextArticle.texts[lang].name : 'Ця новина остання в цьому розділі'}</div>
                    </div>
                    <Link key={nextArticle.id} to={`${langRoute}/news/${nextArticle.alias}`}>
                        <div className={styles.nextNewsButton}>
                            <img className={styles.arrowIcon}
                                src={ isDesktop
                                    ? '/src/apps/client/ui/pages/NewsPage/images/downArrowGreen.png'
                                    : '/src/apps/client/ui/pages/NewsPage/images/downArrowBlack.png'
                                }
                                alt='arrow'/>
                        </div>
                    </Link>
                </div>
                }
            </div>
            <div className={styles.newsMenuContainer}>
                <ul>
                    {
                        categories.map((newsCategory, i) =>
                            <li key={i}>
                                <div className={styles.newsCategory} onClick={this.handleCategoryClick(i)}>
                                    <div className={styles.newsCategoryTitle}>
                                        <div className={styles.categoryTitle}>{newsCategory.texts[lang].name}</div>
                                    </div>
                                    <div className={classNames(!categories[i].opened ? styles.arrowButtonDown : styles.arrowButtonUp)}>
                                        <img
                                            className={styles.categoryArrowIcon}
                                            src='/src/apps/client/ui/pages/NewsPage/images/downArrowBlack.png'
                                            alt='arrow'
                                        />
                                    </div>
                                </div>
                                <ul className={classNames(styles.categoryNewsList, {
                                    [styles.categoryNewsListAnimated1x]: categories[i].opened && newsCategoryRendered.length === 1,
                                    [styles.categoryNewsListAnimated2x]: categories[i].opened && newsCategoryRendered.length === 2,
                                    [styles.categoryNewsListAnimated3x]: categories[i].opened && newsCategoryRendered.length >= 3
                                })}>
                                    {
                                        newsCategoryRendered.map((newsCard, j) =>
                                            <Link key={newsCard.id} to={`${langRoute}/news/${newsCard.alias}`}>
                                                <li className={classNames(styles.newsCardContainer, {
                                                    [styles.newsCardContainerActive]: newsCard.id === article.id,
                                                    [styles.newsCardContainerAnimated]: categories[i].opened
                                                })}
                                                key={j} style={{ transitionDelay: `${j * 0.2}s` }}
                                                onClick={this.handleNewsCardClick}>
                                                    <div className={styles.newsDateMenu}>{getDateFormatted(newsCard.date, lang)}</div>
                                                    <div className={styles.newsTitleMenu}>{newsCard.texts[lang].name}</div>
                                                </li>
                                            </Link>
                                        )
                                    }
                                </ul>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className={styles.newsMenuContainerMobile}>
                <div className={styles.mobileMenuContainer}>
                    <div className={styles.activeCategory}>{categories[activeCategoryIndex].texts[lang].name}</div>
                    <div className={classNames(styles.arrowButton, {
                        [styles.arrowButtonReverse]: mobileMenuListVisible
                    })} onClick={this.handleOpenMenuList}>
                        <img className={styles.arrow} src='/src/apps/client/ui/pages/NewsPage/images/downArrowGreen.png' alt='arrow'/>
                    </div>
                </div>
                {
                    <ul className={classNames(styles.categoriesList)}
                        style={{ height: `${!mobileMenuListVisible ? 0 : CATEGORY_HEIGHT * categories.length}px` }}>
                        {
                            categories.map((newsCategory, i) =>
                                <li key={i}>
                                    <Link key={newsCategory.texts[lang].name} to='/news'>
                                        <div className={classNames(styles.newsCategoryMobile, {
                                            [styles.newsCategoryMobileAnimated]: mobileMenuListVisible
                                        })}
                                        onClick={this.handleCategoryClick(i)}
                                        >
                                            <div className={styles.newsCategoryTitleMobile}
                                            >
                                                <div className={styles.categoryTitleMobile}>{newsCategory.texts[lang].name}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                }
            </div>
        </section>;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewsPage));
