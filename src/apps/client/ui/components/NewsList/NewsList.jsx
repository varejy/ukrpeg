import React, { Component } from 'react';
import styles from './NewsList.css';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

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
const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap
    };
};

class NewsList extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired
    };

    render () {
        const { index } = this.props;

        return <ul className={styles.categoryNewsList}>
            {
                NEWS_CATEGORY_LIST[index].newsList.map((news, i) =>
                    <li className={styles.newsCardContainer} key={i}>
                        <div className={styles.newsDate}>{news.date}</div>
                        <div className={styles.newsTitle}>{news.title}</div>
                    </li>
                )
            }
        </ul>;
    }
}

export default connect(mapStateToProps)(NewsList);
