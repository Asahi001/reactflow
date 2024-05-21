import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { ReactComponent as Msg } from "./assets/icons/message-circle.svg";
import whatsapp from "./assets/images/whatsapp.png";

function MessageNode({ data, isConnectable }) {
  return (
    <div onClick={() => {
      
    }}>
      <div className="flex flex-col border rounded shadow-lg w-44">
        <div className="font-bold w-full text-xs bg-green-200 rounded-t flex flex-row justify-between">
          <div className="flex">
            <div className="flex items-center px-2">
              <Msg className="h-2 w-2" />
            </div>
            <div className="flex text-center">Send Message</div>
          </div>
          <div className="flex items-center px-2">
            <img className="w-3 h-3 relative" src={whatsapp} alt={`-`} />
          </div>
        </div>
        <div className="flex pl-2 text-xs py-2">{data?.value}</div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={data?.id}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={data?.id}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default MessageNode;
