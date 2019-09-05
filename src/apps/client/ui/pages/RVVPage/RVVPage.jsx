import React, { Component } from 'react';
import styles from './RVVPage.css';
import classNames from 'classnames';
import propOr from '@tinkoff/utils/object/propOr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PLANS_LIST = [
    // eslint-disable-next-line max-len
    'Напрацювати досвід відносин з усіма учасниками схеми РВВ: між собою, з органами місцевого самоврядування, з організаціями що займаються збором сортуванням та переробкою відходів.',
    'Виробити схему відносин з фіскальними органами, оскільки діяльність організацій РВВ є неприбутковою.',
    'Випробувати ефективність принципів РВВ в Україні.',
    'Вивчити реакцію населення на впровадження роздільного збору.',
    'Знайти ефективні засоби комунікацій з населенням, щоб воно більш активно практикувало роздільний збір та підтримувало принципи РВВ.',
    'Зрозуміти можливості РВВ з  виконання норм збору упаковки (яку частку того чи іншого виду відходів  упаковки можна зібрати).',
    // eslint-disable-next-line max-len
    'Виокремити найбільш ефективні методи і прийоми, які можна буде згодом поширювати на діяльність організацій розширеної відповідальності виробника по всій Україні.',
    'Провести сезоні дослідження морфологічного складу побутових відходів і окремо відходів упаковки.',
    // eslint-disable-next-line max-len
    'Визначити на прикладі конкретного міста рівень фінансових затрат на організацію роздільного збирання, сортування і транспортування вторсировини на переробні підприємства.',
    // eslint-disable-next-line max-len
    'Провести маркетинговий аналіз ринку України, в частині працюючих спеціалізованих організацій по збиранню, вивезенню, сортувальних і переробних підприємств, цінової політики всіх учасників цього сегменту ринку.'
];
const BENEFITS = [
    {
        // eslint-disable-next-line max-len
        description: 'Розширена відповідальність виробника (РВВ) - визнаний принцип екологічної політики  , щодо забезпечення відповідальності виробників продукції за управління стадією відходів життєвого циклу продукції та матеріалів.',
        path: '/src/apps/client/ui/pages/RVVPage/images/benefit1.png'
    },
    {
        description: 'РВВ – передбачена у Національній стратегії управління відходами, отже з\'явиться в Україні.',
        path: '/src/apps/client/ui/pages/RVVPage/images/benefit2.png'
    },
    {
        description: 'РВВ дозволяє збирати відходи товарів та упаковки без державних коштів – лише за кошти виробників.',
        path: '/src/apps/client/ui/pages/RVVPage/images/benefit3.png'
    },
    {
        description: 'РВВ – принцип, який підтримують в Україні відповідальні виробники та імпортери.',
        path: '/src/apps/client/ui/pages/RVVPage/images/benefit4.png'
    },
    {
        // eslint-disable-next-line max-len
        description: 'РВВ – головний метод поводження з відходами упаковки та багатьох інших товарів у ЄС – у деяких країнах до 80% відходів упаковки збирається завдяки РВВ.',
        path: '/src/apps/client/ui/pages/RVVPage/images/benefit5.png'
    }
];
const COURSES_LIST = [
    'Дослідження сфери поводження з упаковкою та її відходами в Україні.',
    'Впровадження пілотних проектів у сфері поводження з відходами упаковки.',
    // eslint-disable-next-line max-len
    'Розробка рекомендацій, які можуть бути запропоновані суб\'єктам виробництва та ринку, професійним і громадським організаціям, органам державної влади та місцевого самоврядування і навіть споживачам товарів в упаковці – щодо безпечного екологічного розвитку у сфері пакувальної технології та поводження з упаковкою та її відходами.'
];
const FACTS = [
    {
        text: 'новеньких сміттєвих контейнерів встановили у місті',
        value: '200',
        sign: '+'
    },
    {
        text: 'сміття було зібрано від загального обсягу відходів',
        value: '25',
        sign: '%'
    },
    {
        text: 'тонн було зібрано відходів упаковки упродовж першого року з дня старту проекту',
        value: '320',
        sign: ''
    }
];
const PARTNERS_LIST = [
    '/src/apps/client/ui/pages/RVVPage/images/elopak.png',
    '/src/apps/client/ui/pages/RVVPage/images/pepsico.png',
    '/src/apps/client/ui/pages/RVVPage/images/cocacola.png',
    '/src/apps/client/ui/pages/RVVPage/images/canpack.png',
    '/src/apps/client/ui/pages/RVVPage/images/tetrapack.png'
];
const PARTICIPANTS_LIST = [
    'ТОВ «Кен-Пак (Україна)»',
    'ПрАТ «Елопак-Фастiв»',
    'ІП «Кока-Кола Беверіджиз Україна Лімітед»',
    'ТОВ «Сандора»',
    'А/Т Тютюнова компанія «В. А. Т. – Прилуки»',
    'ТОВ «Тетра Пак»',
    'ТОВ «Нестле Україна»',
    'ТОВ «Проктер енд Гембл Україна»',
    'ТОВ «Данон Дніпро»',
    'ТОВ «Хенкель Україна»',
    'та інші.'
];
const mapStateToProps = ({ application }) => {
    return {
        langMap: application.langMap
    };
};

class RVVPage extends Component {
    static propTypes = {
        langMap: PropTypes.object.isRequired
    };

    render () {
        const { langMap } = this.props;
        const text = propOr('rvv', {}, langMap);

        return <section className={styles.pageContainer}>
            <div className={styles.gridContainer}>
                <div className={classNames(styles.column, styles.column1)}/>
                <div className={classNames(styles.column, styles.column2)}/>
                <div className={classNames(styles.column, styles.column3)}/>
                <div className={classNames(styles.column, styles.column4)}/>
                <div className={classNames(styles.column, styles.column5)}/>
            </div>
            <div className={styles.plans}>
                <div className={styles.titleContainer}>
                    <div className={styles.rectangleGreen}/>
                    <div className={styles.title}>{text.titleFirst}</div>
                </div>
                <div className={styles.plansContent}>
                    {
                        PLANS_LIST.map((step, i) =>
                            <div key={i} className={styles.step}>
                                <div className={styles.stepNumber}>{i + 1}</div>
                                <div className={styles.stepText}><div className={styles.text}>{step}</div></div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={styles.whyRVVContainer}>
                <div className={styles.whyRVV}>
                    <div className={styles.titleContainer}>
                        <div className={styles.rectangleGreen}/>
                        <div className={styles.title}>{text.titleSecond}</div>
                    </div>
                    <div className={styles.benefitsContainer}>
                        <div className={styles.benefits}>
                            {
                                BENEFITS.map((benefit, i) =>
                                    <div key={i} className={styles.benefitContainer}>
                                        <div className={styles.benefitIconContainer}>
                                            <img className={styles.benefitIcon} src={benefit.path} alt={benefit.description}/>
                                        </div>
                                        <div className={styles.benefitText}>{benefit.description}</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.projectContainer}>
                <div className={styles.project}>
                    <div className={styles.titleContainer}>
                        <div className={styles.rectangleGreen}/>
                        <div className={styles.title}>{text.titleThird}</div>
                    </div>
                    <div className={styles.projectInfo}>
                    Наприкінці листопада 2017 року в місті Вишгороді Київської області презентували перший в
                    Україні екологічний проект з роздільного збирання побутових відходів, заснований на принципах
                    розширеної відповідальності виробника (надалі – РВВ). Ініціатором проекту стала  Українська
                    Пакувально-Екологічна Коаліція (УКРПЕК), яка є неприбутковою організацією й об’єднує виробників
                    упаковки та товарів у ній, що працюють на ринку України. УКРПЕК підтримує  створення в Україні
                    систем роздільного збирання відходів упаковки на засадах РВВ і намагається закласти основи для
                    запровадження таких систем через ухвалення законів  і фактичну реалізацію пілотного проекту.
                    Для УКРПЕК надзвичайно важливою була  підтримка місцевої влади – відповідний Меморандум затвердили
                    на сесії Вишгородської міської ради.
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.patternContainerBig} />
                <div className={styles.courses}>
                    <div className={styles.backgroundWhite}/>
                    <div className={styles.titleContainer}>
                        <div className={styles.rectangleGreen}/>
                        <div className={styles.title}>{text.titleFourth}</div>
                    </div>
                    <div className={styles.coursesContainer}>
                        <div className={styles.courseInfo}>
                            {
                                COURSES_LIST.map((course, i) =>
                                    <div key={i} className={styles.course}>
                                        <div className={styles.courseNumber}>{i + 1}</div>
                                        <div className={styles.courseText}><div className={styles.text}>{course}</div></div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.facts}>
                <div className={styles.titleContainer}>
                    <div className={styles.rectangleWhite}/>
                    <div className={styles.whiteTitle}>{text.titleFifth}</div>
                </div>
                <div className={styles.factsInfo}>
                    {
                        FACTS.map((fact, i) =>
                            <div className={styles.factContainer} key={i}>
                                <div className={styles.factValue}>
                                    <div className={styles.valueNumber}>{fact.value}</div>
                                    <div className={styles.valueSign}>{fact.sign}</div>
                                </div>
                                <div className={styles.factText}>{fact.text}</div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={styles.partnersContainer}>
                <div className={styles.partners}>
                    <div className={styles.partnersList}>
                        {
                            PARTNERS_LIST.map((partner, i) =>
                                <div className={styles.logoContainer} key={i}>
                                    <img className={styles.logo} src={partner} alt='logo'/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={styles.participantsContainer}>
                <div className={styles.backgroundGrey}/>
                <div className={styles.participants}>
                    <div className={styles.titleContainer}>
                        <div className={styles.rectangleGreen}/>
                        <div className={styles.title}>
                            {text.titleSixth}
                        </div>
                    </div>
                    <ul className={styles.participantsList}>
                        {
                            PARTICIPANTS_LIST.map((participant, i) =>
                                <li key={i} className={styles.participant}>{participant}</li>
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className={styles.containerIdea}>
                <div className={styles.patternContainerBig} />
                <div className={styles.idea}>
                    <div className={styles.ideaContainer}/>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.imageContainer}>
                        <img src='/src/apps/client/ui/pages/RVVPage/images/recycle.png' alt='recycle'/>
                    </div>
                    <div className={styles.ideaText}>
                        Спільними зусиллями ми працюємо над оптимізацією роботи галузі, вдосконаленням нормативно-правової бази,
                        підвищенням споживчої культури в сфері поводження з упаковкою та її відходами.<br/>
                        На жаль, змінити минуле нікому не під силу, але наше майбутнє цілком залежить від того, що ми зможемо
                        спільними зусиллями створити чи впровадити саме сьогодні.
                    </div>
                </div>
                <div className={styles.backgroundGreen}/>
            </div>
        </section>;
    }
}

export default connect(mapStateToProps)(RVVPage);
