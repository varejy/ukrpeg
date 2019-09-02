import React, { Component } from 'react';
import styles from './NewsPage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getDateFormatted from '../../../../../../utils/getDateFormatted';
import { withRouter, matchPath, Link } from 'react-router-dom';
import find from '@tinkoff/utils/array/find';
import findIndex from '@tinkoff/utils/array/findIndex';
import propOr from '@tinkoff/utils/object/propOr';

const mapStateToProps = ({ application, news }) => {
    return {
        news: news.news,
        langRoute: application.langRoute,
        lang: application.lang,
        langMap: application.langMap,
        categories: application.categories
    };
};

class NewsPage extends Component {
    static propTypes = {
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

        this.state = this.getNewState(this.props);
    }

    getNewState = (props) => {
        const { location: { pathname }, news, langRoute, categories } = props;
        const PRODUCT_PATH = `${langRoute}/:news/:id`;
        const allNews = { texts: {
            en: { name: 'All news' },
            ua: { name: 'Всі новини' }
        } };
        const categoriesFull = [allNews, ...categories];
        const categoriesArr = categoriesFull.map(newsCategory => {
            return { ...newsCategory, opened: false };
        });
        categoriesArr[0].opened = true;
        const newsArr = news.filter(news => news.categoryId === categories[0].id);
        const match = matchPath(pathname, { path: PRODUCT_PATH, exact: true });
        const article = find(news => news.id === match.params.id, news);
        const articleIndex = findIndex(news => news.id === match.params.id, news);
        const nextArticle = newsArr[articleIndex + 1];

        this.notFoundPage = !article;

        return {
            article: article,
            articleId: match.params.id,
            nextArticle: nextArticle,
            categories: categoriesArr,
            newsCategoryRendered: news
        };
    };

    componentWillReceiveProps (nextProps, nextContext) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.setState(this.getNewState(nextProps));
        }
    }

    handleCategoryClick = i => () => {
        const { news } = this.props;
        const { categories } = this.state;
        const categoriesArr = categories.map(newsCategory => {
            return { ...newsCategory, opened: false };
        });
        categoriesArr[i].opened = true;
        const newsArr = news.filter(news => news.categoryId === categories[i].id);

        this.setState({
            categories: categoriesArr,
            newsCategoryRendered: i ? newsArr : news
        });
    };

    render () {
        const { newsCategoryRendered, article, categories, nextArticle } = this.state;
        const { langMap, lang, langRoute } = this.props;
        const text = propOr('news', {}, langMap);

        if (this.notFoundPage) {
            return <div className={styles.pageNotFound}>404</div>;
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
                    <div className={styles.newsCover}><img className={styles.coverImage} src={article.avatar} alt={article.texts[lang].name}/></div>
                    <div className={styles.news}>
                        <div className={styles.newsDate}>{getDateFormatted(article.date, 'ua')}</div>
                        <div className={styles.newsTitle}>{article.texts[lang].name}</div>
                        <div className={styles.newsText}>{article.texts[lang].description}</div>
                    </div>
                </div>
                <div className={styles.nextNews}>
                    <div className={styles.nextNewsInfo}>
                        <div className={styles.nextNewsHeader}>
                            <div className={styles.next}>{text.nextNews}</div>
                            <div className={styles.nextNewsDate}>{nextArticle ? getDateFormatted(nextArticle.date, 'ua') : ''}</div>
                        </div>
                        <div className={styles.nextNewsTitle}>{nextArticle ? nextArticle.texts[lang].name : 'Ця новина остання в цьому розділі'}</div>
                    </div>
                    {nextArticle
                        ? <Link key={nextArticle.id} to={`${langRoute}/news/${nextArticle.id}`}>
                            <div className={styles.nextNewsButton}>
                                <img className={styles.arrowIcon} src='/src/apps/client/ui/pages/NewsPage/images/downArrowGreen.png' alt='arrow'/>
                            </div>
                        </Link>
                        : <div className={classNames(styles.nextNewsButton, styles.nextNewsButtonDisabled)}>
                            <img className={styles.arrowIcon} src='/src/apps/client/ui/pages/NewsPage/images/downArrowBlack.png' alt='arrow'/>
                        </div>
                    }
                </div>
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
                                            <Link key={newsCard.id} to={`${langRoute}/news/${newsCard.id}`}>
                                                <li className={classNames(styles.newsCardContainer, {
                                                    [styles.newsCardContainerAnimated]: categories[i].opened
                                                })}
                                                key={j} style={{ transitionDelay: `${j * 0.2}s` }}>
                                                    <div className={styles.newsDate}>{getDateFormatted(newsCard.date, 'ua')}</div>
                                                    <div className={styles.newsTitle}>{newsCard.texts[lang].name}</div>
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
        </section>;
    }
}

export default withRouter(connect(mapStateToProps)(NewsPage));
