import "./App.css";

import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import { ReactComponent as Msg } from "./assets/icons/message-circle.svg";
import MessageNode from "./MessageNode.js";

const rfStyle = {
  backgroundColor: "",
};

const initialNodes = [
  {
    id: "1",
    type: "textUpdater",
    position: { x: -100, y: -100 },
    data: { id: "1", value: "Test message 1" },
  },
  {
    id: "2",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { id: "2", value: "Test message 2" },
  },
];

const initialEdges = [{ id: "1->2", source: "1", target: "2" }];

const nodeTypes = { textUpdater: MessageNode };

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [editId, setEditId] = useState("");
  const [editValue, setEditValue] = useState("");
  const [displaySubmit, setDisplaySubmit] = useState("");

  // node action methods

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((connection) => {
    const editedId = nodes?.find(
      (ele) => ele?.data?.value === connection?.target?.innerText
    )?.id;
    setEditValue(connection?.target?.innerText);
    setEditId(editedId);
  });

  const nodesPanel = [
    {
      type: "text",
      name: "message",
    },
  ];

  // drag action methods

  const dragStarted = (e, id) => {
    e.dataTransfer.setData("nodeId", id);
  };

  const onDragged = (e) => {
    e.preventDefault();
  };

  const dragDropped = (e) => {
    let dropId = parseInt(e.dataTransfer.getData("nodeId")) + 1;
    console.log(dropId);
    setNodes([
      ...nodes,
      {
        id: dropId.toString(),
        type: "textUpdater",
        position: { x: 200, y: -50 },
        data: { id: "node-1", value: "Test message " + dropId },
      },
    ]);
  };

  // updating Message

  const updateNodeMessage = (value) => {
    setEditValue(value);
    let avlNodes = [...nodes];
    avlNodes = avlNodes.map((ele) => {
      if (ele?.id === editId) {
        return { ...ele, data: { ...ele.data, value: value } };
      } else return ele;
    });
    setNodes(avlNodes);
  };

  const finalSave = () => {
    if (nodes.length > 2) {
      setDisplaySubmit("Cannot Save Flow");
    } else {
      setDisplaySubmit("Saved");
    }
    setTimeout(() => {
      setDisplaySubmit("");
    }, 4000);
  };

  return (
    <div className="h-screen w-screen">
      <div className="h-12 w-full grid grid-cols-6 bg-gray-200 pr-16">
        <div className="flex w-full col-span-5 justify-center items-center">
          <span
            className={`bg-pink-300 h-full flex items-center rounded-lg ${
              displaySubmit ? "px-8" : ""
            }`}
          >
            {displaySubmit ? displaySubmit : ""}
          </span>
        </div>
        <span className="flex w-full justify-end items-center">
          <button
            type="button"
            className="border-2 border-blue-600 text-blue-600 p-1 bg-white rounded-lg px-4 hover:bg-blue-200"
            onClick={() => {
              finalSave();
            }}
          >
            Save Changes
          </button>
        </span>
      </div>

      <div class="grid grid-cols-4 grid-flow-rows w-full h-full">
        <div
          droppable
          onDragOver={(e) => onDragged(e)}
          onDrop={(e) => dragDropped(e)}
          className="w-full h-5/6 col-span-3"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            style={rfStyle}
            onNodeClick={onNodeClick}
          >
            <Controls />
          </ReactFlow>
        </div>

        {/* this is the settings panel code */}
        <div className="flex flex-row p-4 border-l-2 border-gray-200">
          {nodesPanel?.map((ele) => {
            if (ele?.type === "text" && !editId) {
              return (
                <div
                  draggable
                  onDragStart={(e) => dragStarted(e, nodes.length)}
                  className="h-20 w-1/2 border-2 border-blue-600 rounded-lg flex flex-col justify-center items-center"
                >
                  <button className="h-8 w-10 text-blue-600" onClick={() => {}}>
                    <Msg />
                  </button>
                  <span className="text-blue-600">Message</span>
                </div>
              );
            } else if (ele?.type === "text" && editId) {
              return (
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-gray-400">Text</label>
                  <textarea
                    className="outline-none border border-gray-400 rounded-lg p-4"
                    id="myTextarea"
                    name="comments"
                    rows="4"
                    value={editValue}
                    onChange={(e) => updateNodeMessage(e.target.value)}
                  />
                  <div className="flex flex-row p-2 gap-2 w-full">
                    <button
                      type="button"
                      className="border border-blue-600 w-full p-2 rounded hover:bg-blue-200"
                      onClick={() => {
                        setEditId("");
                        setEditValue("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
