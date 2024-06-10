import { Segment } from "./App";

type ChevronChartProps = {
  chevrons: Segment[];
};

export const ChevronChart = ({ chevrons }: ChevronChartProps) => {
  const getSegmentColor = (index: number, total: number) => {
    const initialColor = "rgb(40,40,40)";
    if (total == 1) {
      return initialColor;
    }
    const step = Math.floor(205 / (total - 1));
    const blueValue = 50 + step * index;
    const greenRedValue = Math.floor(blueValue * 0.8);

    return `rgb(${greenRedValue}, ${greenRedValue}, ${blueValue})`;
  };
  return (
    <div>
      <ul className="chevron-segments">
        {chevrons.map((chevron, index) => {
          const color = getSegmentColor(index, chevrons.length);
          return (
            <li
              key={chevron.id}
              style={
                {
                  "--chevron-bg-color": color,
                } as React.CSSProperties
              }
            />
          );
        })}
      </ul>
    </div>
  );
};
