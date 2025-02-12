
import { Text } from "./HTMLComponents/Text";
import { Buttons } from "./HTMLComponents/Buttons";
import { Document } from "./HTMLComponents/Document";
import HTMLContent from "./HTMLComponents/html"

export function BindBotResponse({ record }:any) {
  const { contentType, content} = record.value;
  const {role,file_func,func,message}  = record;
console.log(record,"props");

  const renderComponent = () => {
    const commonProps = { value: content,role };
    console.log(commonProps);
    
    switch (contentType) {
      case 'txt':
        return (
          <div className="col-md-6 mb-4 mt-3">
            <Text {...commonProps} />
          </div>
        );
      case 'html':
        return (
          <div className="col-md-6 mb-4 mt-3">
            <HTMLContent {...commonProps} />
          </div>
        );
      case 'btn':
        return (
          <div className="col-md-6 mb-4 mt-3">
            <Buttons value={content} func={func} msg={message} />
          </div>
        );
      case 'doc':
        return (
          <div className="col-md-6 mb-4 mt-3">
            <Document value={content} func={file_func} />
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
}

export default BindBotResponse;
