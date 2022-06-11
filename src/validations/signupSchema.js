import * as yup from 'yup'


yup.setLocale({
    mixed: {
        required: `Ce champ est requis`,
    },
    string: {
        min: ({min}) => `Ce champ doit contenir au minimum ${min} caractères`,
        max: ({max}) => `Ce champ doit contenir au maximum ${max} caractères`,
        email: ({path}) => `Le champ ${path} doit contenir un e-mail valide`
    }
});

export const signupSchema = yup.object().shape({
    username: yup.string().required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(24).matches(/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])/).required()
});