import { Tube } from '../../services/tube';

export type Form = Partial<Omit<Tube, 'id'>>;

export const validate = (value: Form): value is Tube => {
  if (Object.values(value).some((el) => !el)) {
    throw new Error('all fields are required');
  }

  if (Number.isNaN(Number(value.age))) {
    throw new Error('age needs to be a number');
  }
  return true;
};

export const emptyForm = { age: undefined, cityDistrict: undefined, company: undefined, visionDefect: undefined };
