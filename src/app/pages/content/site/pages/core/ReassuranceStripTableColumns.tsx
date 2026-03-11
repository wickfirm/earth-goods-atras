import {Column} from 'react-table'
import clsx from "clsx";
import {TextCell} from "../../../../../modules/table/columns/TextCell.tsx";
import React from "react";
import {CustomHeader} from "../../../../../modules/table/columns/CustomHeader.tsx";
import {ActionsCell} from "../../../../../modules/table/columns/ActionsCell.tsx";
import {QUERIES} from "../../../../../../_metronic/helpers";
import {usePageEdit} from "./PageEditContext.loader.tsx";
import {storageUrl} from "../../../../../helpers/general.ts";
import {DEFAULT_LANGUAGE} from "../../../../../helpers/settings.ts";
import {TextCellWithHelper} from "../../../../../modules/table/columns/TextCellWithHelper.tsx";
import {Restricted} from "../../../../../modules/auth/AuthAccessControl.tsx";
import ReassuranceStripSection from "../partials/reassurance-strip/ReassuranceStripSection.tsx";

const ReassuranceStripTableColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Icon' className='p-4 min-w-125px'/>,
        id: 'icon',
        Cell: ({...props}) => <>
            {props.data[props.row.index].icon ? (
                <div className='symbol-label bg-secondary p-2'>
                    <img src={storageUrl(props.data[props.row.index].icon)}
                         alt={props.data[props.row.index].title[DEFAULT_LANGUAGE]}
                         className='w-100'/>
                </div>
            ) : (
                <div
                    className={clsx(
                        'symbol-label fs-3',
                        'bg-light-secondary',
                        'text-secondary'
                    )}
                >
                    N/A
                </div>
            )}
        </>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Title' className='min-w-125px'/>,
        id: 'title',
        Cell: ({...props}) => <TextCellWithHelper text={props.data[props.row.index].title[DEFAULT_LANGUAGE]}
                                                  helperText=""/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Description' className='min-w-125px'/>,
        id: 'description',
        Cell: ({...props}) => <TextCellWithHelper text={props.data[props.row.index].description[DEFAULT_LANGUAGE]}
                                                  helperText=""/>,
    },
    // {
    //     Header: (props) => <CustomHeader tableProps={props} title='Background Color' className='min-w-125px p-4'/>,
    //     id: 'background_color',
    //     Cell: ({...props}) => <TextCell text={props.data[props.row.index].background_color}/>,
    // },
    {
        Header: (props) => (
            // <Restricted to='manage-content'>
            <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            // </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {
            const {page, section, handleRefresh} = usePageEdit()
            const modalId = `kt_modal_reassurance_strip_${props.data[props.row.index].id}`

            if (page && section) {
                return (
                    <Restricted to='manage-content'>
                        <button type="button"
                                className="btn btn-icon btn-sm btn-active-light-warning"
                                data-bs-toggle="modal"
                                data-bs-target={`#${modalId}`}
                        >
                            <i className={clsx('fa fs-5 text-warning', 'fa-pencil')}></i>
                        </button>
                        <div className="modal modal-lg fade" tabIndex={-1} id={modalId}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header d-flex flex-row justify-content-between">
                                        <h5 className="modal-title">Edit Reassurance Strip
                                            Block {props.data[props.row.index].id}</h5>
                                        <div
                                            className="btn btn-icon btn-sm btn-active-light-twfirm ms-2"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1"
                                                      transform="rotate(-45 6 17.3137)" fill="currentColor"/>
                                                <rect x="7.41422" y="6" width="16" height="2" rx="1"
                                                      transform="rotate(45 7.41422 6)" fill="currentColor"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="modal-body">
                                        <ReassuranceStripSection pageId={1} sectionId={12} onlyForm={true}
                                                                 editSectionData={props.data[props.row.index]}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ActionsCell
                            id={props.data[props.row.index].id}
                            path={`content/site/pages/${page.id}/sections/${section.id}/data`}
                            queryKey={QUERIES.CONTENT_SITE_LIST}
                            showView={false}
                            showEdit={false}
                            title="Delete Block"
                            text={`Are you sure you want to delete the block?`}
                            callBackFn={handleRefresh}
                        />
                    </Restricted>
                )
            }
        }
    },
]

export {ReassuranceStripTableColumns}
