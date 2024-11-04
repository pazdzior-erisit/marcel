import clsx from 'clsx';
import styles from './styles.module.css';
import { Tube } from '../../services/tube';
import { rackConfig } from './utils';

type Props = {
  class?: string,
  tubes: Array<Tube>,
}

const Rack = (props: Props) => (
  <div class={clsx(styles.wrapper, props.class)}>
    <div class={styles.head}>
      {rackConfig.map((config) => (
        <div key={config.key} class={styles.cell}>{config.name}</div>
      ))}
    </div>
    {props.tubes.map((el) => (
      <div class={styles.row} key={el.id}>
        {rackConfig.map((config) => (
          <div class={styles.cell} key={config.key}>{el[config.key]}</div>
        ))}
      </div>
    ))}
  </div>
);

export default Rack;
