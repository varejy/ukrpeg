import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import saveNews from '../../../services/saveNews';
import editNews from '../../../services/editNews';
import updateNewsAvatar from '../../../services/updateNewsAvatar';

import Form from '../Form/Form';
import getSchema from './newsItemFormSchema';

import noop from '@tinkoff/utils/function/noop';
import pick from '@tinkoff/utils/object/pick';
import prop from '@tinkoff/utils/object/prop';
import format from 'date-fns/format';

const NEWS_VALUES = ['name', 'views', 'shortDescription', 'description', 'hidden', 'date'];

const mapDispatchToProps = (dispatch) => ({
    saveNews: payload => dispatch(saveNews(payload)),
    editNews: payload => dispatch(editNews(payload)),
    updateNewsAvatar: (...payload) => dispatch(updateNewsAvatar(...payload))
});

class NewsForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        saveNews: PropTypes.func.isRequired,
        editNews: PropTypes.func.isRequired,
        updateNewsAvatar: PropTypes.func.isRequired,
        onDone: PropTypes.func,
        news: PropTypes.object,
        activeCategory: PropTypes.object
    };

    static defaultProps = {
        onDone: noop,
        news: {},
        activeCategory: {}
    };

    constructor (...args) {
        super(...args);

        const { news } = this.props;

        this.initialValues = {
            hidden: false,
            date: format(new Date(), 'YYYY-MM-DD'),
            avatar: {
                files: news.avatar ? [news.avatar] : [],
                removedFiles: []
            },
            ...pick(NEWS_VALUES, news)
        };

        this.id = prop('id', news);
    }

    getNewsItemPayload = (
        {
            name,
            description,
            shortDescription,
            hidden,
            views,
            date,
            id
        }) => {
        return {
            name,
            description,
            shortDescription,
            hidden,
            views: +views,
            date,
            categoryId: this.props.activeCategory.id,
            id
        };
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
            });
    };

    render () {
        return <Form
            initialValues={this.initialValues}
            schema={getSchema({
                data: { title: this.id ? 'Редактирование новости' : 'Добавление новости' }
            })}
            onSubmit={this.handleSubmit}
        />;
    }
}

export default connect(null, mapDispatchToProps)(NewsForm);
