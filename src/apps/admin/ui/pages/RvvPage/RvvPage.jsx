import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Lists from '../../components/Lists/Lists';

import { connect } from 'react-redux';
import getRvv from '../../../services/getRvv';

import noop from '@tinkoff/utils/function/noop';

import RvvCardPilotProject from '../../components/RvvCardPilotProject/RvvCardPilotProject';
import RvvCardsKeyFacts from '../../components/RvvCardsKeyFacts/RvvCardsKeyFacts';

import { withStyles } from '@material-ui/core/styles';

const arrayForOnePage = [
    {
        title: '2312 Напрацювати досвід відносин з усіма учасниками схеми РВВ: між собою, з органами місцевого самоврядування, з організаціями що займаються збором сортуванням та переробкою відходів.',
        positionIndex: 1
    },
    {
        title: 'Виробити схему відносин з фіскальними органами, оскільки діяльність організацій РВВ є неприбутковою.',
        positionIndex: 2
    },
    {
        title: 'Напрацювати досвід відносин з усіма учасниками схеми РВВ: між собою, з органами місцевого самоврядування, з організаціями що займаються збором сортуванням та переробкою відходів.',
        positionIndex: 3
    }
];

const arrayForTwoPage = [
    {
        imgPath: 'http://localhost:4000/src/apps/admin/files/news-5bt8oek0534v3r-avatar1567590878621.png',
        imgAlt: 'test1',
        title: 'Напрацювати досвід відносин з усіма учасниками схеми РВВ: між собою, з органами місцевого самоврядування, з організаціями що займаються збором сортуванням та переробкою відходів.'
    },
    {
        imgPath: 'http://localhost:4000/src/apps/admin/files/news-5bt29rk03mlgr0-avatar1567590743180.png',
        imgAlt: 'test2',
        title: 'Виробити схему відносин з фіскальними органами, оскільки діяльність організацій РВВ є неприбутковою.'
    }
];

const arrayForFourPage = [
    {
        title: 'Дослідження сфери поводження з упаковкою та її відходами в Україні.',
        positionIndex: 1
    },
    {
        title: 'Впровадження пілотних проектів у сфері поводження з відходами упаковки.',
        positionIndex: 2
    },
    {
        title: "Розробка рекомендацій, які можуть бути запропоновані суб'єктам виробництва та ринку, професійним і громадським організаціям, органам державної влади та місцевого самоврядування і навіть споживачам товарів в упаковці – щодо безпечного екологічного розвитку у сфері пакувальної технології та поводження з упаковкою та її відходами.",
        positionIndex: 3
    }
];

const arrayForFivePage = [
    {
        title: '200+',
        description: 'новеньких сміттєвих контейнерів встановили у місті',
        positionIndex: 1
    },
    {
        title: '25%',
        description: 'сміття було зібрано від загального обсягу відходів',
        positionIndex: 2
    },
    {
        title: '320',
        description: 'тонн було зібрано відходів упаковки упродовж першого року з дня старту проекту',
        positionIndex: 3
    }
];

const arrayForSixPage = [
    {
        title: 'ТОВ «Кен-Пак (Україна)»',
        positionIndex: 1
    },
    {
        title: 'ПрАТ «Елопак-Фастiв»',
        positionIndex: 2
    },
    {
        title: "ІП «Кока-Кола Беверіджиз Україна Лімітед»",
        positionIndex: 3
    }
];

const materialStyles = theme => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        margin: '30px 20%',
        width: '1200px',
        backgroundColor: theme.palette.background.paper,
        border: '#e4e4e4 solid 1px',
        borderRadius: '5px',
        padding: theme.spacing.unit * 4,
        outline: 'none',
        overflowY: 'auto',
        maxHeight: '100vh'
    },
    wrapp: {
        width: '50%',
        margin: '20px auto'
    }
});

const mapStateToProps = ({ rvv }) => {
    return {
        rvv: rvv.rvv
    };
};

const mapDispatchToProps = (dispatch) => ({
    getRvv: payload => dispatch(getRvv(payload)),
});

class RvvPage extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    static defaultProps = {
    };

    constructor (...args) {
        super(...args);

        this.state = {
            tabsValue: 0
        };
    }

    componentDidMount () {
        this.props.getRvv()
            .then(() => {
                console.log(this.props)
            });
    }

    handlePlanFormOpen () {

    }

    handleTableChange = event => () => {
        this.setState({
            tabsValue: event
        });
    };

    renderPageOne = () => {
        const { classes } = this.props;

        return <div className={classes.wrapp}>
            <Lists
                values={arrayForOnePage}
                sortable={true}
                numeration={true}
                maxLength={10}
                title='Планы'
                onFormOpen={this.handlePlanFormOpen}
            />
        </div>;
    }

    renderPageTwo = () => {
        const { classes } = this.props;

        return <div className={classes.wrapp}>
            <Lists
                values={arrayForTwoPage}
                sortable={true}
                isImage={true}
                nameToolTip={true}
                title='Зачем нужен РВВ'
                onFormOpen={this.handlePlanFormOpen}
            />
        </div>;
    }

    renderPageThree = () => {
        const { classes } = this.props;

        return (
            <div className={classes.modalContent}>
                <RvvCardPilotProject
                    onDone={noop}
                    title='Редактирование пилотного проекта'
                />
            </div>
        );
    }

    renderPageFour = () => {
        const { classes } = this.props;

        return <div className={classes.wrapp}>
            <Lists
                values={arrayForFourPage}
                sortable={true}
                numeration={true}
                maxLength={9}
                title='Основные силы'
                onFormOpen={this.handlePlanFormOpen}
            />
        </div>;
    }

    renderPageFive = () => {
        const { classes } = this.props;
        
        return <div className={classes.wrapp}>
            <RvvCardsKeyFacts
                title='Ключевые факты'
                maxLength={3}
                values={arrayForFivePage}
            />
        </div>;
    }

    renderPageSix = () => {
        const { classes } = this.props;

        return <div className={classes.wrapp}>
            <Lists
                values={arrayForSixPage}
                sortable={true}
                title='В состав входят'
                onFormOpen={this.handlePlanFormOpen}
            />
        </div>;
    }

    renderPageSeven = () => {
        const { classes } = this.props;

        return (
            <div className={classes.modalContent}>
                <RvvCardPilotProject
                    onDone={noop}
                    type='message'
                    title='Редактирование cообщение'
                />
            </div>
        );
    }

    render () {
        const { tabsValue } = this.state;

        return <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={tabsValue}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab onClick={this.handleTableChange(0)} label="Планы" />
                    <Tab onClick={this.handleTableChange(1)} label="Зачем нужен РВВ" />
                    <Tab onClick={this.handleTableChange(2)} label="Пилотный проект" />
                    <Tab onClick={this.handleTableChange(3)} label="Основные силы" />
                    <Tab onClick={this.handleTableChange(4)} label="Ключевые факты" />
                    <Tab onClick={this.handleTableChange(5)} label="В состав входят" />
                    <Tab onClick={this.handleTableChange(6)} label="Сообщение" />
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={tabsValue}
                onChangeIndex={this.handleChangeIndex}
            >
                {this.renderPageOne(0)}
                {this.renderPageTwo(1)}
                {this.renderPageThree(2)}
                {this.renderPageFour(3)}
                {this.renderPageFive(4)}
                {this.renderPageSix(5)}
                {this.renderPageSeven(6)}
            </SwipeableViews>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(RvvPage));
