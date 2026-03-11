import {Response} from '../../../_metronic/helpers';

export type Permission = {
    id: number,
    name: string
};

export type PermissionPaginate = Response<Permission[]>;