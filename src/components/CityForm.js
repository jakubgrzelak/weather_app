import React from 'react';
import { withFormik } from 'formik';
import LoadAnimation from './LoadingAnimation/index';
import cityList from '../assets/city.list.min.json'
import '../styles/components/CityForm.scss'

const MyForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;

  const formStyle = props.isCityChoosen ? "city-form-inline" : "city-form" 

  return (
    <div>
      <div>
      </div>
      <form onSubmit={handleSubmit} className={formStyle}>
      { isSubmitting && <LoadAnimation />}
        <div className="error-message">
          {errors.name && touched.name && errors.name}
        </div>
        <input
          type="text"
          placeholder='Type city'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          name="name"
          className="form-control custom-input" 
        />
        <button className="btn btn-md btn-secondary custom-submit" type="submit">Submit</button>
      </form>
    </div>

  );
};

const MyEnhancedForm = {
  mapPropsToValues: () => ({ name: '' }),

  // Custom sync validation
  validate: values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting, setFieldError ,props }) => {
    setSubmitting(true)
    const cityName = values.name.trim();
    const matchedCities = cityList.filter(city => city.name === cityName)
    if (matchedCities.length === 0) {
      setFieldError('name', 'City not found')
    } else if (matchedCities.length === 1) {
      props.saveOptionalCities(matchedCities);
      props.onCityClick(matchedCities[0].id)
    } else {
      props.saveOptionalCities(matchedCities);
      props.showCitiesModal();
    }
    setSubmitting(false);
  },

  displayName: 'BasicForm',
}

export default withFormik(MyEnhancedForm)(MyForm)