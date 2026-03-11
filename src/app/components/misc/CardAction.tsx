import clsx from 'clsx'
import React, {Dispatch} from 'react'
import Select from 'react-select'
import {DateRangePicker} from 'rsuite'
import {Actions} from '../../helpers/variables'
import CreateButton from '../buttons/Create'
import EditButton from '../buttons/Edit'
import FilterButton from '../buttons/Filter'
import ExportButton from '../buttons/Export'
import {WickDropdownMenu} from '../buttons/WickDropdownMenu.tsx'
import ShowButton from '../buttons/Show'
import {Restricted} from "../../modules/auth/AuthAccessControl.tsx";
import {WickMenuItem} from "./WickDropdownMenuItem.tsx";
import AddBulk from "../buttons/AddBulk.tsx";
import ReorderButton from "../buttons/Reorder.tsx";

export class CardAction {
    type: Actions

    constructor(type: Actions) {
        this.type = type
    }

    getHtmlComponent(index?: number): JSX.Element {
        return <></>
    }
}

export class CreateCardAction extends CardAction {
    url: string
    permission: string

    constructor(url: string, permission: string) {
        super(Actions.CREATE)

        this.url = url
        this.permission = permission
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <Restricted to={this.permission} key={index}>
                <CreateButton url={this.url} key={index} className='ms-2'/>
            </Restricted>
        )
    }
}

export class ShowCardAction extends CardAction {
    url: string
    permission: string

    constructor(url: string, permission: string) {
        super(Actions.SHOW)

        this.url = url
        this.permission = permission
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <Restricted to={this.permission} key={index}>
                <ShowButton url={this.url} key={index} className='ms-2'/>
            </Restricted>
        )
    }
}

export class EditCardAction extends CardAction {
    url: string
    permission: string

    constructor(url: string, permission: string) {
        super(Actions.EDIT)

        this.url = url
        this.permission = permission
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <Restricted to={this.permission} key={index}>
                <EditButton url={this.url} key={index} className='ms-2'/>
            </Restricted>
        )
    }
}

export class FilterCardAction extends CardAction {
    target: string
    showFilter: boolean
    setShowFilter: Dispatch<React.SetStateAction<boolean>>

    constructor(
        target: string,
        showFilter: boolean,
        setShowFilter: Dispatch<React.SetStateAction<boolean>>
    ) {
        super(Actions.FILTER)

        this.target = target
        this.showFilter = showFilter
        this.setShowFilter = setShowFilter
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <FilterButton
                key={index}
                target={this.target}
                showFilter={this.showFilter}
                setShowFilter={this.setShowFilter}
                className='ms-2'
            />
        )
    }
}

export class ExportCardAction extends CardAction {
    exportQuery: string
    exportEndpoint: string

    constructor(exportQuery: string, exportEndpoint: string) {
        super(Actions.EXPORT)

        this.exportQuery = exportQuery
        this.exportEndpoint = exportEndpoint
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <ExportButton
                exportQuery={this.exportQuery}
                exportEndpoint={this.exportEndpoint}
                key={index}
                className='ms-2'
            />
        )
    }
}

export class DateRangeCardAction extends CardAction {
    placeholder: string
    size: any
    isClearable: boolean
    onChange: any

    constructor(
        onChange: any,
        placeholder?: string | undefined,
        size?: any | undefined,
        isClearable?: boolean | undefined
    ) {
        super(Actions.DATE_RANGE_PICKER)

        this.placeholder = placeholder ? placeholder : 'Select date range'
        this.size = size ? size : 'lg'
        this.isClearable = isClearable ? isClearable : false
        this.onChange = onChange
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <DateRangePicker
                placeholder={this.placeholder}
                size={this.size}
                preventOverflow
                isoWeek
                className={'me-2 mb-2 twfirm-daterangepicker'}
                cleanable={this.isClearable}
                key={index}
                onChange={this.onChange}
            />
        )
    }
}

export class SelectCardAction extends CardAction {
    permission: string
    options: any[]
    placeholder: string
    selectChangeHandler: (e: any, key: string) => void
    key: string
    defaultValue?: any | undefined

    constructor(
        permission: string,
        options: any[],
        placeholder: string,
        selectChangeHandler: (e: any, key: string) => void,
        key: string,
        defaultValue?: any
    ) {
        super(Actions.SELECT)

        this.permission = permission
        this.options = options
        this.placeholder = placeholder
        this.selectChangeHandler = selectChangeHandler
        this.key = key
        this.defaultValue = defaultValue
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <Select
                key={index}
                name='header_card_select'
                options={this.options}
                defaultValue={this.defaultValue}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id.toString()}
                onChange={(e) => {
                    this.selectChangeHandler(e, this.key)
                }}
                placeholder={this.placeholder}
            />
        )
    }
}

export class OptionsCardAction extends CardAction {
    permission: string
    options: WickMenuItem[]
    fontawesomeIcon: string
    color?: string

    constructor(
        permission: string,
        options: WickMenuItem[],
        fontawesomeIcon: string,
        color: string = 'twfirm'
    ) {
        super(Actions.OPTION)

        this.permission = permission
        this.options = options
        this.fontawesomeIcon = fontawesomeIcon
        this.color = color
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <Restricted to={this.permission} key={index}>
                <WickDropdownMenu
                    className='ms-2'
                    dropdownItems={this.options}
                    color={this.color}
                    fontawesomeIcon={this.fontawesomeIcon}
                />
            </Restricted>
        )
    }
}

export class TabsCardAction extends CardAction {
    id: string
    items: string[]

    constructor(id: string, items: string[]) {
        super(Actions.TABS)

        this.id = id
        this.items = items
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <>
                <ul
                    className='nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0 active-info'
                    key={index}
                >
                    {this.items.map((tabName, subIndex) => {
                        return (
                            <li className='nav-item'>
                                <a
                                    className={clsx('nav-link', subIndex === 0 ? 'active' : '')}
                                    data-bs-toggle='tab'
                                    href={`#${this.id}-${subIndex}`}
                                >
                                    {tabName}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }
}

export class AddBulkCardAction extends CardAction {
    url: string
    permission: string

    constructor(url: string, permission: string) {
        super(Actions.CREATE)

        this.url = url
        this.permission = permission
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <Restricted to={this.permission} key={index}>
                <AddBulk url={this.url} key={index} className='ms-2'/>
            </Restricted>
        )
    }
}

export class ReorderCardAction extends CardAction {
    url: string
    permission: string

    constructor(url: string, permission: string) {
        super(Actions.REORDER)

        this.url = url
        this.permission = permission
    }

    getHtmlComponent(index?: number): JSX.Element {
        return (
            <Restricted to={this.permission} key={index}>
                <ReorderButton url={this.url} key={index} className='ms-2'/>
            </Restricted>
        )
    }
}