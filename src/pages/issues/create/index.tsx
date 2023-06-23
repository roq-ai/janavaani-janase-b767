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
import { createIssue } from 'apiSdk/issues';
import { Error } from 'components/error';
import { issueValidationSchema } from 'validationSchema/issues';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ConstituencyInterface } from 'interfaces/constituency';
import { UserInterface } from 'interfaces/user';
import { getConstituencies } from 'apiSdk/constituencies';
import { getUsers } from 'apiSdk/users';
import { IssueInterface } from 'interfaces/issue';

function IssueCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: IssueInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createIssue(values);
      resetForm();
      router.push('/issues');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<IssueInterface>({
    initialValues: {
      description: '',
      category: '',
      constituency_id: (router.query.constituency_id as string) ?? null,
      citizen_reporter_id: (router.query.citizen_reporter_id as string) ?? null,
    },
    validationSchema: issueValidationSchema,
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
            Create Issue
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <FormControl id="category" mb="4" isInvalid={!!formik.errors?.category}>
            <FormLabel>Category</FormLabel>
            <Input type="text" name="category" value={formik.values?.category} onChange={formik.handleChange} />
            {formik.errors.category && <FormErrorMessage>{formik.errors?.category}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ConstituencyInterface>
            formik={formik}
            name={'constituency_id'}
            label={'Select Constituency'}
            placeholder={'Select Constituency'}
            fetcher={getConstituencies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'citizen_reporter_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
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
  entity: 'issue',
  operation: AccessOperationEnum.CREATE,
})(IssueCreatePage);
