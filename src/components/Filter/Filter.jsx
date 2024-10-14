import { useSearchParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import css from './Filter.module.css';

const Filter = () => {
  const [params, setParams] = useSearchParams();
  const initialFilterValue = params.get('query') ?? '';

  const handleSubmit = values => {
    if (!values.filter) {
      setParams({});
    } else {
      params.set('query', values.filter);
      setParams(params);
    }
  };

  return (
    <Formik initialValues={{ filter: initialFilterValue }} onSubmit={handleSubmit}>
      <Form className={css['filter']}>
        <Field name="filter" placeholder="Enter the movie title" type="text" autoComplete="off" />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};

export default Filter;
