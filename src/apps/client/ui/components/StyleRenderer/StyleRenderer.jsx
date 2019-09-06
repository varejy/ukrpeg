import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './StyleRenderer.css';

import getInstagramTemplate from './utils/getInstagramTemplate';

export default class StyleRenderer extends Component {
    static propTypes = {
        html: PropTypes.string
    };

    static defaultProps = {
        html: ''
    };

    componentDidMount () {
        this.setInstagramPosts();
    }

    setInstagramPosts = () => {
        document.querySelectorAll('oembed[url]').forEach(element => {
            const url = element.getAttribute('url');

            if (url.indexOf('https://www.instagram.com') === 0) {
                element.innerHTML = getInstagramTemplate(url);
            }
        });

        window.instgrm.Embeds.process();
    };

    render () {
        return <span className={styles.style}>
            <div dangerouslySetInnerHTML={{ __html: this.props.html.replace(/\\/g, '') }}/>
        </span>;
    }
}
