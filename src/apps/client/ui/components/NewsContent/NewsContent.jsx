import React, { Component } from 'react';
import styles from './NewsContent.css';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import NewsCard from '../NewsCard/NewsCard';

const NEWS_CARDS_DATA = [
    {
        url: 'https://target.scene7.com/is/image/Target/GUEST_8a2d26bb-eb84-45ce-8066-0d4547d65641?wid=488&hei=488&fmt=pjpeg',
        date: '16 серпня 2019',
        title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
    },
    {
        url: 'https://target.scene7.com/is/image/Target/GUEST_8a2d26bb-eb84-45ce-8066-0d4547d65641?wid=488&hei=488&fmt=pjpeg',
        date: '16 серпня 2019',
        title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
    },
    {
        url: 'https://target.scene7.com/is/image/Target/GUEST_8a2d26bb-eb84-45ce-8066-0d4547d65641?wid=488&hei=488&fmt=pjpeg',
        date: '16 серпня 2019',
        title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
    },
    {
        url: 'https://target.scene7.com/is/image/Target/GUEST_8a2d26bb-eb84-45ce-8066-0d4547d65641?wid=488&hei=488&fmt=pjpeg',
        date: '16 серпня 2019',
        title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
    },
    {
        url: 'https://target.scene7.com/is/image/Target/GUEST_8a2d26bb-eb84-45ce-8066-0d4547d65641?wid=488&hei=488&fmt=pjpeg',
        date: '16 серпня 2019',
        title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
    },
    {
        url: 'https://target.scene7.com/is/image/Target/GUEST_8a2d26bb-eb84-45ce-8066-0d4547d65641?wid=488&hei=488&fmt=pjpeg',
        date: '16 серпня 2019',
        title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
    },
    {
        url: 'https://target.scene7.com/is/image/Target/GUEST_8a2d26bb-eb84-45ce-8066-0d4547d65641?wid=488&hei=488&fmt=pjpeg',
        date: '16 серпня 2019',
        title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
    }
];
const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap
    };
};

class NewsContent extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired
    };

    render () {
        return <div className={styles.newsCardsContainer}>
            {NEWS_CARDS_DATA.map((newsCard, i) =>
                <NewsCard key={i} cardData={newsCard}/>
            )}
        </div>;
    }
}

export default connect(mapStateToProps)(NewsContent);
