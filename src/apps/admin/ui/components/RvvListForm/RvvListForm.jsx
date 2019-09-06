import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import plansSchema from './rvvPlanFormSchema';

import { connect } from 'react-redux';
import saveNewsCategory from '../../../services/saveNewsCategory';
import editNewsCategory from '../../../services/editNewsCategory';

import noop from '@tinkoff/utils/function/noop';
import prop from '@tinkoff/utils/object/prop';
import pick from '@tinkoff/utils/object/pick';
import pathOr from '@tinkoff/utils/object/pathOr';

const CATEGORIES_VALUES = ['name', 'id', 'title', 'description'];

const mapDispatchToProps = (dispatch) => ({
    saveNewsCategory: payload => dispatch(saveNewsCategory(payload)),
    editNewsCategory: payload => dispatch(editNewsCategory(payload))
});

class RvvListForm extends Component {
    static propTypes = {
        saveNewsCategory: PropTypes.func.isRequired,
        editNewsCategory: PropTypes.func.isRequired,
        onDone: PropTypes.func,
        category: PropTypes.object,
        categories: PropTypes.array

    };

    static defaultProps = {
        onDone: noop,
        category: {},
        categories: []
    };

    constructor (...args) {
        super(...args);

        const { index, type } = this.props;

        this.initialValues = [
            {
                ua_title: '',
                en_title: '',
                id: 'plans'
            },
            {
                ua_text: '',
                en_text: '',
                ua_imgAlt: '',
                en_imgAlt: '',
                img: '',
                id: 'why'
            },
            {
                ua_sity: '',
                en_sity: '',
                ua_description: '',
                en_description: '',
                id: 'pProject'
            },
            {
                ua_title: '',
                en_title: '',
                id: 'mainForces'
            },
            {
                ua_title: '',
                en_title: '',
                ua_description: '',
                en_description: '',
                id: 'keyFacts'
            },
            {
                ua_title: '',
                en_title: '',
                id: 'composition'
            },
            {
                ua_message: '',
                en_message: '',
                id: 'message'
            },
        ];

        this.state = {
            id: prop('id', category),
            lang: 'ua'
        };
    }

    getCategoryPayload = (
        {
            en_name: enName,
            ua_name: uaName,
            hidden,
            positionIndex,
            id
        }) => {
        return {
            hidden,
            positionIndex,
            texts: {
                en: {
                    name: enName
                },
                ua: {
                    name: uaName
                }
            },
            id
        };
    };

    handleChange = (values, changes) => {
        if ('lang' in changes) {
            this.setState({
                lang: values.lang
            });
        }
    };

    handleSubmit = values => {
        event.preventDefault();

        const { id } = this.state;
        const categoryPayload = this.getCategoryPayload(values);
        (
            id
                ? this.props.editNewsCategory({ ...categoryPayload, id })
                : this.props.saveNewsCategory({
                    ...categoryPayload,
                    positionIndex: categoryPayload.positionIndex || this.props.categories.length
                })
        )
            .then(() => {
                this.props.onDone();
            });
    };

    render () {
        const { id, lang } = this.state;

        return <Form
            initialValues={this.initialValues}
            schema={getSchema({
                data: { title: id ? 'Редактирование' : 'Добавление' },
                settings: { lang }
            })}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
        />;
    }
}

export default connect(null, mapDispatchToProps)(RvvListForm);
