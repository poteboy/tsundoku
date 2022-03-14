import * as yup from 'yup';

export const emailValidation = yup.string().trim().required().email();
