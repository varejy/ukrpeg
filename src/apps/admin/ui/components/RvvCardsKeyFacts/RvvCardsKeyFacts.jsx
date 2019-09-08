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

import arrayMove from '../../../utils/arrayMove';

import noop from '@tinkoff/utils/function/noop';

import { withStyles } from '@material-ui/core/styles';

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
        position: 'absolute',
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

const ButtonSortable = SortableHandle(({ classes }) => (
    <div className={classes.cardSortableBtn}/>
));

const CardItem = SortableElement(({ card, check, index, onSelectedCard, onItemDelete, onEdit, getCorrectName, classes }) => (
    <div className={classes.cardLink} >
        <div className={classes.fileItemContainer}>
            <IconButton
                aria-label='Delete'
                onClick={onItemDelete(index)}
            >
                <DeleteIcon />
            </IconButton>
            <IconButton
                aria-label='Edit'
                onClick={onEdit(index)}
            >
                <EditIcon />
            </IconButton>
        </div>
        <ButtonSortable onClick={onSelectedCard(card)} classes={classes} />
        <Card className={classNames(classes.card, { [classes.selectedCard]: check(card.positionIndex) })}>
            <CardHeader
                title={getCorrectName(card.title)}
            />
            <CardContent>
                <Typography variant="body2" component="p">
                    {getCorrectName(card.description)}
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
        onDelete: PropTypes.func,
        onEdit: PropTypes.func
    };

    static defaultProps = {
        values: [],
        maxLength: Infinity,
        title: '',
        onFormOpen: noop,
        onDelete: noop,
        onEdit: noop
    };

    state = {
        isSorting: false,
        selectedCard: {},
        values: this.props.values
    };

    handleFeatureAdd = () => {
        /* const { values } = this.props;

        this.props.onChange([
            ...values,
            ''
        ]); */
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
        this.setState({
            values: arrayMove(this.state.values, oldIndex, newIndex),
            isSorting: false
        });
    };

    render () {
        const { classes, maxLength, title, onFormOpen, onDelete, onEdit } = this.props;
        const { selectedCard, values } = this.state;
        const checkMaxItemLength = () => values.length === maxLength;

        return <div>
            <div className={classes.wrapp}>
                <div className={classes.header}>
                    <Typography variant='h5' className={classes.title}>{title}</Typography>
                    <Tooltip title='Добавить'>
                        <IconButton disabled={checkMaxItemLength()} onClick={onFormOpen}>
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
                    onItemDelete={onDelete}
                    onEdit={onEdit}
                    classes={classes}
                    getCorrectName={this.getCorrectName}
                    onSortEnd={this.onDragEnd}
                    useDragHandle
                />
            </div>
        </div>;
    }
}

export default withStyles(materialStyles)(RvvCardsKeyFacts);
