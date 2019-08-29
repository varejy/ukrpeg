import React, { Component } from 'react';

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Lists from '../../components/Lists/Lists';

import NewsForm from '../../components/NewsForm/NewsForm';

const testArray = [
    {
        title: 'test1'
    },
    {
        title: 'test2'
    }
]

class RvvPage extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            tabsValue: 0
        }
    }

    handleTableChange = event => () => {
        this.setState({
            tabsValue: event
        });
    };

    renderPageOne = () => {
        return <Lists
            values={testArray} // Сами значения
            sortable={true} // Сортабельность
            form={<NewsForm />} // Сюда сбрасываем нужную форму 
            formValuesName='news' // Сюда имя пропса для формы
        />
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
                    <Tab onClick={this.handleTableChange(1)} label="Зачем нужно РВВ" />
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
            </SwipeableViews>
        </div>;
    }
}

export default RvvPage;
