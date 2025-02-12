import { useState } from "react";

export function Buttons(data: any) {
  const [disabledValue, setDisabledValue] = useState(false);
 
  const len = data?.record?.msg?.chatConversation?.length;

  
  const bindchoics = () => {
    return data?.record.value.map((val: any, index: any) => (
      <>
        {" "}
        <button
          id={val.options}
          disabled={disabledValue}
          className={
            disabledValue
              ? "btn-disabled"
              
              : "ai-button-style"
          }
          onClick={(e: any) => {
              setDisabledValue(true);
              data.record.func(e.target.id, "btn");
          }}
        >
          {val.options}
        </button>
      </>
    ));
  };
  return <>{bindchoics()}</>;
}
