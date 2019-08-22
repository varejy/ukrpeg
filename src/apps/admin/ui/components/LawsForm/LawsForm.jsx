import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';

import { connect } from 'react-redux';
import saveProduct from '../../../services/saveProduct';
import editProduct from '../../../services/editProduct';
import updateProductFiles from '../../../services/updateProductFiles';
import updateProductAvatar from '../../../services/updateProductAvatar';

import noop from '@tinkoff/utils/function/noop';
import prop from '@tinkoff/utils/object/prop';
import pick from '@tinkoff/utils/object/pick';

const PRODUCTS_VALUES = ['name', 'hidden'];

const mapDispatchToProps = (dispatch) => ({
    saveProduct: payload => dispatch(saveProduct(payload)),
    editProduct: payload => dispatch(editProduct(payload)),
    updateProductFiles: (...payload) => dispatch(updateProductFiles(...payload)),
    updateProductAvatar: (...payload) => dispatch(updateProductAvatar(...payload))
});

class LawsForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        saveProduct: PropTypes.func.isRequired,
        editProduct: PropTypes.func.isRequired,
        updateProductFiles: PropTypes.func.isRequired,
        updateProductAvatar: PropTypes.func.isRequired,
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
        const newLaw = {
            hidden: false,
            ...pick(PRODUCTS_VALUES, law)
        };

        this.initialValues = {

        }

        this.state = {
            id: prop('id', product),
        };
    }

    getProductPayload = (
        {
            name,
            hidden,
            id
        }) => {
        return {
            name,
            hidden,
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
