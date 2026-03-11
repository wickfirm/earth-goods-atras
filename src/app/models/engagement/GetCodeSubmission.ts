import {Response} from '../../../_metronic/helpers';

export type GetCodeSubmission = {
    id: number;
    email: string;
    created_at: string;
};

export type GetCodeSubmissionPaginate = Response<GetCodeSubmission[]>;