import React, { Component } from 'react';
import PropTypes from 'prop-types';

import media from './ui/hocs/media/media.jsx';
import lang from './ui/hocs/lang/lang.jsx';

import '../../../client/vendor';
import '../../css/main.css';

import Header from './ui/components/Header/Header.jsx';
import Helmet from './ui/components/Helmet/Helmet.jsx';
import Footer from './ui/components/Footer/Footer.jsx';
import MainPage from './ui/pages/MainPage/MainPage.jsx';
import AllNewsPage from './ui/pages/AllNewsPage/AllNewsPage.jsx';
import RVVPage from './ui/pages/RVVPage/RVVPage.jsx';
import NewsPage from './ui/pages/NewsPage/NewsPage.jsx';
import AboutPage from './ui/pages/AboutPage/AboutPage.jsx';
import ContactPage from './ui/pages/ContactPage/ContactPage.jsx';
import LawPage from './ui/pages/LawPage/LawPage.jsx';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import getLangRouteParts from './utils/getLangRouteParts';

import { DEFAULT_LANG } from './constants/constants';

import styles from './App.css';

const mapStateToProps = ({ application }) => {
    return {
        lang: application.lang,
        langRoute: application.langRoute,
        burgerMenu: application.burgerMenu
    };
};

@media
@lang
class App extends Component {
    static propTypes = {
        lang: PropTypes.string,
        langRoute: PropTypes.string,
        location: PropTypes.object,
        burgerMenu: PropTypes.bool.isRequired
    };

    static defaultProps = {
        langRoute: '',
        location: {}
    };

    componentWillReceiveProps (nextProps) {
        if (this.props.location !== nextProps.location) {
            window.scrollTo(0, 0);
        }

        if (nextProps.burgerMenu !== this.props.burgerMenu) {
            document.body.style.overflowY = nextProps.burgerMenu ? 'hidden' : 'auto';
        }
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
                <Helmet/>
                <Header/>
                <div className={styles.pageContent}>
                    <Switch>
                        <Route exact path='/:lang(en)?' render={this.renderComponent(MainPage)} />
                        <Route exact path='/:lang(en)?/rvv' render={this.renderComponent(RVVPage)} />
                        <Route exact path='/:lang(en)?/news' render={this.renderComponent(AllNewsPage)} />
                        <Route exact path='/:lang(en)?/news/:id' render={this.renderComponent(NewsPage)} />
                        <Route exact path='/:lang(en)?/about' render={this.renderComponent(AboutPage)} />
                        <Route exact path='/:lang(en)?/contacts' render={this.renderComponent(ContactPage)} />
                        <Route exact path='/:lang(en)?/laws' render={this.renderComponent(LawPage)} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </main>;
    }
}

export default withRouter(connect(mapStateToProps)(App));
