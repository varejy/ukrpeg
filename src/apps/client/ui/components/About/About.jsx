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
    state = {
        animation: false
    };

    static propTypes = {
        langMap: PropTypes.object.isRequired,
        lang: PropTypes.string.isRequired,
        about: PropTypes.array
    };

    static defaultProps = {
        about: []
    };

    componentDidMount () {
        setTimeout(() => {
            this.setState({
                animation: true
            });
        }, 0);
    }

    render () {
        const { langMap, lang, about } = this.props;
        const { animation } = this.state;
        const text = propOr('about', {}, langMap);

        return <div className={styles.about}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>{text.title}</h1>
                <div className={styles.content}>
                    {about.map((item, i) => {
                        return (
                            <div key={i} className={styles.contentBlock}>
                                { item.contentType === 'photo'
                                    ? <div data-animation="image" className={classNames(styles.img, {
                                        [styles.animated]: animation
                                    })}>
                                        <div className={styles.out}>
                                            <div className={styles.in}>
                                                <div className={classNames(styles.imgInner, {
                                                    [styles.animated]: animation
                                                })} data-animation="image">
                                                    <img className={styles.image} src={item.photo} alt='image'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
