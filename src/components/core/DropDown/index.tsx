import { Container } from "@/components";
import { classNames } from "@/utils/classNames";

export interface DropDownProps {
  items: string[];
  selectedValue?: string | null;
  fullWidth?: boolean;
  isRequired?: boolean;
  onSelect: (value: string) => void;
  className?: string;
}

export const DropDown = ({
  items,
  selectedValue,
  fullWidth,
  isRequired = false,
  onSelect,
  className,
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
        defaultValue={"DEFAULT"}
        value={selectedValue ? selectedValue : "DEFAULT"}
        onChange={handleChange}
        required={isRequired ? true : false}
        className={classNames(
          className,
          "w-full h-full px-[8px] bg-surface-dark border-none rounded-md text-on-surface cursor-pointer"
        )}
      >
        <option value="DEFAULT" disabled selected>
          Select option...
        </option>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </Container>
  );
};
