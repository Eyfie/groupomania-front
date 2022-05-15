import * as yup from 'yup'


yup.setLocale({
    mixed: {
        required: `Ce champ est requis`,
    },
    string: {
      email: 'Ce champ doit être un e-mail valide'
    }
});

export const forgotSchema = yup.object().shape({
    email: yup.string().email().required(),
});