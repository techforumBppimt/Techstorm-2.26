import React from 'react';
import { Accordion } from 'react-bootstrap';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import AccordionItem from '../../Utilities/AccordionItem/AccordionItem';

const faqData = [
    {
        title: 'Breaking The Rules Using SQLite To Demo Web?',
        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
    },
    {
        title: 'Monthly Web Development Update Pragmatic Releasing?',
        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
    },
    {
        title: 'How To Use Underlined Text To Improve User Experience?',
        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
    },
]

const Faqs = () => {
    return (
        <React.Fragment>
            <Breadcrumb pageTitle={'Faq'} currentPage={'Faq'} />

            {/* <Faq/> */}
            <section id="faq" className="faq-area pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="faq-wrap">
                                <h4 className="mb-30">{'Cavalier Studios has been creating'}</h4>
                                <p>{'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="faq-wrap">
                                <Accordion className="accordion" id="accordionExample" defaultActiveKey="0">
                                    {
                                        faqData.map((data, index) => {
                                            const { title, bodyText } = data;
                                            return (
                                                <AccordionItem
                                                    id={index}
                                                    title={title}
                                                    body={bodyText} />
                                            );
                                        })
                                    }
                                </Accordion>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-50">
                        <div className="col-lg-6 col-md-6">
                            <div className="faq-wrap">
                                <h4 className="mb-30">{'Cavalier Studios has been creating'}</h4>
                                <p>{'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="faq-wrap">
                                <Accordion className="accordion" id="accordionExample" defaultActiveKey="0">
                                    {
                                        faqData.map((data, index) => {
                                            const { title, bodyText } = data;
                                            return (
                                                <AccordionItem
                                                    id={index}
                                                    title={title}
                                                    body={bodyText} />
                                            );
                                        })
                                    }
                                </Accordion>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </React.Fragment>
    )
}

export default Faqs;
