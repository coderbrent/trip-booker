import { createAction } from '@reduxjs/toolkit';

export const apiCallBegan = createAction('api/apiCallBegan');
export const apiCallSuccess = createAction('api/apiCallSuccess');
export const apiCallFail = createAction('api/apiCallFail');