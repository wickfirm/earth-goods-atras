import {FC} from 'react'
import Symbol from '../../../components/images/Symbol';

type Props = {
    dObject: string,
    alt: string
}

const ImageCell: FC<Props> = ({dObject, alt = ''}) => (
    <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
            <Symbol path={dObject} alt={alt}/>
        </div>
    </div>
)

export {ImageCell}
