import React, { Component } from 'react';
import styles from './RVVPage.css';
import classNames from 'classnames';
import propOr from '@tinkoff/utils/object/propOr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = ({ application, rvv }) => {
    return {
        mediaWidth: application.media.width,
        langMap: application.langMap,
        lang: application.lang,
        rvv: rvv.rvv,
        partners: application.partners
    };
};

class RVVPage extends Component {
    static propTypes = {
        rvv: PropTypes.object.isRequired,
        langMap: PropTypes.object.isRequired,
        lang: PropTypes.string.isRequired,
        partners: PropTypes.array.isRequired,
        mediaWidth: PropTypes.number.isRequired
    };

    constructor (...args) {
        super(...args);
        const { mediaWidth } = this.props;

        this.state = {
            activeSlide: 0,
            left: 0,
            slideWidth: mediaWidth
        };
    }

    handlePaginationClick = i => () => {
        const { mediaWidth } = this.props;

        this.setState({
            activeSlide: i,
            left: mediaWidth * i
        });
    };

    handleArrowClick = (direction) => () => {
        const { activeSlide } = this.state;
        const { mediaWidth } = this.props;
        const newActiveSlide = direction === 'left' ? activeSlide - 1 : activeSlide + 1;

        this.setState({
            activeSlide: newActiveSlide,
            left: mediaWidth * newActiveSlide
        });
    };

    render () {
        const { mediaWidth, langMap, rvv, lang, partners } = this.props;
        const { left, activeSlide } = this.state;
        const text = propOr('rvv', {}, langMap);
        let PAGINATION = [];
        for (let i = 0; i < rvv.plans.length; i++) {
            PAGINATION.push(i + 1);
        }

        return <section className={styles.pageContainer}>
            <div className={styles.gridContainer}>
                <div className={classNames(styles.column, styles.column1)}/>
                <div className={classNames(styles.column, styles.column2)}/>
                <div className={classNames(styles.column, styles.column3)}/>
                <div className={classNames(styles.column, styles.column4)}/>
                <div className={classNames(styles.column, styles.column5)}/>
            </div>
            <div className={styles.partnersMobile}>
                <div className={styles.titleContainer}>
                    <div className={styles.rectangleGreen}/>
                    <div className={styles.title}>Учасники пілотного проекту</div>
                </div>
                <div className={styles.partnersList}>
                    {
                        partners.map((partner, i) =>
                            <div className={styles.logoContainer} key={i}>
                                <img className={styles.logo} src={partner.path} alt={partner.name}/>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={styles.containerPlansMobile}>
                <div className={styles.patternContainerBig} />
                <div className={styles.courses}>
                    <div className={styles.backgroundWhite}/>
                    <div className={styles.plansHeader}>
                        <div className={styles.titleContainer}>
                            <div className={styles.rectangleGreen}/>
                            <div className={styles.title}>Плани</div>
                        </div>
                        <div className={styles.plansButtons}>
                            <div onClick={activeSlide !== 0 ? this.handleArrowClick('left') : undefined}
                                className={classNames(styles.buttonLeft, activeSlide === 0 ? styles.buttonDisabled : styles.buttonActive)}
                            >
                                <img className={styles.button} src={activeSlide === 0
                                    ? '/src/apps/client/ui/pages/RVVPage/images/downArrowBlack.png'
                                    : '/src/apps/client/ui/pages/RVVPage/images/downArrowGreen.png'
                                } alt='arrowLeft'/>
                            </div>
                            <div onClick={activeSlide !== rvv.plans.length - 1 ? this.handleArrowClick('right') : undefined}
                                className={classNames(styles.buttonRight, activeSlide === rvv.plans.length - 1 ? styles.buttonDisabled : styles.buttonActive)}
                            >
                                <img className={styles.button} src={activeSlide === rvv.plans.length - 1
                                    ? '/src/apps/client/ui/pages/RVVPage/images/downArrowBlack.png'
                                    : '/src/apps/client/ui/pages/RVVPage/images/downArrowGreen.png'
                                } alt='arrowRight'/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.coursesContainer}>
                        <div className={styles.courseInfo} style={{ left: `-${left}px` }}>
                            {
                                rvv.plans.map((step, i) =>
                                    <div key={i} className={styles.course}>
                                        <div className={styles.courseNumber}>{i + 1}</div>
                                        <div className={styles.courseText}><div className={styles.text}>{step.texts[lang].title}</div></div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={styles.plansPagination}>
                        {
                            PAGINATION.map((slideNumber, i) =>
                                <div className={classNames(styles.paginationSquare, {
                                    [styles.paginationSquareActive]: i === activeSlide
                                })}
                                key={i}
                                onClick={this.handlePaginationClick(i)}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={styles.plans}>
                <div className={styles.titleContainer}>
                    <div className={styles.rectangleGreen}/>
                    <div className={styles.title}>{text.titleFirst}</div>
                </div>
                <div className={styles.plansContent}>
                    {
                        rvv.plans.map((step, i) =>
                            <div key={i} className={styles.step}>
                                <div className={styles.stepNumber}>{i + 1}</div>
                                <div className={styles.stepText}><div className={styles.text}>{step.texts[lang].title}</div></div>
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
                                rvv.why.map((benefit, i) =>
                                    <div key={i} className={styles.benefitContainer}>
                                        <div className={styles.benefitIconContainer}>
                                            <img className={styles.benefitIcon} src={benefit.path} alt={benefit.alt}/>
                                        </div>
                                        <div className={styles.benefitText}>{benefit.texts[lang].title}</div>
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
                        <div className={styles.title}>{rvv.pProject.texts[lang].title}</div>
                    </div>
                    <div className={styles.projectInfo}>
                        {rvv.pProject.texts[lang].description}
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
                                rvv.mainForces.map((course, i) =>
                                    <div key={i} className={styles.course}>
                                        <div className={styles.courseNumber}>{i + 1}</div>
                                        <div className={styles.courseText}><div className={styles.text}>{course.texts[lang].title}</div></div>
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
                        rvv.keyFacts.map((fact, i) =>
                            <div className={styles.factContainer} key={i}>
                                <div className={styles.factValue}>
                                    <div className={styles.valueNumber}>{fact.texts[lang].title}</div>
                                    <div className={styles.valueSign}>{fact.texts[lang].sign}</div>
                                </div>
                                <div className={styles.factText}>{fact.texts[lang].description}</div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={styles.partnersContainer}>
                <div className={styles.partners}>
                    <div className={styles.partnersList}>
                        {
                            partners.map((partner, i) =>
                                <div className={styles.logoContainer} key={i}>
                                    <img className={styles.logo} src={partner.path} alt={partner.name}/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={styles.participantsContainer}>
                <div className={styles.patternContainerBig} />
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
                            rvv.composition.map((participant, i) =>
                                <li key={i} className={styles.participant}>{participant.texts[lang].title}</li>
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className={styles.containerIdea}>
                <div className={styles.patternContainerBig} />
                <div className={styles.idea}>
                    <div className={styles.ideaContainer}>
                        <div className={styles.imageContainer}>
                            <img className={styles.recycleImage}
                                src={mediaWidth > 780
                                    ? '/src/apps/client/ui/pages/RVVPage/images/recycle.png'
                                    : '/src/apps/client/ui/pages/RVVPage/images/recycleGreen.png'
                                }
                                alt='recycle'/>
                        </div>
                        <div className={styles.ideaText}>
                            {rvv.message.texts[lang].title}
                        </div>
                    </div>
                </div>
                <div className={styles.backgroundGreen}/>
            </div>
        </section>;
    }
}

export default connect(mapStateToProps)(RVVPage);
