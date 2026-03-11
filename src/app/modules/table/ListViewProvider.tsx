import React, {createContext, FC, useMemo, useState} from 'react'
import {
    calculatedGroupingIsDisabled,
    calculateIsAllDataSelected,
    groupingOnSelect,
    groupingOnSelectAll,
    ID,
    initialListView,
    ListViewContextProps
} from '../../../_metronic/helpers'
import {useQueryResponse, useQueryResponseData} from './QueryResponseProvider.loader.ts'

const ListViewContext = createContext<ListViewContextProps>(initialListView)

const ListViewProvider: FC<React.PropsWithChildren<unknown>> = ({children}) => {
    const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
    const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
    const {isLoading} = useQueryResponse()
    const data = useQueryResponseData()
    const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
    const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

    return (
        <ListViewContext.Provider
            value={{
                selected,
                itemIdForUpdate,
                setItemIdForUpdate,
                disabled,
                isAllSelected,
                onSelect: (id: ID) => {
                    groupingOnSelect(id, selected, setSelected)
                },
                onSelectAll: () => {
                    groupingOnSelectAll(isAllSelected, setSelected, data)
                },
                clearSelected: () => {
                    setSelected([])
                },
            }}
        >
            {children}
        </ListViewContext.Provider>
    )
}

export {ListViewProvider, ListViewContext}
