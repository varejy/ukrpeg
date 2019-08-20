import React, { Component } from 'react';
import styles from './RVVPage.css';
import { connect } from 'react-redux';

const PLANS_LIST = [
    'Напрацювати досвід відносин з усіма учасниками схеми РВВ: між собою, з органами місцевого самоврядування, з організаціями що займаються збором сортуванням та переробкою відходів.',
    'Виробити схему відносин з фіскальними органами, оскільки діяльність організацій РВВ є неприбутковою.',
    'Випробувати ефективність принципів РВВ в Україні.',
    'Вивчити реакцію населення на впровадження роздільного збору.',
    'Знайти ефективні засоби комунікацій з населенням, щоб воно більш активно практикувало роздільний збір та підтримувало принципи РВВ.',
    'Зрозуміти можливості РВВ з  виконання норм збору упаковки (яку частку того чи іншого виду відходів  упаковки можна зібрати).',
    'Виокремити найбільш ефективні методи і прийоми, які можна буде згодом поширювати на діяльність організацій розширеної відповідальності виробника по всій Україні.',
    'Провести сезоні дослідження морфологічного складу побутових відходів і окремо відходів упаковки.',
    'Визначити на прикладі конкретного міста рівень фінансових затрат на організацію роздільного збирання, сортування і транспортування вторсировини на переробні підприємства.',
    'Провести маркетинговий аналіз ринку України, в частині працюючих спеціалізованих організацій по збиранню, вивезенню, сортувальних і переробних підприємств, цінової політики всіх учасників цього сегменту ринку.'
];
const BENEFITS = [
    {
        text: 'Розширена відповідальність виробника (РВВ) - визнаний принцип екологічної політики  , щодо забезпечення відповідальності виробників продукції за управління стадією відходів життєвого циклу продукції та матеріалів.',
        path: 'src/apps/client/ui/pages/RVVPage/images/benefit1.png'
    },
    {
        text: 'РВВ – передбачена у Національній стратегії управління відходами, отже з\'явиться в Україні.',
        path: 'src/apps/client/ui/pages/RVVPage/images/benefit2.png'
    },
    {
        text: 'РВВ дозволяє збирати відходи товарів та упаковки без державних коштів – лише за кошти виробників.',
        path: 'src/apps/client/ui/pages/RVVPage/images/benefit3.png'
    },
    {
        text: 'РВВ – принцип, який підтримують в Україні відповідальні виробники та імпортери.',
        path: 'src/apps/client/ui/pages/RVVPage/images/benefit4.png'
    },
    {
        text: 'РВВ – головний метод поводження з відходами упаковки та багатьох інших товарів у ЄС – у деяких країнах до 80% відходів упаковки збирається завдяки РВВ.',
        path: 'src/apps/client/ui/pages/RVVPage/images/benefit5.png'
    }
];
const mapStateToProps = () => {
    return {
    };
};

class RVVPage extends Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    render () {
        return <section className={styles.pageContainer}>
            <div className={styles.plans}>
                <div className={styles.titleContainer}>
                    <div className={styles.rectangleGreen}/>
                    <div className={styles.title}>Плани</div>
                </div>
                <div className={styles.plansContent}>
                    {
                        PLANS_LIST.map((step, i) =>
                            <div key={i} className={styles.step}>
                                <div className={styles.stepNumber}>{i + 1}</div>
                                <div className={styles.stepText}>{step}</div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={styles.whyRVV}>
                <div className={styles.titleContainer}>
                    <div className={styles.rectangleGreen}/>
                    <div className={styles.title}>Навіщо потрібне РВВ:</div>
                </div>
                <div className={styles.benefits}>
                    {
                        BENEFITS.map((benefit, i) =>
                            <div key={i} className={styles.benefitContainer}>
                                <div className={styles.benefitIconContainer}>
                                    <img className={styles.benefitIcon} src={benefit.path} alt={benefit.text}/>
                                </div>
                                <div className={styles.benefitText}>{benefit.text}</div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={styles.project}>
                <div className={styles.titleContainer}>
                    <div className={styles.rectangleGreen}/>
                    <div className={styles.title}>Пілотний проект у Вишгороді</div>
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
        </section>;
    }
}

export default connect(mapStateToProps)(RVVPage);
