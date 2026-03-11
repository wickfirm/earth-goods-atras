import clsx from 'clsx'
import {FC} from 'react'
import {storageUrl} from "../../../helpers/general.ts";

type Props = {
    src: string
}

const ThumbnailCell: FC<Props> = ({src}) => (
    <div className='d-flex align-items-center'>
        {/* begin:: Avatar */}
        <div className='symbol symbol-square symbol-50px overflow-hidden me-3'>
            <a href='#'>
                {src ? (
                    <div className='symbol-label'>
                        <img src={storageUrl(src)} alt="Thumbnail Image" className='w-100'/>
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
            </a>
        </div>
    </div>
)

export {ThumbnailCell}
