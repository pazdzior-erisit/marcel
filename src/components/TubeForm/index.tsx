import clsx from 'clsx';
import styles from './styles.module.css';
import { Form, emptyForm, validate } from './utils';
import { useRef, useState } from 'preact/hooks';
import { TargetedEvent } from 'preact/compat';
import { Tube } from '../../services/tube';

type Props = {
  class?: string,
  onSubmit: (value: Omit<Tube, 'id'>) => void;
}


const TubeForm = (props: Props) => {
  const formElement = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<Form>(emptyForm);

  const handleForm = <T extends keyof Form,>(key: T) => (event: TargetedEvent<HTMLInputElement>) => {
    setForm((prev) => {
      if (!(event.target instanceof HTMLInputElement)) {
        throw new Error('wrong target element');
      }
      return ({ ...prev, [key]: event.target.value })
    })
  };

  const resetForm = () => {
    formElement.current?.reset();
    setForm(emptyForm);
  }

  const handleSubmit = (event: TargetedEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      if (validate(form)) {
        props.onSubmit(form);
        resetForm();
      }
    } catch (err) {
      window.alert(err);
    }

  };

  return (
    <form ref={formElement} class={clsx(styles.wrapper, props.class)}>
      <input class={styles.input} placeholder="age" type="number" onChange={handleForm('age')}/>
      <input class={styles.input} placeholder="company" onChange={handleForm('company')}/>
      <input class={styles.input} placeholder="city district" onChange={handleForm('cityDistrict')}/>
      <input class={styles.input} placeholder="vision defect" onChange={handleForm('visionDefect')}/>
      <button class={styles.button} type="submit" onClick={handleSubmit}>submit</button>
    </form>
  );
};

export default TubeForm;
