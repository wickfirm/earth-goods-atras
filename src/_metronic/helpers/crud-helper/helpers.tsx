import {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react'
import qs from 'qs'
import {ID, QueryResponseContextProps, QueryState} from './models'

function createResponseContext<T>(initialState: QueryResponseContextProps<T>) {
  return createContext(initialState)
}

function isNotEmpty(obj: unknown) {
  return obj !== undefined && obj !== null && obj !== ''
}

// Example: page=1&items_per_page=10&sort=id&order=desc&search=a&filter_name=a&filter_online=false
function stringifyRequestQuery(state: QueryState): string {
  const pagination = qs.stringify(state, {filter: ['page', 'items_per_page'], skipNulls: true})
  const sort = qs.stringify(state, {filter: ['sort', 'order'], skipNulls: true})
  const search = isNotEmpty(state.search)
      ? qs.stringify(state, {filter: ['search'], skipNulls: true})
      : ''

  // TODO: simplify but before check with Ayman if I can update this as I did below
  const filter = state.filter
      ? Object.entries(state.filter as object)
          .filter((obj) => isNotEmpty(obj[1]))
          .map((obj) => {
            if (obj[1].length > 0 && obj[1][0] instanceof Object) {
              const innerObjToString: string[] = ['']

              obj[1].map((innerObj: any, index: number) => {
                if (innerObj instanceof Object) {
                  for (const key in innerObj) {
                    const value = innerObj[key]

                    if (value instanceof Array) {
                      for (const v in value) {
                        innerObjToString.push(`filter[${obj[0]}][${index}][${key}][]=${value[v]}`)
                      }
                    } else {
                      innerObjToString.push(`filter[${obj[0]}][${index}][${key}]=${value}`)
                    }
                  }
                }
              })

              return innerObjToString.filter((f) => f).join('&')
            } else if (obj[1] instanceof Array) {
              const innerObjToString: string[] = ['']

              for (const key in obj[1]) {
                const value = obj[1][key]

                innerObjToString.push(`filter[${obj[0]}][]=${value}`)
              }

              return innerObjToString.filter((f) => f).join('&')
            } else {
              return `filter[${obj[0]}]=${obj[1]}`
            }
          })
          .join('&')
      : ''

  // const filter = state.filter
  //   ? Object.entries(state.filter as Object)
  //       .filter((obj) => isNotEmpty(obj[1]))
  //       .map((obj) => {
  //         return `filter[${obj[0]}]=${obj[1]}`
  //       })
  //       .join('&')
  //   : ''

  const includeParts: string[] = []

  state.include?.forEach((value) => {
    includeParts.push(`include[]=${value}`)
  })

  const include = includeParts.join('&')

  return [pagination, sort, search, filter, include]
      .filter((f) => f)
      .join('&')
      .toLowerCase()
}

function parseRequestQuery(query: string): QueryState {
  const cache: unknown = qs.parse(query)
  return cache as QueryState
}

function calculatedGroupingIsDisabled<T>(isLoading: boolean, data: Array<T> | undefined): boolean {
  if (isLoading) {
    return true
  }

  return !data || !data.length
}

function calculateIsAllDataSelected<T>(data: Array<T> | undefined, selected: Array<ID>): boolean {
  if (!data) {
    return false
  }

  return data.length > 0 && data.length === selected.length
}

function groupingOnSelect(
    id: ID,
    selected: Array<ID>,
    setSelected: Dispatch<SetStateAction<Array<ID>>>
) {
  if (!id) {
    return
  }

  if (selected.includes(id)) {
    setSelected(selected.filter((itemId) => itemId !== id))
  } else {
    const updatedSelected = [...selected]
    updatedSelected.push(id)
    setSelected(updatedSelected)
  }
}

function groupingOnSelectAll<T>(
    isAllSelected: boolean,
    setSelected: Dispatch<SetStateAction<Array<ID>>>,
    data?: Array<T & {id?: ID}>
) {
  if (isAllSelected) {
    setSelected([])
    return
  }

  if (!data || !data.length) {
    return
  }

  setSelected(data.filter((item) => item.id).map((item) => item.id))
}

// Hook
function useDebounce(value: any, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value)
        }, delay)
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler)
        }
      },
      [value, delay] // Only re-call effect if value or delay changes
  )
  return debouncedValue
}

export {
  createResponseContext,
  stringifyRequestQuery,
  parseRequestQuery,
  calculatedGroupingIsDisabled,
  calculateIsAllDataSelected,
  groupingOnSelect,
  groupingOnSelectAll,
  useDebounce,
  isNotEmpty,
}
