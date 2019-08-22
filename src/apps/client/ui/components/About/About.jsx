import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './About.css';

import { connect } from 'react-redux';

const mapStateToProps = ({ application, about }) => {
    return {
        langMap: application.langMap,
        lang: application.lang,
        aboutInfo: about.aboutList
    };
};

class About extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        lang: PropTypes.string.isRequired,
        aboutInfo: PropTypes.array
    };

    static defaultProps = {
        aboutInfo: []
    };

    render () {
        const { langMap, lang, aboutInfo } = this.props;
        const text = propOr('about', {}, langMap);

        return <div className={styles.about}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>{text.title}</h1>
                <div className={styles.content}>
                    {aboutInfo.map((item, i) => {
                        return (
                            <div key={i} className={styles.contentBlock}>
                                <img src={item.img} className={styles.img} />
                                <p className={styles.description}>{item.text[`${lang}`]}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(About);
