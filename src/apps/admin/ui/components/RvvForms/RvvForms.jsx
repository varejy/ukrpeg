import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import whySchema from './rvvWhyFormSchema';
import plansSchema from './rvvPlanFormSchema';

import noop from '@tinkoff/utils/function/noop';

class RvvListForm extends Component {
    static propTypes = {
        onDone: PropTypes.func,
    };

    static defaultProps = {
        onDone: noop,
    };

    constructor (...args) {
        super(...args);

        const { value } = this.props;

        this.initialValues = [
            {
                ua_title: value ? value.value.title : '',
                en_title: value ? value.value.title : '',
                schema: plansSchema,
                id: 'plans'
            },
            {
                ua_text: value ? value.value.title : '',
                en_text: value ? value.value.title : '',
                ua_imgAlt: value ? value.value.imgAlt : '',
                en_imgAlt: value ? value.value.imgAlt : '',
                schema: whySchema,
                img: value ? value.value.imgPath : '',
                id: 'why'
            },
            {
                ua_title: '',
                en_title: '',
                schema: plansSchema,
                id: 'mainForces'
            },
            {
                ua_title: '',
                en_title: '',
                schema: plansSchema,
                id: 'composition'
            },
        ];

        this.state = {
            lang: 'ua'
        };
    }

    handleChange = (values, changes) => {
        if ('lang' in changes) {
            this.setState({
                lang: values.lang
            });
        }
    };

    render () {
        const { value, onDone } = this.props;
        const { lang } = this.state;
        const initialValue = this.initialValues.find((values) => values.id === value.tabId);

        return <Form
            initialValues={initialValue}
            schema={initialValue.schema({
                data: { title: 'Редактирование' },
                settings: { lang }
            })}
            onChange={this.handleChange}
            onSubmit={onDone}
        />;
    }
}

export default RvvListForm;
