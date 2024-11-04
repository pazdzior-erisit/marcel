import { Tube } from '../../services/tube';

export const rackConfig: Array<{ key: keyof Tube, name: string }> = [
  { key: 'age', name: 'age' },
  { key: 'cityDistrict', name: 'city district' },
  { key: 'company', name: 'company' },
  { key: 'visionDefect', name: 'vision defect' },
];
