import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactHelmet from 'react-helmet';

import { connect } from 'react-redux';

import { matchPath, withRouter } from 'react-router-dom';
import find from '@tinkoff/utils/array/find';

const NEWS_PATH = '/:lang(en)?/news/:id';
const STATIC_ROUTES = [
    { id: 'main', path: '/:lang(en)?/', exact: true },
    { id: 'about', path: '/:lang(en)?/about', exact: true },
    { id: 'news', path: '/:lang(en)?/news', exact: true },
    { id: 'rvv', path: '/:lang(en)?/rvv', exact: true },
    { id: 'laws', path: '/:lang(en)?/laws', exact: true },
    { id: 'contacts', path: '/:lang(en)?/contacts', exact: true },
    { id: 'search', path: '/:lang(en)?/search', exact: true }
];
const NOT_FOUND_META = {
    seoTitle: '404',
    seoDescription: '404',
    seoKeywords: '404'
};
const DEFAULT_STATIC_META = {
    seoTitle: 'Рвв',
    seoDescription: 'Рвв',
    seoKeywords: 'Рвв'
};

const mapStateToProps = ({ application, news }) => {
    return {
        news: news.news,
        lang: application.lang,
        staticSeo: application.staticSeo
    };
};

class Helmet extends Component {
    static propTypes = {
        location: PropTypes.object,
        news: PropTypes.array,
        lang: PropTypes.string.isRequired,
        staticSeo: PropTypes.array
    };

    static defaultProps = {
        location: {},
        news: [],
        staticSeo: []
    };

    constructor (...args) {
        super(...args);

        this.state = {
            meta: this.getMeta()
        };
    }

    getMeta = (props = this.props) => {
        const { location: { pathname }, news, staticSeo, lang } = props;
        const newsPage = matchPath(pathname, { path: NEWS_PATH, exact: true });
        const staticRouteMatch = find(route => matchPath(pathname, route), STATIC_ROUTES);

        if (staticRouteMatch) {
            const staticSeoPage = find(page => page.name === staticRouteMatch.id, staticSeo);

            if (staticSeoPage) {
                return {
                    seoTitle: staticSeoPage.texts[lang].seoTitle,
                    seoDescription: staticSeoPage.texts[lang].seoDescription,
                    seoKeywords: staticSeoPage.texts[lang].seoKeywords
                };
            }

            return DEFAULT_STATIC_META;
        }

        if (newsPage) {
            const article = find(article => article.id === newsPage.params.id, news);

            if (article) {
                return {
                    seoTitle: article.texts[lang].seoTitle,
                    seoDescription: article.texts[lang].seoDescription,
                    seoKeywords: article.texts[lang].seoKeywords
                };
            }
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
            <title>{meta.seoTitle}</title>
            <meta name='description' content={meta.seoDescription} />
            <meta name='keywords' content={meta.seoKeywords} />
        </ReactHelmet>;
    }
}

export default withRouter(connect(mapStateToProps)(Helmet));
