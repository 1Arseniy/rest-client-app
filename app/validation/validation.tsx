import * as yup from 'yup';

const password = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 symbols')
  .matches(
    /[a-z]/,
    'Password must contain at least one lowercase letter (a-z).'
  )
  .matches(
    /[A-Z]/,
    'Password must contain at least one uppercase letter (A-Z).'
  )
  .matches(/\d/, 'Password must contain at least one digit')
  .matches(
    /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
    `Password must contain at least one special character !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~'`
  );

const email = yup
  .string()
  .email('Email address must be properly formatted (e.g., user@example.com)')
  .required('Email is required');

export const schemaSignin = yup
  .object({
    email: email,
    password: password,
  })
  .required();

export const schemaSignup = yup.object({
  name: yup
    .string()
    .test(
      'firstLetterCapitalized',
      'The first letter should be capitalized',
      (value) => {
        if (!value) {
          return false;
        }
        const first = value[0];
        return first === first.toUpperCase() && !'0123456789'.includes(first);
      }
    )
    .required('First name must not be empty!'),
  email: email,
  password: password,
  passwordRepeat: yup
    .string()
    .required('Repeat password is required')
    .oneOf(
      [yup.ref('password')],
      'Repeat password should match current password'
    ),
});
