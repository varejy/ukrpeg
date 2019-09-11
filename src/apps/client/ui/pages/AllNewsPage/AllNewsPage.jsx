import React, { Component } from 'react';
import styles from './AllNewsPage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import NewsContent from '../../components/NewsContent/NewsContent';
import PropTypes from 'prop-types';
import setActiveCategoryIndex from '../../../actions/setActiveCategoryIndex';
import propOr from '@tinkoff/utils/object/propOr';

const CATEGORY_HEIGHT = 52;
const mapStateToProps = ({ application, news }) => {
    return {
        news: news.news,
        langMap: application.langMap,
        lang: application.lang,
        categories: application.categories,
        activeCategoryIndex: application.activeCategoryIndex
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActiveCategoryIndex: payload => dispatch(setActiveCategoryIndex(payload))
    };
};

class AllNewsPage extends Component {
    static propTypes = {
        news: PropTypes.array.isRequired,
        langMap: PropTypes.object.isRequired,
        lang: PropTypes.string.isRequired,
        categories: PropTypes.array.isRequired,
        activeCategoryIndex: PropTypes.number.isRequired,
        setActiveCategoryIndex: PropTypes.func.isRequired
    };

    constructor (...args) {
        super(...args);

        this.state = this.getNewState(this.props);
    }

    componentWillReceiveProps (nextProps, nextContext) {
        if (this.props.activeCategoryIndex !== nextProps.activeCategoryIndex) {
            this.setState(this.getNewState(nextProps));
        }
    }

    getNewState = (props) => {
        const { news, categories, activeCategoryIndex } = props;
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

        return {
            mobileMenuListVisible: false,
            categories: categoriesArr,
            newsCategoryRendered: newsArr
        };
    };

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
        const { newsCategoryRendered, mobileMenuListVisible, categories } = this.state;
        const { langMap, lang, activeCategoryIndex } = this.props;
        const text = propOr('allNews', {}, langMap);

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
                    <NewsContent newsCategoryRendered={newsCategoryRendered}/>
                </div>
            </div>
            <div className={styles.newsMenuContainer}>
                <ul>
                    {
                        categories.map((newsCategory, i) =>
                            <li key={i}>
                                <div className={styles.newsCategory} onClick={this.handleCategoryClick(i)}>
                                    <div className={styles.newsCategoryTitle}>
                                        <div className={classNames(!categories[i].opened
                                            ? styles.rectangleGreenInvisible
                                            : styles.rectangleGreen)}
                                        />
                                        <div className={styles.categoryTitle}>{newsCategory.texts[lang].name}</div>
                                    </div>
                                </div>
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
                                </li>
                            )
                        }
                    </ul>
                }
            </div>
        </section>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNewsPage);
