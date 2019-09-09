import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import queryString from 'query-string';

import propOr from '@tinkoff/utils/object/propOr';
import getDateFormatted from '../../../../../../utils/getDateFormatted';
import { Link, withRouter } from 'react-router-dom';
import SearchInput from '../../components/SearchInput/SearchInput';

import { connect } from 'react-redux';
import searchByText from '../../../services/client/searchByText';

import styles from './SearchPage.css';

const mapStateToProps = ({ application, news }) => {
    return {
        langMap: application.langMap,
        langRoute: application.langRoute,
        news: news.news,
        lang: application.lang,
        search: application.search
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchByText: payload => dispatch(searchByText(payload))
    };
};

class SearchPage extends Component {
    static propTypes = {
        searchByText: PropTypes.func.isRequired,
        langMap: PropTypes.object.isRequired,
        lang: PropTypes.string,
        location: PropTypes.object,
        history: PropTypes.object.isRequired,
        langRoute: PropTypes.string
    };

    static defaultProps = {
        news: [],
        location: {}
    };

    state = {
        news: [],
        pages: []
    };

    constructor (props) {
        super(props);

        this.state = {
            news: [],
            pages: [],
            search: '',
            loading: true
        };
    }

    componentDidMount () {
        const { location: { search } } = this.props;
        const query = queryString.parse(search);

        this.searchByText(query.text)
            .then(() => {
                this.setState({
                    loading: false
                });
            });
    }

    searchByText (text) {
        return this.props.searchByText(text)
            .then(({ pages, news }) => {
                this.setState({
                    news,
                    pages,
                    searchedText: text
                });
            });
    }

    handleInputSubmit = inputValue => {
        if (inputValue) {
            const { langRoute } = this.props;

            this.searchByText(inputValue)
                .then(() => {
                    this.props.history.push(`${langRoute}/search?text=${inputValue}`);
                });
        }
    };

    render () {
        const { langMap, lang, langRoute } = this.props;
        const { news, pages, loading, searchedText } = this.state;
        const text = propOr('search', {}, langMap);
        const searchResultNumber = news.length + pages.length;

        if (loading) {
            return <div className={styles.loader}>
                <img src='/src/apps/client/ui/pages/SearchPage/files/loader.svg' alt='loader'/>
            </div>;
        }
        console.log(pages);
        return <section className={styles.search}>
            <div className={styles.wrapper}>
                <div className={styles.searchResults}>
                    <div className={styles.inputBlock}>
                        <SearchInput searchFieldClassName={styles.searchField} onSubmit={this.handleInputSubmit} />
                        <p className={styles.results}>{text.getSearchResultText(searchedText, searchResultNumber)}</p>
                    </div>
                    <div className={styles.totalResults}>
                        <h1 className={styles.title}>{text.title}</h1>
                        <div className={styles.amount}>{searchResultNumber}</div>
                        <div className={styles.amountPagesWrapper}>
                            <div className={styles.amountPages}>
                                <div className={styles.amountPagesResult}>{`${text.pages}:`}</div>
                                <div>{pages.length}</div>
                            </div>
                        </div>
                        <div className={styles.amountNewsWrapper}>
                            <div className={styles.amountNews}>
                                <div className={styles.amountPagesResult}>{`${text.news}:`}</div>
                                <div>{news.length}</div>
                            </div>
                        </div>
                    </div>
                    {
                        !!pages.length && <div className={styles.resultsPages}>
                            <h1 className={styles.resultTitle}>{text.resultPages}</h1>
                            <div className={styles.resultPagesList}>
                                {pages.map((item, i) => {
                                    return (
                                        <Link key={i} to={`${langRoute}${item.path}`} className={styles.resultPageItem}>
                                            <p>{item.texts[lang].name}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    }
                    {
                        !!news.length && <div className={styles.resultsNews}>
                            <h1 className={styles.resultTitle}>{text.resultNews}</h1>
                            <div className={styles.resultNewsList}>
                                {news.map((item, i) => {
                                    return (
                                        <Link to={`${langRoute}/news/${item.alias}`} key={i}>
                                            <div key={i} className={classNames(styles.resultNewsItem, {
                                                [styles.resultNewsItemNotOdd]: i % 2 !== 0
                                            })}>
                                                <h1 className={styles.date}>{getDateFormatted(item.date, lang)}</h1>
                                                <p className={styles.news}>{item.texts[`${lang}`].shortDescription}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
