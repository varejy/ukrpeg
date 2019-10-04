import React, { Component } from 'react';
import Content from '../../components/Content/Content';
import Companies from '../../components/Companies/Companies';
import Articles from '../../components/Articles/Articles';
import Carousel from '../../components/Carousel/Carousel';
import styles from './MainPage.css';
import classNames from 'classnames';

class MainPage extends Component {
    render () {
        return <section className={styles.mainPageContainer}>
            <div className={styles.gridContainer}>
                <div className={classNames(styles.column, styles.column1)}/>
                <div className={classNames(styles.column, styles.column2)}/>
                <div className={classNames(styles.column, styles.column3)}/>
                <div className={classNames(styles.column, styles.column4)}/>
                <div className={classNames(styles.column, styles.column5)}/>
            </div>
            <Carousel/>
            <Content />
            <Companies />
            <Articles />
        </section>;
    }
}

export default MainPage;
