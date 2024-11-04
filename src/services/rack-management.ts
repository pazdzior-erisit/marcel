import { Tube } from './tube';

export type GraphTube = Tube & {
  neighbors: Array<number>
};

export const getTubesGraph = (tubes: Array<Tube>): Array<GraphTube> => (
  tubes.map((el, index) => {
    const neighbors = tubes.filter((item, id) => (
      id !== index &&
      (item.age === el.age ||
      item.cityDistrict === el.cityDistrict ||
      item.company === el.company ||
      item.visionDefect === el.visionDefect)
    )).map((item) => item.id);
    return { ...el, neighbors };
  })
)

export const isRackSafe = (rack: Array<number>, neighbors: Array<number>) => (
  !rack.some((item) => neighbors.includes(item))
);

export const sortByDegree = (tubes: Array<GraphTube>): Array<GraphTube> => (
  [...tubes].sort((a, b) => b.neighbors.length - a.neighbors.length)
);

const getSaturationDegree = (tube: GraphTube, colors: Array<Array<number>>) => {
  const neighborsColors = tube.neighbors.map((el) => (
    colors.findIndex((item) => item.includes(el))
  ));
  return new Set(neighborsColors).size;
};

export const sortBySaturationDegree = (tubes: Array<GraphTube>, colors: Array<Array<number>>) => {
  const tubesWithSaturationDegree = tubes.map((el) => ({ ...el, saturation: getSaturationDegree(el, colors) }));
  return tubesWithSaturationDegree.sort((a, b) => (
    b.saturation - a.saturation || b.neighbors.length - a.neighbors.length
  ));
};

export const sortByRackOccupancy = (colors: Array<Array<number>>) => (
  [...colors].sort((a, b) => a.length - b.length)
)

export const dSatur = (tubes: Array<GraphTube>) => {
  const sortedByDegree = sortByDegree(tubes);
  let [selectedVertex, ...restOfTubes] = sortedByDegree;
  let colors = [[selectedVertex.id]];
  for (let i = 0; i < tubes.length - 1; i++) {
    const [maximalSaturationVertex, ...rest] = sortBySaturationDegree(restOfTubes, colors);
    restOfTubes = rest;
    const index = colors.findIndex((rack) => isRackSafe(rack, maximalSaturationVertex.neighbors));
    if (index === -1) {
      colors = [...colors, [maximalSaturationVertex.id]];
    } else {
      colors[index] = [...colors[index], maximalSaturationVertex.id];
    }
    colors = sortByRackOccupancy(colors);
  }

  return colors;
};

