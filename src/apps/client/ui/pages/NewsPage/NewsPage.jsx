import React, { Component } from 'react';
import styles from './NewsPage.css';
import classNames from 'classnames';

const NEWS_CATEGORY_LIST = [
    {
        id: 'Всі новини',
        newsList: [
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            }
        ]
    },
    {
        id: 'Укрaїна',
        newsList: [
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            }
        ]
    },
    {
        id: 'Світ',
        newsList: [
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            },
            {
                date: '16 серпня 2019',
                title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК'
            }
        ]
    }
];
const NEWS_CONTENT = {
    url: 'https://target.scene7.com/is/image/Target/GUEST_8a2d26bb-eb84-45ce-8066-0d4547d65641?wid=488&hei=488&fmt=pjpeg',
    date: '16 серпня 2019',
    title: 'У Європейському Союзі заборонили використання пластикових товарів – експертна оцінка УКРПЕК',
    text:
    // eslint-disable-next-line max-len
        `Голова Української Пакувально-Екологічної Коаліції (УКРПЕК) Володимир Слабий прокоментував вольове рішення Європейського парламенту щодо поступового введення заборони використання одноразових виробів з пластику (посуду, ватних паличок, пакетів, соломинок для напоїв, столового приладдя тощо). На думку керівника УКРПЕК, така ініціатива здатна з роками значно покращити екологічну ситуацію, проте різких кроків у цьому напрямку краще уникати. Безумовно, рівень забруднення довкілля треба зменшувати, але при цьому заборону пластикових виробів слід впроваджувати поступово. Форсування подій неминуче призведе до величезних економічних втрат, зокрема до скорочення робочих місць і масового закриття підприємств, які виробляють ці групи товарів. «Директива ЄС передбачає, що протягом двох років країни Європейського Союзу запровадять це законодавство у себе. Для цього вони повинні все порахувати та мати чітке розуміння того, які саме види можна замінити, які є перспективні технології. На це дають два роки. Ми, звісно, хочемо отак раз – і відмінити, але ж повинні розуміти, що є люди, підприємства, колективи, які зараз випускають цю продукцію», – вважає Володимир Слабий. Нагадаємо, парламент ЄС підтримав пропозиції Європейської комісії з 2021 року ввести заборону використання окремих груп і найменувань товарів із пластику, які забруднюють навколишнє середовище. Згідно з оприлюдненими планами з 2025 року такі пластикові вироби, як  пляшки для напоїв, одноразові коробки, харчові контейнери усіх типів, необхідно буде окремо збирати та відправляти на повторну переробку обсягом не менш як 90% від загальної кількості. Більш того, 2030 року уся пластикова упаковка на ринках країн Європейського Союзу має стати перероблюваною. Зі свого боку держави – члени ЄС повинні найближчим часом підготувати чіткі національні стратегії заохочення населення до використання багаторазових товарів і таких, які є придатними для подальшої переробки.`
};

class NewsPage extends Component {
    constructor (...args) {
        super(...args);

        this.state = {
            isClicked: {}
        };
    }

    handleCategoryClick = i => () => {
        this.setState({
            isClicked: {
                ['tabNumber' + i]: !this.state.isClicked['tabNumber' + i]
            }
        });
    };

    render () {
        return <section className={styles.newsContainer}>
            <div className={styles.newsContentContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.rectangleGreen}/>
                    <div className={styles.title}>Останні оновлення</div>
                </div>
                <div className={styles.newsContent}>
                    <div className={styles.newsCover}><img className={styles.coverImage} src={NEWS_CONTENT.url} alt={NEWS_CONTENT.title}/></div>
                    <div className={styles.news}>
                        <div className={styles.newsDate}>{NEWS_CONTENT.date}</div>
                        <div className={styles.newsTitle}>{NEWS_CONTENT.title}</div>
                        <div className={styles.newsText}>{NEWS_CONTENT.text}</div>
                    </div>
                </div>
                <div className={styles.nextNews}>
                    <div className={styles.nextNewsInfo}>
                        <div className={styles.nextNewsHeader}>
                            <div className={styles.next}>Наступна новина</div>
                            <div className={styles.nextNewsDate}>17 cерпня 2019</div>
                        </div>
                        <div className={styles.nextNewsTitle}>Українська Пакувально-Екологічна Коаліція нагадала про потребу сортувати побутові відходи</div>
                    </div>
                    <div className={styles.nextNewsButton}>
                        <img className={styles.arrowIcon} src='/src/apps/client/ui/pages/NewsPage/images/downArrowGreen.png' alt='arrow'/>
                    </div>
                </div>
            </div>
            <div className={styles.newsMenuContainer}>
                <ul>
                    {
                        NEWS_CATEGORY_LIST.map((newsCategory, i) =>
                            <li key={i}>
                                <div className={styles.newsCategory} onClick={this.handleCategoryClick(i)}>
                                    <div className={styles.newsCategoryTitle}>
                                        <div className={styles.categoryTitle}>{newsCategory.id}</div>
                                    </div>
                                    <div className={classNames(!this.state.isClicked['tabNumber' + i] ? styles.arrowButtonDown : styles.arrowButtonUp)}>
                                        <img
                                            className={styles.categoryArrowIcon}
                                            src='/src/apps/client/ui/pages/NewsPage/images/downArrowBlack.png'
                                            alt='arrow'
                                        />
                                    </div>
                                </div>
                                <ul className={classNames(styles.categoryNewsList, this.state.isClicked['tabNumber' + i] && styles.categoryNewsListAnimated)}>
                                    {
                                        newsCategory.newsList.map((news, j) =>
                                            <li className={classNames(styles.newsCardContainer, this.state.isClicked['tabNumber' + i] && styles.newsCardContainerAnimated)}
                                                key={j} style={{ transitionDelay: `${j * 0.2}s` }}>
                                                <div className={styles.newsDate}>{news.date}</div>
                                                <div className={styles.newsTitle}>{news.title}</div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </li>
                        )
                    }
                </ul>
            </div>
        </section>;
    }
}

export default NewsPage;
