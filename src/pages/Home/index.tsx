import clsx from 'clsx';
import styles from './styles.module.css';
import TubeForm from '../../components/TubeForm';
import { useMemo, useState } from 'preact/hooks';
import { Tube } from '../../services/tube';
import { GraphTube, dSatur, getTubesGraph } from '../../services/rack-management';
import Rack from '../../components/Rack';
import { matchIdsWithTubes } from './utils';

type Props = {
  class?: string,
}

const Home = (props: Props) => {
  const [tubes, setTubes] = useState<Array<GraphTube>>([]);

  const handleSubmit = (value: Omit<Tube, 'id'>) => {
    setTubes((prev) => (
      getTubesGraph([...prev, { ...value, id: Math.random() }])
    ));
  };

  const racks = useMemo(() => {
    if (!tubes.length) {
      return [];
    }
    const rackGraph = dSatur(tubes);
    return matchIdsWithTubes(rackGraph, tubes);
  }, [tubes]);

  return (
    <div class={clsx(styles.wrapper, props.class)}>
      <TubeForm onSubmit={handleSubmit}/>
      <div class={styles.racks}>
        {racks.map((el) => (
          <Rack tubes={el}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
