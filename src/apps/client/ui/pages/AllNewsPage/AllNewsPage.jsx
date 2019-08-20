import React, { Component } from 'react';
import styles from './AllNewsPage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import NewsContent from '../../components/NewsContent/NewsContent';
import PropTypes from 'prop-types';

const NEWS_CATEGORY_LIST = [
    {
        id: 'Всі новини',
        newsList: [
            {
                date: +new Date(2019, 7, 16),
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: +new Date(2019, 7, 17),
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: +new Date(2019, 7, 18),
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            }
        ]
    },
    {
        id: 'Укрaїна',
        newsList: [
            {
                date: +new Date(2019, 7, 16),
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: +new Date(2019, 7, 17),
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: +new Date(2019, 7, 18),
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            }
        ]
    },
    {
        id: 'Світ',
        newsList: [
            {
                date: +new Date(2019, 7, 16),
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: +new Date(2019, 7, 17),
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: +new Date(2019, 7, 18),
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            }
        ]
    }
];
const mapStateToProps = () => {
    return {
        news: NEWS_CATEGORY_LIST
    };
};

class AllNewsPage extends Component {
    static propTypes = {
        news: PropTypes.array.isRequired
    };

    static defaultProps = {
        news: []
    };

    constructor (...args) {
        super(...args);
        const { news } = this.props;

        const newsArr = news.map(newsCategory => {
            return { ...newsCategory, opened: false };
        });
        newsArr[0] = { ...newsArr[0], opened: true };

        this.state = {
            news: newsArr
        };
    }

    handleCategoryClick = i => () => {
        const { news } = this.props;
        const newNews = news.map(newsCategory => {
            return { ...newsCategory, opened: false };
        });
        newNews[i] = { ...newNews[i], opened: !news[i].opened };

        this.setState({
            news: newNews
        });
    };

    render () {
        const { news } = this.state;

        return <section className={styles.newsContainer}>
            <div className={styles.newsContentContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.rectangleGreen}/>
                    <div className={styles.title}>Останні оновлення</div>
                </div>
                <div className={styles.newsContent}>
                    <NewsContent />
                </div>
            </div>
            <div className={styles.newsMenuContainer}>
                <ul>
                    {
                        news.map((newsCategory, i) =>
                            <li key={i}>
                                <div className={styles.newsCategory} onClick={this.handleCategoryClick(i)}>
                                    <div className={styles.newsCategoryTitle}>
                                        <div className={classNames(!news[i].opened
                                            ? styles.rectangleGreenInvisible
                                            : styles.rectangleGreen)}
                                        />
                                        <div className={styles.categoryTitle}>{newsCategory.id}</div>
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
