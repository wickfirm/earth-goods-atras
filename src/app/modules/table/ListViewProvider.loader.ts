import {useContext} from 'react'
import {ListViewContext} from "./ListViewProvider.tsx";

const useListView = () => useContext(ListViewContext)

export {useListView}
