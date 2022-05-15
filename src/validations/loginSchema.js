import * as yup from 'yup'


yup.setLocale({
    mixed: {
        required: `Ce champ est requis`,
    },
});

export const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
});