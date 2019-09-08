import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './About.css';

import { connect } from 'react-redux';

const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap,
        lang: application.lang,
        about: application.about
    };
};

class About extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        lang: PropTypes.string.isRequired,
        about: PropTypes.array
    };

    static defaultProps = {
        about: []
    };

    render () {
        const { langMap, lang, about } = this.props;
        const text = propOr('about', {}, langMap);

        return <div className={styles.about}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>{text.title}</h1>
                <div className={styles.content}>
                    {about.map((item, i) => {
                        return (
                            <div key={i} className={styles.contentBlock}>
                                <img src={item.path} className={styles.img} />
                                <p className={styles.description}>{item.texts[lang].text}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps)(About);
