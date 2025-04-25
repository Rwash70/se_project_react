import './AddItemModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm'; // make sure this path matches your folder structure

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const { values, handleChange, setValues } = useForm({
    name: '',
    imageUrl: '',
    weather: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddItemModalSubmit(values);
      setValues({ name: '', imageUrl: '', weather: '' });
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <ModalWithForm
      title='New garment'
      name='Add garment'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor='name' className='modal__label'>
        Name{' '}
        <input
          type='text'
          className='modal__input'
          id='name'
          name='name'
          placeholder='name'
          required
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor='imageUrl' className='modal__label'>
        Image{' '}
        <input
          type='text'
          className='modal__input'
          id='imageUrl'
          name='imageUrl'
          placeholder='Image URL'
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className='modal__radio-buttons'>
        <legend className='modal__legend'>Select the weather type:</legend>
        <label htmlFor='hot' className='modal__label modal__label_type_radio'>
          <input
            id='hot'
            type='radio'
            className='modal__radio-input'
            name='weather'
            value='hot'
            onChange={handleChange}
            checked={values.weather === 'hot'}
          />{' '}
          Hot
        </label>
        <label htmlFor='warm' className='modal__label modal__label_type_radio'>
          <input
            id='warm'
            type='radio'
            className='modal__radio-input'
            name='weather'
            value='warm'
            onChange={handleChange}
            checked={values.weather === 'warm'}
          />{' '}
          Warm
        </label>
        <label htmlFor='cold' className='modal__label modal__label_type_radio'>
          <input
            id='cold'
            type='radio'
            className='modal__radio-input'
            name='weather'
            value='cold'
            onChange={handleChange}
            checked={values.weather === 'cold'}
          />{' '}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
