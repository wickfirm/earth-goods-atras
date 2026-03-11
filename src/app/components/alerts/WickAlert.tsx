import React, {Dispatch, SetStateAction} from 'react'

type Props = {
    icon?: string
    title?: string
    message?: string
    setMessage?: Dispatch<SetStateAction<string>>
    messages?: string[]
    setMessages?: Dispatch<SetStateAction<string[]>>
    color?: string
    dismissible?: boolean
}

const WickAlert: React.FC<Props> = ({
                                        icon = 'fa-brake-warning',
                                        title,
                                        message,
                                        setMessage,
                                        messages,
                                        setMessages,
                                        color = 'warning',
                                        dismissible = false,
                                    }) => {
    const onClose = () => {
        if (setMessage) setMessage('')

        if (setMessages) setMessages([])
    }

    return (
        <div className={`alert alert-${color} d-flex align-items-center p-5 mb-10`}>
            <i className={`fa ${icon} fs-1 text-${color} me-4`}/>

            <div className='d-flex flex-column'>
                {title && <h5 className='fw-semibold mb-1'>{title}</h5>}
                <span className={`text-${color}-emphasis`}>
                    {message}

                    {messages && messages.length > 0 && (
                        <ul className='m-0'>
                            {messages.map((message, index) => {
                                return <li key={`alert-message-${index}`}>{message}</li>
                            })}
                        </ul>
                    )}
                </span>
            </div>

            {dismissible && (
                <button
                    type='button'
                    className='position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto'
                    data-bs-dismiss='alert'
                    onClick={onClose}
                >
                    <i className={`fa fa-close fs-1 text-dark me-4`}/>
                </button>
            )}
        </div>
    )
}

export default WickAlert
