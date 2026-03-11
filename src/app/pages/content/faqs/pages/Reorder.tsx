import React, {useEffect, useState} from 'react';
import {Sections} from '../../../../helpers/sections';
import {Actions, PageTypes, WickToastType} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {KTCardHeader} from "../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import {KTCard, KTCardBody} from "../../../../../_metronic/helpers";
import {Faq} from "../../../../models/content/Faq.ts";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";
import {getErrorPage, submitRequest} from "../../../../helpers/requests.ts";
import {getAllFaqs, reorderFaq} from "../../../../requests/content/Faq.ts";
import {Link, useNavigate} from "react-router-dom";
import {AlertMessageGenerator} from "../../../../helpers/AlertMessageGenerator.ts";
import {Button} from "react-bootstrap";

const FaqReorder = () => {
    const wickApp = useWickApp();
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_FAQS, PageTypes.REORDER));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Function to handle the drag end event
    const onDragEnd = (result: any) => {
        const {destination, source} = result;

        if (!destination) return; // Dropped outside the list

        const reorderedItems = Array.from(faqs);
        const [removed] = reorderedItems.splice(source.index, 1);
        reorderedItems.splice(destination.index, 0, removed);

        setFaqs(reorderedItems);
    };

    const handleSubmit = async () => {
        submitRequest(reorderFaq, [{'faqs': faqs}], () => {
            // it's faq for sure
            wickApp.setAlert({
                message: new AlertMessageGenerator('faq', Actions.REORDER, WickToastType.SUCCESS).message,
                type: WickToastType.SUCCESS
            })

            navigate(`/content/faqs/reorder`);
        });
    };

    useEffect(() => {
        submitRequest(getAllFaqs, [], (response) => {
            const errorPage = getErrorPage(response);

            if (errorPage) {
                navigate(errorPage);
            } else {
                setFaqs(response);
            }
        });
    }, []);

    return (
        <KTCard>
            <KTCardHeader text="Reorder FAQs"/>

            <KTCardBody>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {faqs.map((row, index) => (
                                    <Draggable key={row.id} draggableId={row.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    ...provided.draggableProps.style,
                                                    margin: '10px 0',
                                                    padding: '10px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '4px',
                                                    backgroundColor: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                    style={{cursor: 'grab', marginRight: '10px'}}
                                                >
                                                    <g>
                                                        <rect x="3" y="4" width="18" height="2" rx="1"
                                                              fill="currentColor"/>
                                                        <rect x="3" y="10" width="18" height="2" rx="1"
                                                              fill="currentColor"/>
                                                        <rect x="3" y="16" width="18" height="2" rx="1"
                                                              fill="currentColor"/>
                                                    </g>
                                                </svg>

                                                {/* FAQ Question */}
                                                {row.question[DEFAULT_LANGUAGE]}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <div className="separator mb-6"></div>

                <div className="d-flex justify-content-end">
                    <Button variant="twfirm" type="button" className={'me-2'} onClick={handleSubmit}>
                        Submit
                    </Button>

                    <Link to="/content/faqs/reorder">
                        <Button variant="light-secondary" type="submit">
                            Cancel
                        </Button>
                    </Link>
                </div>
            </KTCardBody>
        </KTCard>
    );
};

export default FaqReorder;
