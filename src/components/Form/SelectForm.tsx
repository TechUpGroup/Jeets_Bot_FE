import Select, { Props } from 'react-select';

export const SelectForm = ({ styles, ...props }: Props) => {
  return (
    <Select
      // isClearable
      styles={{
        control: (baseStyles) => {
          return {
            ...baseStyles,
            background: 'white',
            borderColor: 'rgba(192, 192, 192, 1)',
            borderRadius: 8,
            // border: 'unset',
          };
        },
        option: (styles, { isSelected }) => {
          return {
            ...styles,
            color: isSelected ? 'white' : 'black',
            backgroundColor: isSelected ? 'rgba(96, 149, 243, 1)' : 'unset',
            ':hover': {},
            ':active': {
              backgroundColor: 'rgba(96, 149, 243, 1)',
            },
          };
        },
        menu: (styles) => {
          return {
            ...styles,
            color: 'black',
            background: 'white',
            backdropFilter: 'blur(8px)',
          };
        },
        singleValue: (styles) => {
          return {
            ...styles,
            color: 'black',
          };
        },
        input: (styles) => {
          return {
            ...styles,
            color: 'black',
            opacity: 0.75,
          };
        },
        indicatorSeparator: () => {
          return {
            display: 'none',
          };
        },
        ...styles,
      }}
      {...props}
    />
  );
};
