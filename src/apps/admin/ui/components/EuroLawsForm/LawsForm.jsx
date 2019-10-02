import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import getSchema from './lawsFormSchema';

import { connect } from 'react-redux';
import saveEuroLaw from '../../../services/saveEuroLaw';
import editEuroLaw from '../../../services/editEuroLaw';

import noop from '@tinkoff/utils/function/noop';
import prop from '@tinkoff/utils/object/prop';
import pick from '@tinkoff/utils/object/pick';
import pathOr from '@tinkoff/utils/object/pathOr';

const PRODUCTS_VALUES = ['texts', 'id', 'path'];

const mapDispatchToProps = (dispatch) => ({
    saveLaw: payload => dispatch(saveEuroLaw(payload)),
    editLaw: payload => dispatch(editEuroLaw(payload))
});

class LawsForm extends Component {
    static propTypes = {
        saveLaw: PropTypes.func.isRequired,
        editLaw: PropTypes.func.isRequired,
        onDone: PropTypes.func,
        law: PropTypes.object
    };

    static defaultProps = {
        onDone: noop,
        law: {}
    };

    constructor (...args) {
        super(...args);

        const { law } = this.props;
        this.initialValues = {
            ua_name: pathOr(['texts', 'ua', 'name'], '', law),
            en_name: pathOr(['texts', 'ua', 'name'], '', law),
            ua_description: pathOr(['texts', 'ua', 'description'], '', law),
            en_description: pathOr(['texts', 'en', 'description'], '', law),
            path: law.path || '',
            lang: 'ua',
            ...pick(PRODUCTS_VALUES, law)
        };

        this.state = {
            id: prop('id', law),
            lang: 'ua'
        };
    }

    getProductPayload = (
        {
            en_name: enName,
            ua_name: uaName,
            en_description: enDescription,
            ua_description: uaDescription,
            hidden,
            path,
            id
        }) => {
        return {
            texts: {
                en: {
                    name: enName,
                    description: enDescription
                },
                ua: {
                    name: uaName,
                    description: uaDescription
                }
            },
            hidden,
            path,
            id
        };
    };

    handleSubmit = values => {
        event.preventDefault();

        const { id } = this.state;
        const productPayload = this.getProductPayload(values);

        (id ? this.props.editLaw({ ...productPayload, id }) : this.props.saveLaw(productPayload))
            .then(() => {
                this.props.onDone();
            });
    };

    handleChange = (values) => {
        this.setState({
            lang: values.lang
        });
    };

    render () {
        const { id, lang } = this.state;

        return <Form
            initialValues={this.initialValues}
            schema={getSchema({
                data: { title: id ? 'Редактирование закона' : 'Добавление закона' },
                settings: { lang }
            })}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
        />;
    }
}

export default connect(null, mapDispatchToProps)(LawsForm);
