// EventCreationForm.js
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { artists } from './artistsData';
import { events } from './eventsData';

const EventCreationForm = () => {
  const initialValues = {
    name: '',
    description: '',
    date: '',
    venue: '',
    type: '',
    price: '',
    artist: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Event name is required'),
    description: Yup.string().required('Event description is required'),
    date: Yup.date().required('Event date is required'),
    venue: Yup.string().required('Event venue is required'),
    type: Yup.string().required('Event type is required'),
    price: Yup.number().positive('Price must be a positive number').required('Event price is required'),
    artist: Yup.string().required('Artist is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    alert('Event created successfully!');
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Event Name
          </label>
          <Field
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            name="name"
          />
          <ErrorMessage className="text-red-500" name="name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Event Description
          </label>
          <Field
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            as="textarea"
            id="description"
            name="description"
          />
          <ErrorMessage className="text-red-500" name="description" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Event Date
          </label>
          <Field
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            id="date"
            name="date"
          />
          <ErrorMessage className="text-red-500" name="date" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="venue">
            Event Venue
          </label>
          <Field
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="venue"
            name="venue"
          />
          <ErrorMessage className="text-red-500" name="venue" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="type">
            Event Type
          </label>
          <Field
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            as="select"
            id="type"
            name="type"
          >
            <option value="">Select event type</option>
            {events.map((event) => (
              <option key={event.id} value={event.type}>
                {event.type}
              </option>
            ))}
          </Field>
          <ErrorMessage className="text-red-500" name="type" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Event Price
          </label>
          <Field
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="price"
            name="price"
          />
          <ErrorMessage className="text-red-500" name="price" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="artists">
            Artists
          </label>
          <Field
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            as="select"
            id="artists"
            name="artists"
            multiple
          >
            <option value="">Select artists</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.name}>
                {artist.name}
              </option>
            ))}
          </Field>
          <ErrorMessage className="text-red-500" name="artists" />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Event
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default EventCreationForm;