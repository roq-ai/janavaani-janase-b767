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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createConstituency } from 'apiSdk/constituencies';
import { Error } from 'components/error';
import { constituencyValidationSchema } from 'validationSchema/constituencies';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { JanaSenaInterface } from 'interfaces/jana-sena';
import { getJanaSenas } from 'apiSdk/jana-senas';
import { ConstituencyInterface } from 'interfaces/constituency';

function ConstituencyCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ConstituencyInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createConstituency(values);
      resetForm();
      router.push('/constituencies');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ConstituencyInterface>({
    initialValues: {
      name: '',
      jana_sena_id: (router.query.jana_sena_id as string) ?? null,
    },
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
            Create Constituency
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'constituency',
  operation: AccessOperationEnum.CREATE,
})(ConstituencyCreatePage);
