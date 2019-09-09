import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import arrayMove from '../../../utils/arrayMove';
import noop from '@tinkoff/utils/function/noop';
import pathOr from '@tinkoff/utils/object/pathOr';

const materialStyles = {
    cardWrapp: {
        margin: '20px auto',
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        maxWidth: '345px',
        border: '1px solid transparent',
        cursor: 'pointer',
        paddingBottom: '16px'
    },
    cardLink: {
        textDecoration: 'none',
        margin: '20px 10px',
        width: '254px',
        position: 'relative',
        '&:hover $fileItemContainer': {
            visibility: 'visible'
        }
    },
    selectedCard: {
        border: '1px solid rgb(63, 80, 181)'
    },
    cardSortableBtn: {
        height: '100%',
        width: '100%',
        zIndex: 2312,
        position: 'absolute'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        alignItems: 'center'
    },
    wrapp: {
        padding: '8px 20px 20px',
        border: '#e4e4e4 solid 1px',
        borderRadius: '5px'
    },
    title: {
        height: '30px'
    },
    fileItemContainer: {
        position: 'absolute',
        right: '0',
        top: '0',
        zIndex: 2314,
        visibility: 'hidden',
        background: 'white',
        borderRadius: '100%'
    }
};

const DEFAULT_LANG = 'ua';

const getName = value => (pathOr(['texts', DEFAULT_LANG, 'title'], '', value) + pathOr(['texts', DEFAULT_LANG, 'sign'], '', value));

const getDescription = value => pathOr(['texts', DEFAULT_LANG, 'description'], '', value);

const ButtonSortable = SortableHandle(({ classes }) => (
    <div className={classes.cardSortableBtn}/>
));

const CardItem = SortableElement(({ card, check, index, onSelectedCard, onItemDelete, onEdit, getCorrectName, classes }) => (
    <div className={classes.cardLink} >
        <div className={classes.fileItemContainer}>
            <IconButton
                aria-label='Edit'
                onClick={onEdit({ value: card, index })}
            >
                <EditIcon />
            </IconButton>
            <IconButton
                aria-label='Delete'
                onClick={onItemDelete({ value: card, index })}
            >
                <DeleteIcon />
            </IconButton>
        </div>
        <ButtonSortable onClick={onSelectedCard(card)} classes={classes} />
        <Card className={classNames(classes.card, { [classes.selectedCard]: check(card.positionIndex) })}>
            <CardHeader
                title={getName(card) && getCorrectName(getName(card))}
            />
            <CardContent>
                <Typography variant="body2" component="p">
                    {getDescription(card) && getCorrectName(getDescription(card))}
                </Typography>
            </CardContent>
        </Card>
    </div >
));

const Cards = SortableContainer(({ values, selectedCard, classes, ...rest }) => {
    const check = (prop) => selectedCard.positionIndex === prop;

    return <div className={classes.cardWrapp}>
        {
            values.map((card, i) => {
                return <CardItem card={card} key={i} index={i} check={check} classes={classes} {...rest} />;
            })
        }
    </div>;
});

const MAX_LENGTH_NAMES = 27;

class RvvCardsKeyFacts extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        values: PropTypes.array,
        maxLength: PropTypes.number,
        title: PropTypes.string,
        onFormOpen: PropTypes.func,
        editValues: PropTypes.func,
        onDelete: PropTypes.func
    };

    static defaultProps = {
        values: [],
        maxLength: Infinity,
        title: '',
        editValues: noop,
        onFormOpen: noop,
        onDelete: noop,
        onEdit: noop
    };

    state = {
        isSorting: false,
        selectedCard: {}
    };

    handleSelectedCard = card => () => {
        this.setState({
            selectedCard: card
        });
    };

    getCorrectName = name => {
        return name.length > MAX_LENGTH_NAMES ? `${name.substring(0, MAX_LENGTH_NAMES)}...` : name;
    };

    onDragEnd = ({ oldIndex, newIndex }) => {
        this.props.editValues(arrayMove(this.props.values, oldIndex, newIndex));

        this.setState({
            isSorting: false
        });
    };

    handleDelete = value => () => {
        this.setState({
            valueForDelete: value
        });
    };

    handleWarningDisagree = () => {
        this.setState({
            valueForDelete: null
        });
    };

    handleWarningAgree = () => {
        const { valueForDelete } = this.state;

        this.props.onDelete(valueForDelete);
        this.setState({
            valueForDelete: null
        });
    };

    render () {
        const { classes, maxLength, title, onFormOpen, values } = this.props;
        const { selectedCard, valueForDelete } = this.state;
        const checkMaxItemLength = () => values.length === maxLength;

        return <div>
            <div className={classes.wrapp}>
                <div className={classes.header}>
                    <Typography variant='h5' className={classes.title}>{title}</Typography>
                    <Tooltip title='Добавить'>
                        <IconButton disabled={checkMaxItemLength()} onClick={onFormOpen('new')}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <Divider />
                <Cards
                    axis='xy'
                    values={values}
                    selectedCard={selectedCard}
                    onSelectedCard={this.handleSelectedCard}
                    onItemDelete={this.handleDelete}
                    onEdit={onFormOpen}
                    classes={classes}
                    getCorrectName={this.getCorrectName}
                    onSortEnd={this.onDragEnd}
                    useDragHandle
                />
            </div>
            <Dialog
                open={!!valueForDelete}
                onClose={this.handleWarningDisagree}
            >
                <DialogTitle>Вы точно хотите удалить ?</DialogTitle>
                <DialogContent className={classes.warningContent}>
                    <DialogContentText>{valueForDelete && getName(valueForDelete.value)}</DialogContentText>
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

export default withStyles(materialStyles)(RvvCardsKeyFacts);
