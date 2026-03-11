import {Response} from '../../../_metronic/helpers';
import {Subject} from "./Subject.ts";
import {Enquiry} from "./Enquiry.ts";

export type ContactSubmission = {
    id: number;
    name: string;
    email: string;
    message: string;
    subject: Subject;
    enquiry: Enquiry;
    created_at: string;
};

export type ContactSubmissionPaginate = Response<ContactSubmission[]>;