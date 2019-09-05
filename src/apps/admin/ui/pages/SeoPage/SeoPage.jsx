import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from '@material-ui/core/Modal';

import SeoTabs from '../../components/SeoTabs/SeoTabs.jsx';
import SeoForm from '../../components/SeoForm/SeoForm.jsx';

import { connect } from 'react-redux';
import getAllSeo from '../../../services/getAllSeo';
import editNews from '../../../services/editNews';
import search from '../../../services/search';

import find from '@tinkoff/utils/array/find';
import prop from '@tinkoff/utils/object/prop';

const materialStyles = theme => ({
    paper: {
        padding: '0 24px 24px 24px'
    },
    container: {
        padding: '24px 0',
        width: '100%'
    },
    headerContainer: {
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    loader: {
        height: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchWrapp: {
        display: 'flex',
        marginTop: '15px',
        flexDirection: 'column',
        alignItems: 'center'
    },
    search: {
        width: '350px'
    },
    products: {
        padding: '48px'
    },
    cardContainer: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        padding: '45px'
    },
    card: {
        maxWidth: '345px',
        border: '1px solid transparent',
        cursor: 'pointer',
        paddingBottom: '16px'
    },
    cardLink: {
        textDecoration: 'none',
        margin: '20px 10px',
        width: '254px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundSize: '190px'
    },
    selectedNewsItem: {
        border: '1px solid rgb(63, 80, 181)'
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        position: 'absolute',
        width: '1200px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        overflowY: 'auto',
        maxHeight: '100vh'
    }
});

const PAGES = [
    { title: 'Головна', page: 'main' },
    { title: 'Про нас', page: 'about' },
    { title: 'Новини', page: 'news' },
    { title: 'Рвв', page: 'rvv' },
    { title: 'Законодавства', page: 'contacts' },
    { title: 'Контакти', page: 'contacts' },
    { title: 'Поиск', page: 'search' }
];
const mapStateToProps = ({ application, news }) => {
    return {
        categories: application.newsCategories,
        news: news.news
    };
};

const mapDispatchToProps = (dispatch) => ({
    getAllSeo: payload => dispatch(getAllSeo(payload)),
    editNews: payload => dispatch(editNews(payload)),
    search: payload => dispatch(search(payload))
});

class SeoPage extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        getAllSeo: PropTypes.func.isRequired,
        editNews: PropTypes.func.isRequired,
        search: PropTypes.func.isRequired
    };

    constructor (...args) {
        super(...args);

        this.state = {
            loading: true,
            tabsValue: 0,
            tips: [],
            searchTxt: '',
            selectedNewsItem: null
        };
    }

    componentDidMount () {
        this.props.getAllSeo()
            .then(() => {
                this.setState({
                    loading: false
                });
            });
    }

    handleTableChange = event => () => {
        this.setState({
            tabsValue: event
        });
    };

    handleSearchChange = event => {
        const searchTxt = event.target.value;

        this.setState({
            searchTxt
        });

        if (!searchTxt.length) {
            this.setState({
                tips: [],
                selectedNewsItem: {}
            });
        }

        this.props.search(searchTxt)
            .then(news => {
                const { selectedNewsItem } = this.state;
                const newTips = news
                    .map(product => {
                        return {
                            ...product
                        };
                    });
                const newSelectedProduct = selectedNewsItem ? find(tip => tip.id === selectedNewsItem.id, newTips) : null;

                this.setState({
                    tips: newTips,
                    selectedNewsItem: newSelectedProduct
                });
            });
    };

    handleSelectedProduct = product => () => {
        this.setState({
            selectedNewsItem: product
        });
    };

    handleCloseNewsSeoForm = () => {
        this.setState({
            selectedNewsItem: null
        });
    };

    handleFormDone = selectedNewsItem => values => {
        const result = {
            ...selectedNewsItem,
            texts: {
                ua: {
                    ...selectedNewsItem.texts.ua,
                    ...values.texts.ua
                },
                en: {
                    ...selectedNewsItem.texts.en,
                    ...values.texts.en
                }
            }
        };

        return this.props.editNews(result)
            .then(() => {
                const { searchTxt } = this.state;

                this.props.search(searchTxt)
                    .then(news => {
                        const { selectedNewsItem } = this.state;
                        const newTips = news
                            .map(product => {
                                return {
                                    ...product
                                };
                            });
                        const newSelectedProduct = selectedNewsItem ? find(tip => tip.id === selectedNewsItem.id, newTips) : null;

                        this.setState({
                            tips: newTips,
                            selectedNewsItem: newSelectedProduct
                        });
                    });
            });
    };

    renderEditPagesSeo = () => {
        const { classes } = this.props;

        return <div>
            <Paper className={classes.paper}>
                <div className={classes.headerContainer}>
                    <Typography variant='h6' id='seoTitle'>SEO</Typography>
                </div>
                <SeoTabs pages={PAGES} option='staticSeo'/>
            </Paper>
        </div>;
    };

    renderEditNewsSeo = () => {
        const { classes } = this.props;
        const { searchTxt, tips, selectedNewsItem } = this.state;
        const id = prop('id', selectedNewsItem);
        const values = {
            ...(selectedNewsItem || {})
        };
        const check = (prop) => id === prop;

        return <div>
            <div className={classes.searchWrapp}>
                <TextField
                    label='Поиск'
                    value={searchTxt}
                    onChange={this.handleSearchChange}
                    margin='normal'
                    className={classes.search}
                    variant='outlined'
                />
            </div>
            {
                searchTxt.length !== 0 && <div className={classes.products}>
                    <Typography variant='h6'>{` По запросу '${searchTxt}' ${(!tips.length && searchTxt.length) ? 'ничего не найдено' : 'найдено'}`}</Typography>
                    <div className={classes.cardContainer}>
                        {
                            tips.map(tip => {
                                return <div key={tip.id} onClick={this.handleSelectedProduct(tip)} className={classes.cardLink}>
                                    <Card className={classNames(classes.card, { [classes.selectedNewsItem]: check(tip.id) })}>
                                        <CardMedia
                                            className={classes.media}
                                            image={tip.avatar}
                                            title={tip.texts.ua.name}
                                        />
                                        <CardHeader
                                            title={tip.texts.ua.name}
                                        />
                                    </Card>
                                </div>;
                            })
                        }
                    </div>
                </div>
            }
            <Modal open={!!id} onClose={this.handleCloseNewsSeoForm} className={classes.modal} disableEnforceFocus>
                <Paper className={classes.modalContent}>
                    <SeoForm values={values} onSubmit={this.handleFormDone(selectedNewsItem)} />
                </Paper>
            </Modal>
        </div>;
    };

    render () {
        const { classes } = this.props;
        const { loading, tabsValue } = this.state;

        if (loading) {
            return <div className={classes.loader}>
                <CircularProgress />
            </div>;
        }

        return <div className={classes.container}>
            <AppBar position='static' color='default'>
                <Tabs
                    value={tabsValue}
                    onChange={this.handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='fullWidth'
                >
                    <Tab onClick={this.handleTableChange(0)} label='Редактирование SEO страниц' />
                    <Tab onClick={this.handleTableChange(1)} label='Поиск по новостям' />ъ
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={tabsValue}
                onChangeIndex={this.handleChangeIndex}
            >
                {this.renderEditPagesSeo(0)}
                {this.renderEditNewsSeo(1)}
            </SwipeableViews>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(SeoPage));
