import css from './styles/trashIconButton.module.scss';
import Trash from '../../libs/svgs/trash';
import { useUserStore } from '../../context/usersContext';

type Props = {
  index: number;
};

export default function TrashIconButton({ index }: Props) {
  const { deleteUser } = useUserStore();

  return (
    <div className={css['delete-btn']} onClick={() => deleteUser(index)}>
      <Trash className={css['delete-icon']} fill="red" />
    </div>
  );
}
