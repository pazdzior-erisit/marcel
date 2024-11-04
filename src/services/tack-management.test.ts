import { expect } from 'expect';
import { GraphTube, dSatur, getTubesGraph, isRackSafe, sortByDegree, sortByRackOccupancy, sortBySaturationDegree } from './rack-management';
import { Tube } from './tube';

const tubes: Array<Tube> = [
  { id: 1, age: '1', cityDistrict: '9', company: '3', visionDefect: '0' },
  { id: 2, age: '5', cityDistrict: '4', company: '2', visionDefect: '5' },
  { id: 3, age: '6', cityDistrict: '2', company: '2', visionDefect: '5' },
  { id: 4, age: '9', cityDistrict: '3', company: '0', visionDefect: '7' },
  { id: 5, age: '7', cityDistrict: '5', company: '8', visionDefect: '5' },
  { id: 6, age: '8', cityDistrict: '7', company: '7', visionDefect: '6' },
  { id: 7, age: '9', cityDistrict: '4', company: '9', visionDefect: '9' },
  { id: 8, age: '7', cityDistrict: '2', company: '3', visionDefect: '6' },
  { id: 9, age: '0', cityDistrict: '5', company: '8', visionDefect: '0' },
  { id: 10, age: '7', cityDistrict: '4', company: '7', visionDefect: '9' }
]

describe('Rack management', () => {
  test('isRackSafe function should result false if given rack has neighbours of the item in it', async () => {
    expect(isRackSafe([1], [1])).toBeFalsy();
  });

  test('isRackSafe function should result true if given rack has no neighbours of the item in it', async () => {
    expect(isRackSafe([2], [1])).toBeTruthy();
  });

  test('getTubesGraph should result with array of GraphTubes', async () => {
    const tubes: Array<Tube> = [
      { id: 1, age: '1', cityDistrict: '1', company: '1', visionDefect: '1' },
      { id: 2, age: '1', cityDistrict: '1', company: '1', visionDefect: '1' },
      { id: 3, age: '2', cityDistrict: '2', company: '2', visionDefect: '2' }
    ];
    expect(getTubesGraph(tubes)).toStrictEqual([
      { id: 1, age: '1', cityDistrict: '1', company: '1', neighbors: [2], visionDefect: '1' },
      { id: 2, age: '1', cityDistrict: '1', company: '1', neighbors: [1], visionDefect: '1' },
      { id: 3, age: '2', cityDistrict: '2', company: '2', neighbors: [], visionDefect: '2' }
    ])
  });

  test('sortByDegree should result with array sorted according to element neighbors count', async () => {
    const tubes: Array<GraphTube> = [
      { id: 1, age: '1', cityDistrict: '1', company: '1', neighbors: [], visionDefect: '1' },
      { id: 2, age: '1', cityDistrict: '1', company: '1', neighbors: [1, 3], visionDefect: '1' },
      { id: 3, age: '1', cityDistrict: '1', company: '1', neighbors: [1], visionDefect: '1' },
    ]
    expect(sortByDegree(tubes)).toStrictEqual([
      { id: 2, age: '1', cityDistrict: '1', company: '1', neighbors: [1, 3], visionDefect: '1' },
      { id: 3, age: '1', cityDistrict: '1', company: '1', neighbors: [1], visionDefect: '1' },
      { id: 1, age: '1', cityDistrict: '1', company: '1', neighbors: [], visionDefect: '1' },
    ])
  });

  test('sortByRackOccupancy should result with array sorted in increasing order of occupancy', async () => {
    const racks = [[1], [2, 2, 3], [2, 2]];
    expect(sortByRackOccupancy(racks)).toStrictEqual([
      [1], [2, 2], [2, 2, 3]
    ])
  });

  test('sortBySaturationDegree should result with array sorted in increasing order of saturation', async () => {
    const tubes: Array<GraphTube> = [
      { id: 1, neighbors: [4, 5], age: '1', cityDistrict: '1', company: '1', visionDefect: '1' },
      { id: 2, neighbors: [6, 7, 8], age: '1', cityDistrict: '1', company: '1', visionDefect: '1' },
      { id: 3, neighbors: [9], age: '1', cityDistrict: '1', company: '1', visionDefect: '1' },
    ];
    const colors = [[6, 7, 4], [8, 5, 9]];
    expect(sortBySaturationDegree(tubes, colors).map((el) => el.id)).toStrictEqual([
      2, 1, 3
    ])
  });

  test('dSatur should result with colored graph verticies', async () => {
    const graph = getTubesGraph(tubes);
    expect(dSatur(graph)).toStrictEqual([[8, 2, 4], [10, 3, 9], [5, 7, 1, 6]])
  });

  test('dSatur should result one rack when there is one tube', async () => {
    const graph: Array<GraphTube> = [{ age: '1', cityDistrict: '1', company: '1', id: 1, neighbors: [], visionDefect: '1' }]
    expect(dSatur(graph)).toStrictEqual([[1]])
  });
});
