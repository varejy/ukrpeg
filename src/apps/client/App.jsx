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
import AboutPage from './ui/pages/AboutPage/AboutPage.jsx';
import ContactPage from './ui/pages/ContactPage/ContactPage.jsx';

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
                        <Route exact path='/:lang(en)?/news' render={this.renderComponent(AllNewsPage)} />
                        <Route exact path='/:lang(en)?/about' render={this.renderComponent(AboutPage)} />
                        <Route exact path='/:lang(en)?/contacts' render={this.renderComponent(ContactPage)} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </main>;
    }
}

export default withRouter(connect(mapStateToProps)(App));
