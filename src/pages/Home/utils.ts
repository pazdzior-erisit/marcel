import { GraphTube } from '../../services/rack-management';

export const matchIdsWithTubes = (graph: Array<Array<number>>, tubes: Array<GraphTube>) => (
  graph.map((rack) => (
    rack.map((id) => {
      const tube = tubes.find((item) => item.id === id);
      if (!tube) {
        throw new Error('tube not found');
      }
      return tube;
    })
  ))
)
