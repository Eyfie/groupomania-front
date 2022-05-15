import * as yup from 'yup'


yup.setLocale({
    mixed: {
        required: `Ce champ est requis`,
    },
    string: {
      min: ({ min }) => `Ce champ doit contenir au mininum ${min} caractères`,
      max: ({ max }) => `Ce champ doit contenir au maximum ${max} caractères`
    }
});

export const forgotModifySchema = yup.object().shape({
    newpassword: yup.string().min(8).max(24).required(),
});