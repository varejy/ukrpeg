import React, { Component } from 'react';
import Contact from '../../components/Contact/Contact';
import styles from './ContactPage.css';
import classNames from 'classnames';

class ContactPage extends Component {
    render () {
        return <section className={styles.contactPageContainer}>
            <div className={styles.gridContainer}>
                <div className={classNames(styles.column, styles.column1)}/>
                <div className={classNames(styles.column, styles.column2)}/>
                <div className={classNames(styles.column, styles.column3)}/>
                <div className={classNames(styles.column, styles.column4)}/>
                <div className={classNames(styles.column, styles.column5)}/>
            </div>
            <Contact />
        </section>;
    }
}

export default ContactPage;
