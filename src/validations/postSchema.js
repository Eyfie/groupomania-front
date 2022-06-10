import * as yup from 'yup'


export const postSchema = yup.object().shape({
    'title': yup.string().required('Le post doit posséder un titre'),
    'textcontent': yup.string()
        .when('media', {
            is: (media) => !media,
            then: yup.string()
                .required('Le post doit contenir une image ou du texte'),
        }),
    'media': yup.mixed()
        .when('textcontent', {
            is: (textcontent) => !textcontent,
            then: yup.mixed()
                .required('Le post doit contenir contenir une image ou du texte'),
        }),
}, [['textcontent', 'media']]);