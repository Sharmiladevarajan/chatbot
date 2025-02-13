import { useState } from "react";

export function Buttons({ record }:any) {
  const [disabledButtons, setDisabledButtons] = useState(new Set());
  
  const handleClick = (id:any) => {
    setDisabledButtons((prev) => new Set(prev.add(id)));
    record.func(id, "btn");
  };

  return (
    <>
      {record.value.map((val:any) => (
        <div key={val.options} className="col-md-6 mb-4 mt-3">
          <button
            id={val.options}
            disabled={disabledButtons.has(val.options)}
            className={
              disabledButtons.has(val.options)
                ? "btn-disabled"
                : "ai-button-style"
            }
            onClick={() => handleClick(val.options)}
          >
            {val.options}
          </button>
        </div>
      ))}
    </>
  );
}
