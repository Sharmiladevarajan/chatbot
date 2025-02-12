import { useEffect, useState } from "react";

export function Text(data: any) {
  const [pointsArr, setPointsArr] = useState([]);
  useEffect(() => {
    Content(data?.record?.value);
  }, []);
  const Content = (content: any) => {
    let points;
    if (/:|\n|\d+\./.test(content)) {
      points = content.split(/:|\n/).filter((item:any) => item.trim() !== "");
    } else if (
      /\u2022|\u2023|\u25E6|\u2043|\u2219|\u25AA|\u25AB|\u25FC|\u25FD|\u25FE|\u25AA|\u00B7|\u00D8|\u00B0|\u2219|\u2022|\u2023|\u25E6|\u2043|\u2219|\u25AA|\u25AB|\u25FC|\u25FD|\u25FE|\u25AA|\u00B7|\u00D8|\u00B0|\u2219/.test(
        content
      )
    ) {
      points = content
        .split(
          /[\u2022\u2023\u25E6\u2043\u2219\u25AA\u25AB\u25FC\u25FD\u25FE\u25AA\u00B7\u00D8\u00B0\u2219]/
        )
        .filter((item:any) => item.trim() !== "");
    } else {
      points = [content.trim()]; // If none of the delimiters match, consider the whole content as a single point
    }
    setPointsArr(points);
  };

  return (
    <>
      {" "}
      {data?.record?.role == "bot" ? (
        <span>
          {pointsArr?.map((point: any, index) => (
            <p className="points" key={index}>{point?.trim()}</p>
          ))}
        </span>
      ) : (
        data?.record?.value
      )}
    </>
  );
}
