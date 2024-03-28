import { Container } from "@/components";
import { classNames } from "@/utils/classNames";

export interface DropDownProps {
  items: string[];
  selectedValue?: string | null;
  fullWidth?: boolean;
  onSelect: (value: string) => void;
}

export const DropDown = ({
  items,
  selectedValue,
  fullWidth,
  onSelect,
}: DropDownProps) => {
  const handleChange = (event: any) => {
    onSelect(event.target.value);
  };

  return (
    <Container
      id="dropdown"
      intent="flexRowCenter"
      className={classNames(
        fullWidth ? "w-full" : "max-w-fit",
        "min-h-[48px] max-h-[48px] bg-surface-dark rounded-md"
      )}
    >
      <select
        onChange={handleChange}
        className="w-full h-full px-[8px] bg-surface-dark border-none rounded-md text-on-surface cursor-pointer"
      >
        {items.map((item) => (
          <option key={item} value={item} selected={item === selectedValue}>
            {item}
          </option>
        ))}
      </select>
    </Container>
  );
};
