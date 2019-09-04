import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import arrayMove from '../../../utils/arrayMove';

import { withStyles } from '@material-ui/core/styles';

const materialStyles = {
    cardWrapp: {
        width: '50%',
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
        position: 'relative'
    },
    selectedCard: {
        border: '1px solid rgb(63, 80, 181)'
    },
    cardSortableBtn: {
        height: '100%',
        width: '100%',
        zIndex: 2312,
        position: 'absolute'
    }
};

const ButtonSortable = SortableHandle(({ classes }) => (
    <div className={classes.cardSortableBtn}/>
));

const CardItem = SortableElement(({ card, check, onSelectedCard, getCorrectName, classes }) => (
    <div onClick={onSelectedCard(card)} className={classes.cardLink} >
        <ButtonSortable classes={classes}/>
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
        values: PropTypes.array
    };

    static defaultProps = {
        values: []
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
        const { classes } = this.props;
        const { selectedCard, values } = this.state;

        return <div>
            <Cards
                axis='xy'
                values={values}
                selectedCard={selectedCard}
                onSelectedCard={this.handleSelectedCard}
                classes={classes}
                getCorrectName={this.getCorrectName}
                onSortEnd={this.onDragEnd}
                useDragHandle
            />
            {
                /* <div className={classes.addButton}>
                    <Fab color='primary' size='small' onClick={this.handleFeatureAdd}>
                        <AddIcon />
                    </Fab>
                </div> */
            }
        </div>;
    }
}

export default withStyles(materialStyles)(RvvCardsKeyFacts);
