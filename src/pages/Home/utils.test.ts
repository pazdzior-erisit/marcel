import { GraphTube } from '../../services/rack-management';
import { matchIdsWithTubes } from './utils';

describe('Home utils', () => {
  test('matchIdsWithTubes should result with array of arrays of tubes', async () => {
    const tubes: Array<GraphTube> = [
      { age: '1', cityDistrict: '1', company: '1', id: 1, neighbors: [], visionDefect: '1' },
      { age: '2', cityDistrict: '2', company: '2', id: 2, neighbors: [], visionDefect: '2' }
    ]
    const graph = [[1], [2]];
    const result = matchIdsWithTubes(graph, tubes);
    expect(result).toStrictEqual([
      [{ age: '1', cityDistrict: '1', company: '1', id: 1, neighbors: [], visionDefect: '1' }],
      [{ age: '2', cityDistrict: '2', company: '2', id: 2, neighbors: [], visionDefect: '2' }]
    ]);
  });
});
