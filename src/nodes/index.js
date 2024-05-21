import { PositionLoggerNode } from "./PositionLoggerNode";

export const initialNodes = [
  { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "wire" } },
  {
    id: "b",
    type: "input",
    title: 'Title',
    position: { x: -100, y: 100 },
    data: { label: "drag me!" , text: "value"},
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
};
