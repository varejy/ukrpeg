import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

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
import pathOr from '@tinkoff/utils/object/pathOr';
import noop from '@tinkoff/utils/function/noop';

const MAX_LENGTH_NAMES = 59;
const DEFAULT_LANG = 'ua';

const ButtonSortable = SortableHandle(({ classes }) => (
    <Tooltip title='Переместить'><ReorderIcon className={classes.buttonSortable}> reorder </ReorderIcon></Tooltip>
));

const ItemSortable = SortableElement(({ onFormOpen, index, name, getCorrectName, bigAvatar, onDelete, sortable, numeration, isImage, value, tabId, classes }) => (
    <ListItem button className={classes.row}>
        { sortable && <ButtonSortable classes={classes}/> }
        {
            numeration && <div className={classes.indexItem}>
                {value.positionIndex || index + 1}.
            </div>
        }
        {
            isImage && <ListItemAvatar>
                <Avatar className={classNames(classes.avatar, { [classes.bigAvatar]: bigAvatar })} alt={value.imgAlt} src={value.path} />
            </ListItemAvatar>
        }
        <ListItemText
            className={classes.listItemText}
            primary={value.name && getCorrectName(value.name)}
        />
        <div className={classes.valueActions}>
            <ListItemSecondaryAction>
                <Tooltip title='Редактировать'>
                    <IconButton onClick={onFormOpen({ value, index })}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Удалить'>
                    <IconButton onClick={onDelete({ value, index })} edge="end" aria-label="delete">
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
                const name = pathOr([`${DEFAULT_LANG}_title`], '', value);

                return <ItemSortable key={i} name={name} value={value} index={i} {...rest}/>;
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
        border: '#e4e4e4 solid 1px',
        borderRadius: '5px',
        margin: '5px 0px',
        zIndex: 1201,
        '&:hover $valueActions': {
            visibility: 'visible'
        },
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
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
    },
    avatar: {
        borderRadius: '50px',
        border: '2px solid #3f51b5',
        boxShadow: 'inset black 0px 0px 5px 0px'
    },
    bigAvatar: {
        height: '45px',
        width: '110px'
    },
    indexItem: {
        color: '#3f51b5',
        fontFamily: 'sans-serif',
        margin: '0 12px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        alignItems: 'center'
    },
    listWrapp: {
        padding: '8px 20px 20px',
        border: '#e4e4e4 solid 1px',
        borderRadius: '5px'
    },
    title: {
        height: '30px'
    }
});

class Lists extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        values: PropTypes.array,
        formValuesName: PropTypes.string,
        editValues: PropTypes.func,
        onFormOpen: PropTypes.func,
        onDelete: PropTypes.func,
        sortable: PropTypes.bool,
        isImage: PropTypes.bool,
        numeration: PropTypes.bool,
        nameToolTip: PropTypes.bool,
        bigAvatar: PropTypes.bool,
        maxLength: PropTypes.number,
        title: PropTypes.string,
        tabId: PropTypes.string
    };

    static defaultProps = {
        sortable: false,
        bigAvatar: false,
        maxLength: Infinity,
        isImage: false,
        numeration: false,
        nameToolTip: false,
        formValuesName: '',
        title: '',
        tabId: '',
        values: [],
        editValues: noop,
        onFormOpen: noop,
        onFormClose: noop,
        onDelete: noop
    };

    constructor (...args) {
        super(...args);

        const { values } = this.props;

        this.state = {
            values,
            valueForDelete: null
        };
    }

    handleDelete = value => () => {
        this.setState({
            valueForDelete: value
        });
    }

    handleWarningDisagree = () => {
        this.setState({
            valueForDelete: null
        });
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.values !== this.props.values) {
            this.setState({
                values: nextProps.values
            });
        }
    }

    handleWarningAgree = () => {
        const { valueForDelete } = this.state;

        this.props.onDelete(valueForDelete);
        this.setState({
            valueForDelete: null
        });
    }

    onDragEnd = ({ oldIndex, newIndex }) => {
        const { values } = this.state;
        const newValues = arrayMove(values, oldIndex, newIndex);

        this.props.editValues(newValues);

        this.setState({
            values: newValues
        });
    };

    getCorrectName = name => {
        return name.length > MAX_LENGTH_NAMES ? `${name.substring(0, MAX_LENGTH_NAMES)}...` : name;
    };

    render () {
        const { values, valueForDelete } = this.state;
        const { sortable, isImage, bigAvatar, numeration, maxLength, classes, onFormOpen, title, tabId } = this.props;
        const checkMaxItemLength = () => values.length === maxLength;

        return <div>
            <div className={classes.listWrapp}>
                <div className={classes.header}>
                    <Typography variant='h5' className={classes.title}>{title}</Typography>
                    <Tooltip title='Добавить'>
                        <IconButton disabled={checkMaxItemLength()} onClick={onFormOpen({ value: {}, tabId})}>
                            {/*<IconButton disabled={checkMaxItemLength()} onClick={onFormOpen('new')}>*/}

                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <Divider />
                <SortableWrapp
                    axis='y'
                    onFormOpen={onFormOpen}
                    onDelete={this.handleDelete}
                    getCorrectName={this.getCorrectName}
                    onSortEnd={this.onDragEnd}
                    sortable={sortable}
                    isImage={isImage}
                    bigAvatar={bigAvatar}
                    numeration={numeration}
                    tabId={tabId}
                    values={values}
                    useDragHandle
                    classes={classes}
                />
            </div>
            <Dialog
                open={!!valueForDelete}
                onClose={this.handleWarningDisagree}
            >
                <DialogTitle>Вы точно хотите удалить ?</DialogTitle>
                <DialogContent className={classes.warningContent}>
                    <DialogContentText>{valueForDelete && valueForDelete.value.name}</DialogContentText>
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
