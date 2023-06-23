import * as yup from 'yup';

export const constituencyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  jana_sena_id: yup.string().nullable().required(),
});
