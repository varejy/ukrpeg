import React, { Component } from 'react';
import PropTypes from 'prop-types';

import media from './ui/hocs/media/media.jsx';
import lang from './ui/hocs/lang/lang.jsx';

import '../../../client/vendor';
import '../../css/main.css';

import Header from './ui/components/Header/Header.jsx';
import Footer from './ui/components/Footer/Footer.jsx';
import MainPage from './ui/pages/MainPage/MainPage.jsx';
import AllNewsPage from './ui/pages/AllNewsPage/AllNewsPage.jsx';
import NewsPage from './ui/pages/NewsPage/NewsPage.jsx';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import getLangRouteParts from './utils/getLangRouteParts';

import { DEFAULT_LANG } from './constants/constants';

import styles from './App.css';

const mapStateToProps = ({ application }) => {
    return {
        lang: application.lang,
        langRoute: application.langRoute
    };
};

@media
@lang
class App extends Component {
    static propTypes = {
        lang: PropTypes.string,
        langRoute: PropTypes.string
    };

    static defaultProps = {
        langRoute: ''
    };

    renderComponent = Component => ({ match: { params: { lang: langUrl = DEFAULT_LANG }, path }, location: { pathname } }) => {
        if (typeof window === 'undefined') {
            return <Component />;
        }
        const { lang, langRoute } = this.props;
        const { routeWithoutLang } = getLangRouteParts(pathname);

        return lang === langUrl ? <Component /> : <Redirect to={`${langRoute}${routeWithoutLang}`} />;
    };

    render () {
        return <main>
            <div className={styles.page}>
                <Header/>
                <div className={styles.pageContent}>
                    <Switch>
                        <Route exact path='/:lang(en)?' render={this.renderComponent(MainPage)} />
                        <Route exact path='/news/:lang(en)?' render={this.renderComponent(AllNewsPage)} />
                        <Route exact path='/article/:lang(en)?' render={this.renderComponent(NewsPage)} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </main>;
    }
}

export default withRouter(connect(mapStateToProps)(App));
