import React, { Component } from 'react';

import media from './ui/hocs/media/media.jsx';

import '../../../client/vendor';
import '../../css/main.css';

import Header from './ui/components/Header/Header.jsx';
import Footer from './ui/components/Footer/Footer.jsx';
import MainPage from './ui/pages/MainPage/MainPage.jsx';

import { Switch, Route, withRouter } from 'react-router-dom';

import styles from './App.css';

@media
class App extends Component {
    render () {
        return <main>
            <div className={styles.page}>
                <Header/>
                <div className={styles.pageContent}>
                    <Switch>
                        <Route exact path='/' component={MainPage} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </main>;
    }
}

export default withRouter(App);
