import React, { Component } from 'react';
import styles from './NewsPage.css';
import classNames from 'classnames';
import NewsContent from '../../components/NewsContent/NewsContent';

const NEWS_CATEGORY_LIST = [
    {
        id: 'Всі новини',
        newsList: [
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            }
        ]
    },
    {
        id: 'Укрaїна',
        newsList: [
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            }
        ]
    },
    {
        id: 'Світ',
        newsList: [
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            }
        ]
    }
];

class NewsPage extends Component {
    constructor (...args) {
        super(...args);

        this.state = {
            isClicked: {}
        };
    }

    handleCategoryClick = i => () => {
        this.setState({
            isClicked: {
                ['tabNumber' + i]: !this.state.isClicked['tabNumber' + i]
            }
        });
    };

    renderNewsList = i => {
        return <ul className={styles.categoryNewsList}>
            {
                NEWS_CATEGORY_LIST[i].newsList.map((news, i) =>
                    <li className={styles.newsCardContainer} key={i}>
                        <div className={styles.newsDate}>{news.date}</div>
                        <div className={styles.newsTitle}>{news.title}</div>
                    </li>
                )
            }
        </ul>;
    };

    render () {
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
                        NEWS_CATEGORY_LIST.map((newsCategory, i) =>
                            <li key={i}>
                                <div className={styles.newsCategory} onClick={this.handleCategoryClick(i)}>
                                    <div className={styles.newsCategoryTitle}>
                                        <div className={styles.rectangleGreen}/>
                                        <div className={styles.categoryTitle}>{newsCategory.id}</div>
                                    </div>
                                    <div className={classNames(!this.state.isClicked['tabNumber' + i] ? styles.arrowButtonDown : styles.arrowButtonUp)}>
                                        ^
                                    </div>
                                </div>
                                {
                                    this.state.isClicked['tabNumber' + i] && this.renderNewsList(i)
                                }
                            </li>
                        )
                    }
                </ul>
            </div>
        </section>;
    }
}

export default NewsPage;
