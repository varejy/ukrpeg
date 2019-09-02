import React, { Component } from 'react';
import styles from './AllNewsPage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import NewsContent from '../../components/NewsContent/NewsContent';
import PropTypes from 'prop-types';
import propOr from '@tinkoff/utils/object/propOr';

const mapStateToProps = ({ application, news }) => {
    return {
        news: news.news,
        langMap: application.langMap,
        lang: application.lang,
        categories: application.categories
    };
};

class AllNewsPage extends Component {
    static propTypes = {
        news: PropTypes.array.isRequired,
        langMap: PropTypes.object.isRequired,
        lang: PropTypes.string.isRequired,
        categories: PropTypes.array.isRequired
    };

    constructor (...args) {
        super(...args);
        const { news, categories } = this.props;
        const allNews = { texts: {
            en: { name: 'All news' },
            ua: { name: 'Всі новини' }
        } };
        const categoriesFull = [allNews, ...categories];
        const categoriesArr = categoriesFull.map(newsCategory => {
            return { ...newsCategory, opened: false };
        });
        categoriesArr[0].opened = true;

        this.state = {
            categories: categoriesArr,
            newsCategoryRendered: news
        };
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
        const { newsCategoryRendered, categories } = this.state;
        const { langMap, lang } = this.props;
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
        </section>;
    }
}

export default connect(mapStateToProps)(AllNewsPage);
