import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import saveNews from '../../../services/saveNews';
import editNews from '../../../services/editNews';
import updateNewsAvatar from '../../../services/updateNewsAvatar';

import Form from '../Form/Form';
import getSchema from './newsItemFormSchema';

import noop from '@tinkoff/utils/function/noop';
import pick from '@tinkoff/utils/object/pick';
import prop from '@tinkoff/utils/object/prop';
import pathOr from '@tinkoff/utils/object/pathOr';
import format from 'date-fns/format';

const NEWS_VALUES = ['hidden', 'alias'];

const mapDispatchToProps = (dispatch) => ({
    saveNews: payload => dispatch(saveNews(payload)),
    editNews: payload => dispatch(editNews(payload)),
    updateNewsAvatar: (...payload) => dispatch(updateNewsAvatar(...payload))
});

const materialStyles = theme => ({
    error: {
        backgroundColor: theme.palette.error.dark
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    },
    margin: {
        margin: theme.spacing.unit
    }
});

class NewsForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        saveNews: PropTypes.func.isRequired,
        editNews: PropTypes.func.isRequired,
        updateNewsAvatar: PropTypes.func.isRequired,
        onDone: PropTypes.func,
        news: PropTypes.object,
        categories: PropTypes.array,
        activeCategory: PropTypes.object
    };

    static defaultProps = {
        onDone: noop,
        news: {},
        categories: {},
        activeCategory: {}
    };

    constructor (...args) {
        super(...args);

        const { news } = this.props;
        const ua = pathOr(['texts', 'ua'], '', news);
        const en = pathOr(['texts', 'en'], '', news);
        const categoryHidden = this.props.activeCategory.hidden;

        this.categoriesOptions = this.props.categories.map(category => ({
            value: category.id,
            name: category.texts.ua.name
        }));

        this.initialValues = {
            date: format(new Date(), 'YYYY-MM-DD'),
            views: 0,
            categoryId: this.props.activeCategory.id,
            avatar: {
                files: news.avatar ? [news.avatar] : [],
                removedFiles: []
            },
            ua_name: ua.name || '',
            en_name: en.name || '',
            en_shortDescription: en.shortDescription || '',
            ua_shortDescription: ua.shortDescription || '',
            ua_description: ua.description || '',
            en_description: en.description || '',
            ua_seoTitle: ua.seoTitle || '',
            en_seoTitle: en.seoTitle || '',
            ua_seoDescription: ua.seoDescription || '',
            en_seoDescription: en.seoDescription || '',
            ua_seoKeywords: { words: ua.seoKeywords && ua.seoKeywords.split(', ') || [], input: '' },
            en_seoKeywords: { words: en.seoKeywords && en.seoKeywords.split(', ') || [], input: '' },
            lang: 'ua',
            ...pick(NEWS_VALUES, news),
            hidden: categoryHidden ? false : news.hidden
        };
        this.id = prop('id', news);
        this.state = {
            lang: 'ua',
            errorText: '',
            categoryHidden
        };
    }

    getNewsItemPayload = (
        {
            en_name: enName,
            ua_name: uaName,
            en_shortDescription: enShortDescription,
            ua_shortDescription: uaShortDescription,
            en_description: enDescription,
            ua_description: uaDescription,
            en_seoTitle: enSeoTitle,
            ua_seoTitle: uaSeoTitle,
            en_seoDescription: enSeoDescription,
            ua_seoDescription: uaSeoDescription,
            en_seoKeywords: enSeoKeywords,
            ua_seoKeywords: uaSeoKeywords,
            categoryId,
            alias,
            hidden,
            views,
            date,
            id
        }) => {
        return {
            hidden: this.state.categoryHidden || hidden,
            views: +views,
            categoryId,
            alias,
            date,
            id,
            texts: {
                en: {
                    name: enName,
                    shortDescription: enShortDescription,
                    description: enDescription,
                    seoTitle: enSeoTitle,
                    seoDescription: enSeoDescription,
                    seoKeywords: enSeoKeywords.words.join(', ')
                },
                ua: {
                    name: uaName,
                    shortDescription: uaShortDescription,
                    description: uaDescription,
                    seoTitle: uaSeoTitle,
                    seoDescription: uaSeoDescription,
                    seoKeywords: uaSeoKeywords.words.join(', ')
                }
            }
        };
    };

    handleHideFailMessage = () => {
        this.setState({
            errorText: ''
        });
    };

    handleChange = (values, changes) => {
        if ('lang' in changes) {
            this.setState({
                lang: changes.lang
            });

            this.categoriesOptions = this.props.categories.map(category => ({
                value: category.id,
                name: category.texts[changes.lang].name
            }));
        }

        if ('categoryId' in changes) {
            const activeCategory = this.props.categories.find(category => category.id === changes.categoryId);

            this.setState({
                categoryHidden: activeCategory.hidden
            });
        }
    };

    handleSubmit = values => {
        event.preventDefault();

        const newsItemPayload = this.getNewsItemPayload(values);

        (this.id ? this.props.editNews({ ...newsItemPayload, id: this.id }) : this.props.saveNews(newsItemPayload))
            .then(newsItem => {
                const { files } = values.avatar;

                if (files[0].content) {
                    const formData = new FormData();

                    formData.append(`news-${newsItem.id}-avatar`, files[0].content);

                    return this.props.updateNewsAvatar(formData, newsItem.id);
                }
            })
            .then(() => {
                this.props.onDone();
            })
            .catch(error => {
                if (error.code === 'duplication') {
                    this.setState({
                        errorText: 'Введите уникальные алиас для новости'
                    });
                } else {
                    this.setState({
                        errorText: 'Что-то пошло не так. Перезагрузите страницы и попробуйте снова'
                    });
                }
            });
    };

    render () {
        const { classes } = this.props;
        const { lang, errorText, categoryHidden } = this.state;

        return <div>
            <Form
                initialValues={this.initialValues}
                lang={lang}
                schema={getSchema({
                    data: {
                        title: this.id ? 'Редактирование новости' : 'Добавление новости',
                        categoriesOptions: this.categoriesOptions,
                        categoryHidden
                    },
                    settings: { lang }
                })}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                onClose={this.handleHideFailMessage}
                open={!!errorText}
                autoHideDuration={2000}
            >
                <SnackbarContent
                    className={classNames(classes.error, classes.margin)}
                    message={
                        <span id='client-snackbar' className={classes.message}>
                            <ErrorIcon className={classNames(classes.icon, classes.iconVariant)} />
                            { errorText }
                        </span>
                    }
                />
            </Snackbar>
        </div>;
    }
}

export default withStyles(materialStyles)(connect(null, mapDispatchToProps)(NewsForm));
