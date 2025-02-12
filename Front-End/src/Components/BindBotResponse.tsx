import { Text } from "./HTMLComponents/Text";

import { Buttons } from "./HTMLComponents/Buttons";

import { Document } from "./HTMLComponents/Document";

import HTMLContent from "./HTMLComponents/html"


export function BindBotResponse(data: any) {
  const { contentType, content } = data?.record.value;
  console.log(data,content,contentType,"2345678");
  
  const returnComponents = () => {
    
    switch (contentType) {
      
      case "txt":
        return (
          <>
            <div className="col-md-6 mb-4 mt-3">
              <Text record={{ value: content ,role:data?.record?.role}} />
            </div>
          </>
        );
        case "html":
        return (
          <>
            <div className="col-md-6 mb-4 mt-3">
              <HTMLContent record={{ value: content ,role:data?.record?.role}} />
            </div>
          </>
        );
        
     case "btn":
        return (
          <>
            <div className="col-md-6 mb-4 mt-3">
              <Buttons
                record={{
                  value: content,
                  func: data.record.func,
                  msg:data?.record?.message
                }}
              />
            </div>
          </>
        );
     case "doc":
        return (
          <>
            <div className="col-md-6 mb-4 mt-3">
              <Document record={{ value: content,func:data.record.file_func }} />
            </div>
          </>
        );
      
        
      default:
        return null; // Default case, render nothing or handle accordingly
    }
  };

  return <>{returnComponents()}</>;
}

export default BindBotResponse;
