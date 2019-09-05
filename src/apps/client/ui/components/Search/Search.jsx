import React, { Component } from 'react';
import PropTypes from 'prop-types';

import propOr from '@tinkoff/utils/object/propOr';
import styles from './Search.css';
import getDateFormatted from '../../../../../../utils/getDateFormatted';

import { connect } from 'react-redux';
import setSearch from '../../../actions/setSearch';

const mapStateToProps = ({ application, news }) => {
    return {
        langMap: application.langMap,
        news: news.newsList,
        lang: application.lang,
        search: application.search
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setSearch: payload => dispatch(setSearch(payload))
    };
};

class Search extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired,
        news: PropTypes.array,
        lang: PropTypes.string
    };

    state = {
        inputValue: '',
        news: []
    }

    handleInputChange = event => {
        this.props.setSearch(event.target.value);
    }

    render () {
        const { langMap, news, lang, search } = this.props;
        const { inputZoom, inputValue } = this.state;
        const text = propOr('search', {}, langMap);

        return <div className={styles.search}>
            <div className={styles.wrapper}>
                <div className={styles.searchResults}>
                    <div className={styles.inputBlock}>
                        <div className={styles.searchField}>
                            <div className={styles.searchIconZoom}>
                                <img src='/src/apps/client/ui/components/Search/files/searchIcon.png' className={styles.searchIconImg} />
                            </div>
                            <input
                                value={search}
                                onChange={this.handleInputChange}
                                className={styles.inputZoom} />
                        </div>
                        <p className={styles.results}>{text.searchResults} {search}</p>
                    </div>
                    <div className={styles.totalResults}>
                        <h1 className={styles.title}>{text.title}</h1>
                        <div className={styles.amount}>14</div>
                        <div className={styles.amoutnPages}>
                            <p>{`${text.pages}:`}</p>
                        </div>
                        <div className={styles.amountNews}>
                            <p>{`${text.news}:`}</p>
                        </div>
                    </div>
                    <div className={styles.resultsPages}>
                        <h1 className={styles.resultTitle}>{text.resultPages}</h1>
                        <div className={styles.resultPagesList}>
                            {[''].map((item, i) => {
                                return (
                                    <p key={i} className={styles.resultPageItem}>RVV</p>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.resultsNews}>
                        <h1 className={styles.resultTitle}>{text.resultNews}</h1>
                        <div className={styles.resultNewsList}>
                            {news.map((item, i) => {
                                return (
                                    <div key={i} className={styles.resultNewsItem}>
                                        <h1 className={styles.date}>{getDateFormatted(item.date, lang)}</h1>
                                        <p className={styles.news}>{item.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
