export const selectStyle = {
  // general select
  control: (provided: any) => ({
    ...provided,
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#909296',
    boxShadow: '0px 0px 8px #0000005a',
    padding: '2px',
    minHeight: 'none',
  }),
  container: (provided: any) => ({
    ...provided,
    width: '100%',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: '0',
    width: '100%',
    // outerWidth: "800px",
  }),
  // Line between option and the arrow
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    padding: '0px',
  }),
  // options in the dropdown
  option: (provided: any) => ({
    ...provided,
    color: 'black',
    backgroundColor: '#909296',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#90929605',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#9b9b9b',
    borderRadius: '5px',
    overflowY: 'hidden',
    zIndex: 10,
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: '0 0 0 0',
    borderRadius: '5px',
    '::-webkit-scrollbar': {
      width: '0px',
    },
  }),
  // chosen value
  singleValue: (provided: any) => ({
    ...provided,
    color: 'black',
  }),
  input: (provided: any) => ({
    ...provided,
    padding: 0,
    margin: 0,
    color: 'black',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#757575',
  }),
};
