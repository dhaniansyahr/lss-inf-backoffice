import type { ReactNode } from "react";
import Select from "react-select";
import type {
    FormatOptionLabelMeta,
    GroupBase,
    OnChangeValue,
} from "react-select";

import type { SelectComponents } from "../../../node_modules/react-select/dist/declarations/src/components";

interface Option {
    label: string;
    value: string;
    [key: string]: any;
}

interface InputActionMeta {
    action: "set-value" | "input-change" | "input-blur" | "menu-close";
}

interface ISelectBaseProps<TOption extends Option = Option> {
    isDisabled?: boolean;
    isLoading?: boolean;
    isClearable?: boolean;
    isRtl?: boolean;
    isSearchable?: boolean;
    isMulti?: boolean;
    defaultValue?: TOption | TOption["value"] | null;
    options: Array<TOption>;
    onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
    onMenuScrollToBottom?: (event: WheelEvent | TouchEvent) => void;
    name?: string;
    [key: string]: any;
    placeholder?: string;
    onChange?: (value: OnChangeValue<TOption, false>) => void;
    value?: TOption | TOption["value"] | null;
    components?:
        | Partial<SelectComponents<any, boolean, GroupBase<any>>>
        | undefined;
    formatOptionLabel?:
        | ((
              data: any,
              formatOptionLabelMeta: FormatOptionLabelMeta<any>
          ) => ReactNode)
        | undefined;
    ref?: any;
    fullWith?: boolean;
    closeMenuOnSelect?: boolean;
    hideSelectedOptions?: boolean;
    isError?: boolean;
    bgColor?: string; // custom background color
}

function normalizeOption(option: any) {
    if (!option) return null;
    if (typeof option === "string") {
        return option === "" ? null : option;
    }
    if (typeof option === "object" && "label" in option && "value" in option) {
        if (option.label === "" && option.value === "") return null;
    }
    return option;
}

export default function SelectBase({
    isDisabled = false,
    isLoading = false,
    isClearable = false,
    isRtl = false,
    isSearchable = false,
    isMulti = false,
    defaultValue,
    options,
    placeholder,
    onChange,
    onInputChange,
    onMenuScrollToBottom,
    name,
    value,
    components,
    ref,
    formatOptionLabel,
    fullWith = false,
    closeMenuOnSelect = true,
    hideSelectedOptions = true,
    isError = false,
    bgColor, // custom background color
    ...props
}: ISelectBaseProps) {
    // Normalisasi options: hilangkan option yang label dan value kosong
    const normalizedOptions = options.filter(
        (opt) => !(opt.label === "" && opt.value === "")
    );

    // Normalisasi defaultValue dan value
    const defaultValueOption = normalizeOption(
        typeof defaultValue === "string"
            ? normalizedOptions.find((f) => f.value === defaultValue)
            : defaultValue
    );
    const valueOption = normalizeOption(
        typeof value === "string"
            ? normalizedOptions.find((f) => f.value === value)
            : value
    );

    return (
        <Select
            {...props}
            ref={ref}
            className="basic-single"
            classNamePrefix="select"
            onMenuScrollToBottom={onMenuScrollToBottom}
            defaultValue={defaultValueOption}
            closeMenuOnSelect={closeMenuOnSelect}
            hideSelectedOptions={hideSelectedOptions}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name={name}
            onInputChange={onInputChange}
            options={normalizedOptions}
            isMulti={isMulti}
            placeholder={placeholder}
            onChange={onChange}
            value={valueOption}
            components={{
                IndicatorSeparator: () => null,
                ...components,
            }}
            formatOptionLabel={formatOptionLabel}
            // menuPortalTarget={typeof window !== "undefined" ? document.body : undefined}
            styles={{
                container: (provided) => ({
                    ...provided,
                    width: fullWith ? "100%" : "auto",
                    position: "relative",
                }),
                control: (provided, state) => ({
                    ...provided,
                    border: `1px solid ${isError ? "#ef4444" : "#e5e5e5"}`,
                    borderRadius: "8px",
                    minHeight: "40px",
                    padding: "0 8px",
                    fontSize: "14px",
                    backgroundColor: bgColor
                        ? bgColor
                        : isDisabled
                        ? "#e5e7eb"
                        : "white",
                    opacity: isDisabled ? 0.6 : 1,
                    borderColor: isError
                        ? "#ef4444"
                        : state.isFocused
                        ? "#00808077"
                        : "#e5e5e5",
                    boxShadow: "none",
                    cursor: isDisabled ? "not-allowed" : "default",
                    position: "relative",
                    "&:hover": {
                        borderColor: isError
                            ? "#ef4444"
                            : state.isFocused
                            ? "#00808077"
                            : "#00808077",
                    },
                }),
                placeholder: (provided) => ({
                    ...provided,
                    color: "#9CA3AF",
                    opacity: 1,
                }),
                menu: (provided) => ({
                    ...provided,
                    border: "1px solid #e5e5e5",
                    borderRadius: "4px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
                    marginTop: "4px",
                    overflow: "hidden",
                    position: "absolute",
                    backgroundColor: bgColor ? bgColor : "white",
                }),
                menuList: (provided) => ({
                    ...provided,
                    padding: "8px",
                    borderRadius: "4px",
                }),
                option: (provided, state) => ({
                    ...provided,
                    fontWeight: "400",
                    fontSize: "14px",
                    backgroundColor: state.isSelected ? "#F6F8FA" : "white",
                    color: state.isSelected ? "#1F2937" : "#1F2937",
                    borderRadius: "4px",
                    margin: "2px 0",
                    padding: "12px 16px",
                    cursor: "pointer",
                    "&:hover": {
                        backgroundColor: "#F6F8FA",
                    },
                    boxShadow: state.isFocused
                        ? "0px 0px 0px 1px #00808077"
                        : "none",
                }),
                clearIndicator: (provided) => ({
                    ...provided,
                    color: "#6B7280",
                    "&:hover": {
                        color: "#111827",
                    },
                }),
            }}
        />
    );
}
