import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import getSchema from './lawsFormSchema';

import { connect } from 'react-redux';
import saveProduct from '../../../services/saveLaw';
import editProduct from '../../../services/editLaw';
import updateProductFiles from '../../../services/updateProductFiles';
import updateProductAvatar from '../../../services/updateProductAvatar';

import noop from '@tinkoff/utils/function/noop';
import prop from '@tinkoff/utils/object/prop';
import pick from '@tinkoff/utils/object/pick';

const PRODUCTS_VALUES = ['name', 'id', 'path'];

const mapDispatchToProps = (dispatch) => ({
    saveProduct: payload => dispatch(saveProduct(payload)),
    editProduct: payload => dispatch(editProduct(payload)),
    updateProductFiles: (...payload) => dispatch(updateProductFiles(...payload)),
    updateProductAvatar: (...payload) => dispatch(updateProductAvatar(...payload))
});

class LawsForm extends Component {
    static propTypes = {
        saveProduct: PropTypes.func.isRequired,
        editProduct: PropTypes.func.isRequired,
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
            name: law.name || '',
            path: law.path || '',
            ...pick(PRODUCTS_VALUES, law)
        };

        this.state = {
            id: prop('id', law)
        };
    }

    getProductPayload = (
        {
            name,
            hidden,
            path,
            id
        }) => {
        return {
            name,
            hidden,
            path,
            id
        };
    };

    handleSubmit = values => {
        event.preventDefault();

        const { id } = this.state;
        const productPayload = this.getProductPayload(values);

        (id ? this.props.editProduct({ ...productPayload, id }) : this.props.saveProduct(productPayload))
            .then(() => {
                this.props.onDone();
            });
    };

    handleChange = prop => event => {
        this.setState({
            product: {
                ...this.state.product,
                [prop]: event.target.value
            }
        });
    };

    handleCheckboxChange = prop => (event, value) => {
        this.setState({
            product: {
                ...this.state.product,
                [prop]: value
            }
        });
    };

    handleAvatarFileUpload = avatar => {
        this.setState({
            avatar
        });
    };

    handleFilesUpload = (files, removedFiles) => {
        this.setState({
            files,
            removedFiles
        });
    };

    render () {
        const { id } = this.state;

        return <Form
            initialValues={this.initialValues}
            schema={getSchema({
                data: { title: id ? 'Редактирование закона' : 'Добавление закона' }
            })}
            onSubmit={this.handleSubmit}
        />;
    }
}

export default connect(null, mapDispatchToProps)(LawsForm);
