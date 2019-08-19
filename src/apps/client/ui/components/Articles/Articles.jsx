import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Articles.css';

import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap,
        lang: application.lang
    };
};

class Articles extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        lang: PropTypes.string
    };

    render () {
        const { langMap, lang } = this.props;
        const text = propOr('articles', {}, langMap);
        const news = [
            {
                ...text.articleContent[0].text[lang]
            },
            {
                ...text.articleContent[1].text[lang]
            },
            {
                ...text.articleContent[2].text[lang]
            }
        ];
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
                                <p className={styles.date}>{item.date}</p>
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
