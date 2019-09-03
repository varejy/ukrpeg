import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import AdminTableSortable from '../../components/AdminTableSortable/AdminTableSortable.jsx';
import LawForm from '../../components/LawsForm/LawsForm';

import { connect } from 'react-redux';
import getLaws from '../../../services/getLaws';
import deleteLawsByIds from '../../../services/deleteLawsByIds';

import noop from '@tinkoff/utils/function/noop';
import pathOr from '@tinkoff/utils/object/pathOr';

const headerRows = [
    { id: 'name', label: 'Название' },
    { id: 'path', label: 'Путь' }
];
const tableCells = [
    { prop: law => pathOr(['texts', 'ua', 'name'], '', law) },
    { prop: law => law.path }
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

const mapStateToProps = ({ laws }) => {
    return {
        laws: laws.laws
    };
};

const mapDispatchToProps = (dispatch) => ({
    getLaws: payload => dispatch(getLaws(payload)),
    deleteLaws: payload => dispatch(deleteLawsByIds(payload))
});

class LegislationPage extends Component {
    static propTypes = {
        classes: PropTypes.object,
        getLaws: PropTypes.func,
        deleteLaws: PropTypes.func,
        laws: PropTypes.array
    };

    static defaultProps = {
        laws: [],
        getLaws: noop,
        deleteLaws: noop
    };

    constructor (...args) {
        super(...args);

        this.state = {
            loading: true,
            formShowed: false,
            editableLaw: null
        };
    }

    componentDidMount () {
        this.props.getLaws()
            .then(() => {
                this.setState({
                    loading: false
                });
            });
    }

    handleFormDone = () => {
        this.props.getLaws()
            .then(this.handleCloseLawForm);
    };

    handleFormOpen = law => () => {
        this.setState({
            formShowed: true,
            editableLaw: law
        });
    };

    handleCloseLawForm = () => {
        this.setState({
            formShowed: false,
            editableLaw: null
        });
    };

    render () {
        const { classes, laws } = this.props;
        const { loading, editableLaw, formShowed } = this.state;

        if (loading) {
            return <div className={classes.loader}>
                <CircularProgress />
            </div>;
        }

        return <div>
            <AdminTableSortable
                headerRows={headerRows}
                tableCells={tableCells}
                values={laws}
                headerText='Законы'
                deleteValueWarningTitle='Вы точно хотите удалить документ?'
                deleteValuesWarningTitle='Вы точно хотите удалить следующие документ?'
                onDelete={this.props.deleteLaws}
                filters={false}
                onFormOpen={this.handleFormOpen}
            />
            <Modal open={formShowed} onClose={this.handleCloseLawForm} className={classes.modal}>
                <Paper className={classes.modalContent}>
                    <LawForm law={editableLaw} onDone={this.handleFormDone}/>
                </Paper>
            </Modal>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(LegislationPage));
