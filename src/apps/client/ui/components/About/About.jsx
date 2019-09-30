import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import propOr from '@tinkoff/utils/object/propOr';
import getVideoId from 'get-video-id';

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
                                { item.contentType === 'photo'
                                    ? <img src={item.photo} className={styles.img} />
                                    : <div className={classNames(styles.img, styles.video)}>
                                        <div className={styles.iframeContainer}>
                                            <iframe
                                                className={styles.mainVideo}
                                                src={'https://www.youtube.com/embed/' + getVideoId(item.video).id}
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>}
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
