import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

// Material components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

// icons
import ReorderIcon from '@material-ui/icons/Reorder';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

// Sortable
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from '../../../utils/arrayMove';

// Tinkoff
import noop from '@tinkoff/utils/function/noop';


const ButtonSortable = SortableHandle(({ classes }) => (
    <Tooltip title='Переместить'><ReorderIcon className={classes.buttonSortable}> reorder </ReorderIcon></Tooltip>
));

const ItemSortable = SortableElement(({ onFormOpen, onDelete, sortable, value, classes }) => (
    <ListItem button className={classes.row}>
        { sortable && <ButtonSortable classes={classes}/> }
        <ListItemText
            className={classes.listItemText}
            primary={value.title}
        />
        <div className={classes.valueActions}>
            <ListItemSecondaryAction>
                <Tooltip title='Редактировать'>
                    <IconButton onClick={onFormOpen(value)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Удалить'>
                    <IconButton onClick={onDelete(value)} edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </ListItemSecondaryAction>
        </div>
    </ListItem>
));

const SortableWrapp = SortableContainer((
    {
        values,
        ...rest
    }) =>
    <List>
        {
            values.map((value, i) => {
                return <ItemSortable key={i} value={value} index={i} {...rest}/>;
            })
        }
    </List>
);

const materialStyles = theme => ({
    content: {
        flexGrow: 1,
        padding: '30px'
    },
    toolbar: {
        height: '0px'
    },
    toolbarNav: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '5px 30px 5px 30px'
    },
    buttonSortable: {
        position: 'relative',
        marginRight: '12px',
        cursor: 'pointer'
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        backgroundColor: 'white',
        zIndex: 1201,
        '&:hover $valueActions': {
            visibility: 'visible'
        },
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.07)'
        }
    },
    valueActions: {
        visibility: 'hidden'
    },
    listItemText: {
        cursor: 'default'
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
    }
});

class Lists extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        sortable: PropTypes.bool,
        formValuesName: PropTypes.string,
        editValues: PropTypes.func,
        onFormOpen: PropTypes.func,
        onDelete: PropTypes.func
    };

    static defaultProps = {
        sortable: false,
        formValuesName: '',
        editValues: noop,
        onFormOpen: noop,
        onFormClose: noop,
        onDelete: noop
    };

    constructor(...args) {
        super(...args);

        const { values } = this.props;

        this.state = {
            values,
            valueForDelete: null,
            formShowed: false,
            editableValue: null
        }
    }

    handleFormOpen = value => () => {
        const { form, formValuesName } = this.props;

        this.setState({
            formShowed: true,
            form: {
                ...form,
                props: {
                    ...form.props,
                    [formValuesName]: value
                }
            },
            editableValue: value
        });
    }

    handleDelete = value => () => {
        this.setState({
            valueForDelete: value
        })
    }

    handleCloseForm = () => {
        this.setState({
            formShowed: false,
            editableValue: null
        });
    }

    handleWarningDisagree = () => {
        this.setState({
            valueForDelete: null
        })
    }

    handleWarningAgree = () => {
        const { valueForDelete } = this.state;

        this.props.onDelete(valueForDelete)
            .then(() => {
                this.setState({
                    valueForDelete: null
                })
            })
    }

    handleFormDone = () => {
        
    }

    onDragEnd = ({ oldIndex, newIndex }) => {
        const { values } = this.state;
        const newValues = arrayMove(values, oldIndex, newIndex);

        newValues.forEach((value, i) => {
            value.positionIndex = i + 1;

            this.props.editValues(value);
        });

        this.setState({
            values: newValues
        });
    };

    render() {
        const { values, valueForDelete, formShowed, form } = this.state;
        const { sortable, classes } = this.props;

        return <div>
            <SortableWrapp
                axis='xy'
                onFormOpen={this.handleFormOpen}
                onDelete={this.handleDelete}
                onSortEnd={this.onDragEnd}
                sortable={sortable}
                values={values}
                useDragHandle
                classes={classes}
            />
            <Modal open={formShowed} onClose={this.handleCloseForm} className={classes.modal} >
                <Paper className={classes.modalContent}>
                    { form }
                </Paper>
            </Modal>
            <Dialog
                open={!!valueForDelete}
                onClose={this.handleWarningDisagree}
            >
                <DialogTitle>Вы точно хотите удалить ?</DialogTitle>
                <DialogContent className={classes.warningContent}>
                    <DialogContentText>{valueForDelete && valueForDelete.title}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleWarningDisagree} color='primary'>
                        Нет
                    </Button>
                    <Button onClick={this.handleWarningAgree} color='primary' autoFocus>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>;
    }
}

export default withStyles(materialStyles)(Lists);