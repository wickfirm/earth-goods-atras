export enum WickToastType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    PENDING = 'pending',
}

export enum Actions {
    CREATE = 1,
    SHOW,
    EDIT,
    COPY,
    FILTER,
    EXPORT,
    SELECT,
    OPTION,
    PAUSE,
    CANCEL,
    RESUME,
    DATE_RANGE_PICKER,
    TABS,
    REORDER,
}

export enum PageTypes {
    INDEX = 'index',
    CREATE = 'create',
    EDIT = 'edit',
    SHOW = 'show',
    REPORT = 'report',
    ERROR = 'error',
    ARCHIVED = 'archived',
    REORDER = 'reorder',
}

export enum DropdownItemType {
    URL,
    ACTION
}