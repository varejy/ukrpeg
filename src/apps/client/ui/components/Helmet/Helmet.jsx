import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactHelmet from 'react-helmet';

import { connect } from 'react-redux';

import { matchPath, withRouter } from 'react-router-dom';
import find from '@tinkoff/utils/array/find';
import propOr from '@tinkoff/utils/object/propOr';

const NEWS_PATH = '/:lang(en)?/news/:id';
const STATIC_ROUTES = [
    { id: 'main', path: '/', exact: true },
    { id: 'about', path: '/about', exact: true },
    { id: 'news', path: '/news', exact: true },
    { id: 'rvv', path: '/rvv', exact: true },
    { id: 'laws', path: '/laws', exact: true },
    { id: 'contacts', path: '/contacts', exact: true }
];
const NOT_FOUND_META = {
    title: '404',
    description: '404',
    metaKeywords: '404'
};

const mapStateToProps = ({ application, news }) => {
    return {
        news: news.news,
        lang: application.lang
    };
};

class Helmet extends Component {
    static propTypes = {
        location: PropTypes.object,
        news: PropTypes.array,
        lang: PropTypes.string.isRequired
    };

    static defaultProps = {
        location: {},
        news: []
    };

    constructor (...args) {
        super(...args);

        this.state = {
            meta: this.getMeta()
        };
    }

    getMeta = (props = this.props) => {
        const { location: { pathname }, news, lang } = props;
        const meta = propOr('meta', {}, this.state);
        const newsPage = matchPath(pathname, { path: NEWS_PATH, exact: true });

        if (newsPage) {
            const article = find(article => article.id === newsPage.params.id, news);

            if (article) {
                return {
                    metaTitle: article.texts[lang].metaTitle,
                    metaDescription: article.texts[lang].metaDescription
                };
            }

            return meta;
        }

        return NOT_FOUND_META;
    };

    componentWillReceiveProps (nextProps) {
        const { location: { pathname }, news } = nextProps;

        if (this.props.location.pathname !== pathname || this.props.news !== news) {
            this.setState({
                meta: this.getMeta(nextProps)
            });
        }
    }

    render () {
        const { meta } = this.state;

        return <ReactHelmet>
            <title>{meta.metaTitle}</title>
            <meta name='metaDescription' content={meta.metaDescription} />
        </ReactHelmet>;
    }
}

export default withRouter(connect(mapStateToProps)(Helmet));
