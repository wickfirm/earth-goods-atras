import React from 'react'
import {Link} from "react-router-dom";

interface Props {
    title: string;
    link: string;
    light?: boolean;
}

const SectionCard = ({title, link, light = false}: Props) => {
    return (
        <div className={`card ${light ? 'bg-transparent' : 'bg-primary'} h-md-100`}>
            <div className="card-body d-flex flex-column pt-4 pb-7">
                <div className="m-0">
                    <h1 className={`fw-semibold ${light ? 'text-gray-800' : 'text-white'} text-center lh-lg mb-9`}>
                        {title}
                    </h1>

                    <div
                        className="flex-grow-1 bgi-no-repeat bgi-size-contain bgi-position-x-center card-rounded-bottom h-200px mh-200px my-5 mb-lg-12"
                        style={{backgroundImage: "url('/media/svg/illustrations/sigma/illustration-realestate.svg')"}}>
                    </div>
                </div>

                <div className="text-center">
                    {
                        light ?
                            <Link to={link} className="btn btn-sm bg-primary btn-color-primary bg-opacity-20">View
                                Sections</Link>
                            :
                            <Link to={link} className="btn btn-sm bg-white btn-color-gray-800">View Sections</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default SectionCard;
