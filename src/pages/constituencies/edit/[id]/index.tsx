import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getConstituencyById, updateConstituencyById } from 'apiSdk/constituencies';
import { Error } from 'components/error';
import { constituencyValidationSchema } from 'validationSchema/constituencies';
import { ConstituencyInterface } from 'interfaces/constituency';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { JanaSenaInterface } from 'interfaces/jana-sena';
import { getJanaSenas } from 'apiSdk/jana-senas';

function ConstituencyEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ConstituencyInterface>(
    () => (id ? `/constituencies/${id}` : null),
    () => getConstituencyById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ConstituencyInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateConstituencyById(id, values);
      mutate(updated);
      resetForm();
      router.push('/constituencies');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ConstituencyInterface>({
    initialValues: data,
    validationSchema: constituencyValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Constituency
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<JanaSenaInterface>
              formik={formik}
              name={'jana_sena_id'}
              label={'Select Jana Sena'}
              placeholder={'Select Jana Sena'}
              fetcher={getJanaSenas}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'constituency',
  operation: AccessOperationEnum.UPDATE,
})(ConstituencyEditPage);
