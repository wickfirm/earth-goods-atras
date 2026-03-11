import React from 'react'

type Props = {
    cardClasses?: string
    cardBodyClasses?: string
    backgroundColor?: string
    backgroundPosition?: string
    backgroundImage?: string
    title: string
    text: string
    ctaText?: string
    ctaUrl?: string
    ctaClasses?: string
}

const EngageWidget: React.FC<Props> = ({
                                           cardClasses = 'h-200px',
                                           backgroundPosition = 'right bottom',
                                           backgroundImage = '/media/stock/900x600/42.png',
                                           title,
                                           text,
                                           ctaText,
                                           ctaUrl,
                                       }) => {
    return (
        <div className={`card card-flush ${cardClasses}`}>
            <div
                className='card-body d-flex flex-column justify-content-between mt-9 bgi-no-repeat bgi-size-cover bgi-position-x-center pb-0'
                style={{
                    backgroundPosition: backgroundPosition,
                    backgroundImage: `url('${backgroundImage}')`,
                }}
            >
                <div className='mb-10'>
                    <div className='fs-2hx fw-bold text-gray-800 text-center mb-13'>
                        {title}
                    </div>
                    <div className='fs-2 fw-bold text-gray-600 text-center mb-13'>
                        {text}
                    </div>

                    {
                        ctaText &&
                        <div className='text-center'>
                            <a href={ctaUrl}>{ctaText}</a>
                        </div>
                    }
                </div>
                <img
                    className='mx-auto h-150px h-lg-200px theme-light-show'
                    src={'/media/illustrations/misc/upgrade.svg'}
                    // src={toAbsoluteUrl('media/illustrations/misc/upgrade.svg')}
                    alt=''
                />
                <img
                    className='mx-auto h-150px h-lg-200px theme-dark-show'
                    src={'/media/illustrations/misc/upgrade-dark.svg'}
                    alt=''
                />
            </div>
        </div>
    )
}

export default EngageWidget
