import React, { Component } from 'react';

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Lists from '../../components/Lists/Lists';

import { withStyles } from '@material-ui/core/styles';

const arrayForOnePage = [
    {
        title: 'Напрацювати досвід відносин з усіма учасниками схеми РВВ: між собою, з органами місцевого самоврядування, з організаціями що займаються збором сортуванням та переробкою відходів.'
    },
    {
        title: 'Виробити схему відносин з фіскальними органами, оскільки діяльність організацій РВВ є неприбутковою.'
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

const materialStyles = theme => ({
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
    planWrapp: {
        width: '50%',
        margin: '20px auto',
        padding: '20px',
        border: '#e4e4e4 solid 1px',
        borderRadius: "5px"
    },
    title: {
        height: '30px',
        margin: '0 0 10px 7px'
    },
});

class RvvPage extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            tabsValue: 0
        }
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

        return <div className={classes.planWrapp}>
            <Typography variant='h5' className={classes.title}>Планы</Typography>
            <Divider/>
            <Lists
                values={arrayForOnePage}
                sortable={true}
                onFormOpen={this.handlePlanFormOpen}
            />
        </div>
    }

    renderPageTwo = () => {
        const { classes } = this.props;

        return <div className={classes.planWrapp}>
            <Typography variant='h5' className={classes.title}>Зачем нужен РВВ</Typography>
            <Divider/>
            <Lists
                values={arrayForTwoPage}
                sortable={true}
                isImage={true}
                onFormOpen={this.handlePlanFormOpen}
            />
        </div>
    }

    render () {
        const { tabsValue } = this.state;

        return <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={tabsValue}
                    onChange={this.handleChange}
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
            </SwipeableViews>
        </div>;
    }
}

export default withStyles(materialStyles)(RvvPage);
