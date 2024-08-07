import { Container } from "@/components";
import { classNames } from "@/utils/classNames";
import { shuffleChars } from "@/utils/shuffleChars";

export interface DropDownProps {
  items: string[];
  id: string;
  selectedValue?: string | null;
  fullWidth?: boolean;
  isRequired?: boolean;
  onSelect: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export const DropDown = ({
  items,
  id,
  selectedValue,
  fullWidth,
  isRequired = false,
  onSelect,
  className,
  disabled = false,
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
        disabled={disabled}
        // defaultValue={"DEFAULT"}
        value={selectedValue ? selectedValue : "DEFAULT"}
        onChange={handleChange}
        required={isRequired ? true : false}
        className={classNames(
          className,
          "w-full h-full capitalize px-[8px] bg-surface-dark border-none rounded-md text-on-surface disabled:text-on-surface/40 cursor-pointer"
        )}
      >
        <option value="DEFAULT" disabled>
          Select option...
        </option>
        {items !== null &&
          items !== undefined &&
          items.map((item, index) => (
            <option
              className="capitalize"
              key={id + "-" + item + "-" + index}
              value={item}
            >
              {item}
            </option>
          ))}
      </select>
    </Container>
  );
};
