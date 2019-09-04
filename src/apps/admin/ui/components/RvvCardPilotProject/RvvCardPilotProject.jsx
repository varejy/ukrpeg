import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import getSchema from './rvvCardPilotProject';

import noop from '@tinkoff/utils/function/noop';
import pick from '@tinkoff/utils/object/pick';
import pathOr from '@tinkoff/utils/object/pathOr';

const PILOT_PROJECT_VALUES = ['sity', 'description'];

class RvvCardPilotProject extends Component {
    static propTypes = {
        onDone: PropTypes.func,
        pProject: PropTypes.object

    };

    static defaultProps = {
        onDone: noop,
        pProject: {}
    };

    constructor (...args) {
        super(...args);

        const { pProject } = this.props;

        this.initialValues = {
            ua_sity: pathOr(['texts', 'ua', 'sity'], '', pProject),
            en_sity: pathOr(['texts', 'en', 'sity'], '', pProject),
            en_description: pathOr(['texts', 'en', 'description'], '', pProject),
            ua_description: pathOr(['texts', 'ua', 'description'], '', pProject),
            ...pick(PILOT_PROJECT_VALUES, pProject)
        };

        this.state = {
            lang: 'ua'
        };
    }

    getCategoryPayload = (
        {
            en_sity: enSity,
            ua_sity: uaSity,
            en_description: enDescription,
            ua_description: uaDescription
        }) => {
        return {
            texts: {
                en: {
                    sity: enSity,
                    description: enDescription
                },
                ua: {
                    sity: uaSity,
                    description: uaDescription
                }
            }
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
        /* const { id } = this.state;
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
            }); */
    };

    render () {
        const { lang } = this.state;

        return <Form
            initialValues={this.initialValues}
            schema={getSchema({
                data: { title: 'Редактирование пилотного проекта' },
                settings: { lang }
            })}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
        />;
    }
}

export default RvvCardPilotProject;
