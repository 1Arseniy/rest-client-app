import * as yup from 'yup';
import type { TFunction } from 'i18next';

export const makeSchemas = (t: TFunction) => {
  const password = yup
    .string()
    .required(t('form.errors.password.required'))
    .min(8, t('form.errors.password.min', { min: 8 }))
    .matches(/[a-z]/, t('form.errors.password.lowerCase'))
    .matches(/[A-Z]/, t('form.errors.password.upperCase'))
    .matches(/\d/, t('form.errors.password.digit'))
    .matches(
      /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
      t('form.errors.password.specialSymbol')
    );

  const email = yup
    .string()
    .email(t('form.errors.email.format'))
    .required(t('form.errors.email.required'));

  return {
    schemaSignin: yup.object({ email, password }).required(),
    schemaSignup: yup.object({
      name: yup
        .string()
        .test(
          'firstLetterCapitalized',
          t('form.errors.name.firstLetter'),
          (value) => {
            if (!value) return false;
            const first = value[0];
            return (
              first === first.toUpperCase() && !'0123456789'.includes(first)
            );
          }
        )
        .required(t('form.errors.name.required')),
      email,
      password,
      passwordRepeat: yup
        .string()
        .required(t('form.errors.passwordRepeat.required'))
        .oneOf([yup.ref('password')], t('form.errors.passwordRepeat.match')),
    }),
  };
};
