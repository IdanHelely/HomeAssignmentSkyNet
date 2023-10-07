import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const StyledAddButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 10px',
  backgroundColor: '#3270ae',
  '&:hover': {
    backgroundColor: '#2989e8',
  },
});

type Props = {
  disabled?: boolean;
  handleClick?: () => void;
};

export default function AddButton({ disabled, handleClick }: Props) {
  return (
    <StyledAddButton variant="contained" disabled={disabled} onClick={handleClick}>
      <AddIcon fontSize="inherit" />
    </StyledAddButton>
  );
}
