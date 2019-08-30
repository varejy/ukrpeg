import React, { Component } from 'react';
import About from '../../components/About/About';
import styles from '../AboutPage/AboutPage.css';
import classNames from 'classnames';

class AboutPage extends Component {
    render () {
        return <section className={styles.AboutPageContainer}>
            <div className={styles.gridContainer}>
                <div className={classNames(styles.column, styles.column1)}/>
                <div className={classNames(styles.column, styles.column2)}/>
                <div className={classNames(styles.column, styles.column3)}/>
                <div className={classNames(styles.column, styles.column4)}/>
                <div className={classNames(styles.column, styles.column5)}/>
            </div>
            <About />
        </section>;
    }
}

export default AboutPage;
