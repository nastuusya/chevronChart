import { useState } from "react";
import { ChevronChart } from "./ChevronChart";

export type Segment = {
  id: number;
  checked: boolean;
};
function App() {
  const [checkboxes, setCheckboxes] = useState<Segment[]>([
    { id: 1, checked: false },
  ]);

  const [chevronSegments, setChevronSegments] = useState<Segment[]>([]);

  const handleCheckBoxes = (index: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    if (index === newCheckboxes.length - 1 && newCheckboxes[index].checked) {
      newCheckboxes.push({ id: index++, checked: false });
    }

    const isAnyCheckboxChecked = newCheckboxes.some(
      (checkbox) => checkbox.checked
    );

    if (!isAnyCheckboxChecked) {
      newCheckboxes[index].checked = true;
    }

    setCheckboxes(newCheckboxes);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const checkedCheckboxes = [...checkboxes].filter(
      (checkbox) => checkbox.checked
    );
    setChevronSegments(checkedCheckboxes);
  };

  const isChevronChartEnabled = checkboxes.some((checkbox) => checkbox.checked);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          {checkboxes.map((checkbox, index) => (
            <input
              type="checkbox"
              key={`checkbox-${checkbox.id}`}
              id={`checkbox-${checkbox.id}`}
              checked={checkbox.checked}
              onChange={() => handleCheckBoxes(index)}
            />
          ))}
        </div>
        <button type="submit" disabled={!isChevronChartEnabled}>
          Create chevron chart
        </button>
      </form>
      {isChevronChartEnabled ? (
        <ChevronChart chevrons={chevronSegments} />
      ) : (
        <h3>Please check at least one checkbox to create a chevron chart</h3>
      )}
    </>
  );
}

export default App;
