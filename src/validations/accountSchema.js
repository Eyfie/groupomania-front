const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Ce champ doit être rempli`,
  },
  string: {
    min: ({ min }) => `Ce champ doit contenir au moins ${min} caractères`,
    max: ({ max }) => `Ce champ peut contenir ${max} caractères au maximum`,
    matches: 'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre au minimum',
    email: 'Votre email n\'est pas dans un format correct',
  },
});

//* TODO Put regex password
exports.accountSchema = yup.object({
  username: yup.string().min(4),
  password: yup.string().required(),
  newpassword: yup.string().min(8).max(24),
  email: yup.string().email(),
});

exports.accountDeleteSchema = yup.object({
  password: yup.string().required(),
});

exports.profilSchema = yup.object({
  firstname: yup.string(),
  lastname: yup.string(),
  description: yup.string(),
  theme: yup.string().matches(/(light|dark)/),
})
