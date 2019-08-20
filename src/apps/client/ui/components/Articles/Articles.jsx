import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Articles.css';
import getDateFormatted from '../../../../../../utils/getDateFormatted';

import { connect } from 'react-redux';

const mapStateToProps = ({ application, news }) => {
    return {
        langMap: application.langMap,
        lang: application.lang,
        news: news.newsList
    };
};

class Articles extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        lang: PropTypes.string,
        news: PropTypes.array
    };

    static defaultProps = {
        news: []
    };

    render () {
        const { langMap, lang, news } = this.props;
        const text = propOr('articles', {}, langMap);

        return <div className={styles.articles}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.title}>{text.title}</div>
                </div>
            </div>
            <div className={styles.wrapperArticles}>
                <div className={styles.news}>
                    {news.map((item, index) => {
                        return (
                            <div key={index} className={styles.newsBlock}>
                                <p className={styles.date}>{getDateFormatted(item.date, lang)}</p>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.buttons}>
                    <button className={styles.arrowBtn}>
                        <img className={styles.arrowBtnImg} src='/src/apps/client/ui/components/Articles/files/arrowUp.png' />
                    </button>
                    <button className={styles.arrowBtn}>
                        <img className={styles.arrowBtnImg} src='/src/apps/client/ui/components/Articles/files/arrowDown.png' />
                    </button>
                </div>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(Articles);
