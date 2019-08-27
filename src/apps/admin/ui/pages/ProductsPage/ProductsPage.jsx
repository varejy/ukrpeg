import React, { Component } from 'react';
import PropTypes from 'prop-types';

import omit from '@tinkoff/utils/object/omit';

import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import AdminTable from '../../components/AdminTable/AdminTable.jsx';
// import ProductFilters from '../../components/ProductFilters/ProductFilters';

import { connect } from 'react-redux';
import getProducts from '../../../services/getNewsAll';
import deleteProductsByIds from '../../../services/deleteNewsByIds';

const headerRows = [
    { id: 'name', label: 'Название' },
    { id: 'price', label: 'Цена' },
    { id: 'active', label: 'Active' }
];
const tableCells = [
    { prop: product => product.name },
    { prop: product => product.price },
    { prop: product => product.hidden ? <CloseIcon /> : <CheckIcon /> }
];

const materialStyles = theme => ({
    loader: {
        height: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    warningContent: {
        paddingBottom: '0'
    }
});

const mapStateToProps = ({ products }) => {
    return {
        products: products.filtered
    };
};

const mapDispatchToProps = (dispatch) => ({
    getProducts: payload => dispatch(getProducts(payload)),
    deleteProducts: payload => dispatch(deleteProductsByIds(payload))
});

class ProductsPage extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        getProducts: PropTypes.func.isRequired,
        deleteProducts: PropTypes.func.isRequired,
        products: PropTypes.array
    };

    static defaultProps = {
        products: []
    };

    constructor (...args) {
        super(...args);

        this.state = {
            loading: true,
            formShowed: false,
            filtersShowed: false,
            editableProduct: null
        };
    }

    componentDidMount () {
        this.props.getProducts()
            .then(() => {
                this.setState({
                    loading: false
                });
            });
    }

    handleFormDone = () => {
        this.props.getProducts()
            .then(this.handleCloseProductForm);
    };

    handleFormOpen = product => () => {
        this.setState({
            formShowed: true,
            editableProduct: product
        });
    };

    handleProductClone = product => () => {
        this.setState({
            formShowed: true,
            editableProduct: omit(['id'], product)
        });
    };

    handleFiltersOpen = () => {
        this.setState({
            filtersShowed: true
        });
    };

    handleCloseProductForm = () => {
        this.setState({
            formShowed: false,
            editableProduct: null
        });
    };

    handleCloseFilters = () => {
        this.setState({
            filtersShowed: false
        });
    };

    render () {
        const { classes, products } = this.props;
        const { loading, editableProduct, formShowed, filtersShowed } = this.state;

        if (loading) {
            return <div className={classes.loader}>
                <CircularProgress />
            </div>;
        }

        return <div>
            <AdminTable
                headerRows={headerRows}
                tableCells={tableCells}
                values={products}
                headerText='Товары'
                deleteValueWarningTitle='Вы точно хотите удалить товар?'
                deleteValuesWarningTitle='Вы точно хотите удалить следующие товары?'
                onDelete={this.props.deleteProducts}
                onProductClone={this.handleProductClone}
                onFormOpen={this.handleFormOpen}
                onFiltersOpen={this.handleFiltersOpen}
            />
            <Modal open={formShowed} onClose={this.handleCloseProductForm} className={classes.modal}>
                <Paper className={classes.modalContent}>
                    <ProductForm product={editableProduct} onDone={this.handleFormDone}/>
                </Paper>
            </Modal>
            <Modal open={filtersShowed} onClose={this.handleCloseFilters} className={classes.modal} keepMounted>
                <Paper className={classes.modalContent}>
                    <ProductFilters />
                </Paper>
            </Modal>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(ProductsPage));
