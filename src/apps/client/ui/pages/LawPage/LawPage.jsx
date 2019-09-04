import React, { Component } from 'react';
import Law from '../../components/Law/Law';
import styles from './LawPage.css';
import classNames from 'classnames';

class LawPage extends Component {
    render () {
        return <section className={styles.lawPageContainer}>
            <div className={styles.gridContainer}>
                <div className={classNames(styles.column, styles.column1)}/>
                <div className={classNames(styles.column, styles.column2)}/>
                <div className={classNames(styles.column, styles.column3)}/>
                <div className={classNames(styles.column, styles.column4)}/>
                <div className={classNames(styles.column, styles.column5)}/>
            </div>
            <Law />
        </section>;
    }
}

export default LawPage;
