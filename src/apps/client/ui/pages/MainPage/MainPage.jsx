import React, { Component } from 'react';
import Content from '../../components/Content/Content';
import Companies from '../../components/Companies/Companies';
import Articles from '../../components/Articles/Articles';

class MainPage extends Component {
    render () {
        return <section>
            <Content />
            <Companies />
            <Articles />
        </section>;
    }
}

export default MainPage;
