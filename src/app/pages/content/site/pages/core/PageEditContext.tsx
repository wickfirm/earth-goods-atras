import {createContext, Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {Page, Section, SectionData} from "../../../../../models/content/Site.ts";
import {WithChildren} from "../../../../../../_metronic/helpers";
import {getErrorPage, submitRequest} from "../../../../../helpers/requests.ts";
import {getPage} from "../../../../../requests/content/site/Page.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    page: Page | null;
    setPage: Dispatch<SetStateAction<Page | null>>;
    section: Section | null;
    setSection: Dispatch<SetStateAction<Section | null>>;
    refresh: boolean | null;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    handleRefresh: () => void;
    getSection: (id: number) => Section | undefined;
    getSectionData: (id: number) => SectionData[] | undefined;
    getSectionDatum: (id: number) => SectionData | undefined;
}

const defaultPageEditContext = {
    page: null,
    setPage: () => {
    },
    section: null,
    setSection: () => {
    },
    refresh: false,
    setRefresh: () => {
    },
    handleRefresh: () => {
    },
    getSection: () => undefined,
    getSectionData: () => undefined,
    getSectionDatum: () => undefined
}

export const PageEditContext = createContext<Props>(defaultPageEditContext)

export const PageEditProvider: FC<WithChildren> = ({children}) => {
    const navigate = useNavigate()

    const [page, setPage] = useState<Page | null>(null)
    const [section, setSection] = useState<Section | null>(null)
    const [refresh, setRefresh] = useState<boolean>(false)

    const handleRefresh = () => {
        setRefresh(!refresh)
    }

    useEffect(() => {
        if (page) {
            // get the list of all pages
            submitRequest(getPage, [page.id], (response) => {
                const errorPage = getErrorPage(response)
                if (errorPage) {
                    navigate(errorPage)
                } else {
                    setPage(response)
                }
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])

    const getSection = (id: number) => {
        if (page) {
            const section = page.sections.find((section) => section.id === id)

            if (section) {
                setSection(section)
                return section
            }

            return undefined
        }

        return undefined
    };

    const getSectionData = (id: number) => {
        const section = getSection(id)

        if (section?.data && section.data.length > 0) {
            return section.data
        }

        return undefined
    };

    const getSectionDatum = (id: number) => {
        const section = getSection(id)

        if (section?.data && section.data.length > 0) {
            return section.data[0]
        }

        return undefined
    };

    return (
        <PageEditContext.Provider
            value={{
                page,
                setPage,
                section,
                setSection,
                refresh,
                setRefresh,
                handleRefresh,
                getSection,
                getSectionData,
                getSectionDatum
            }}
        >
            {children}
        </PageEditContext.Provider>
    )
}
