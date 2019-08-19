import React, { Component } from 'react';
import styles from './AllNewsPage.css';
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

class AllNewsPage extends Component {
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
                                        <div className={classNames(!this.state.isClicked['tabNumber' + i]
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

export default AllNewsPage;
