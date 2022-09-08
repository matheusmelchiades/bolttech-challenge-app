export const Checkbox = {
  baseStyle: {
    icon: {
      color: 'white',
      height: "14px"
    },
    control: {
      border: '2px',
      borderColor: 'brand',
      borderRadius: '100px',
      height: '25px',
      width: '25px',
      '&[data-checked]': {
        bg: 'brand',
      },
      _disabled: {
        borderColor: 'gray.300',
        bg: 'gray.200',
      },
    },
    label: {
      fontWeight: 'medium',
      color: 'gray.900',
    },
  },
};
