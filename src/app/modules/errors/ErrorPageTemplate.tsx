import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
    code: number;
    title: string;
    message: string;
}

const ErrorPageTemplate: React.FC<Props> = ({code, title, message}) => {
    return (
        <>
            <h1 className="fw-bolder text-gray-900" style={{fontSize: '50px'}}>{code}</h1>
            <h3 className="fw-normal mb-4" style={{fontSize: '16px'}}>{title}</h3>
            <div className="fw-semibold fs-6 text-gray-500 mb-7">
                {message}
            </div>

            <div className="mb-0">
                <Link to='/' className='btn btn-sm btn-twfirm'>
                    Return Home
                </Link>
            </div>
        </>
    );
}

export default ErrorPageTemplate;