import css from './styles/trashIconButton.module.scss';
import Trash from '../../libs/svgs/trash';
import { useUserStore } from '../../context/usersContext';

type Props = {
  id: string;
};

export default function TrashIconButton({ id }: Props) {
  const { deleteUser } = useUserStore();

  return (
    <div className={css['delete-btn']} onClick={() => deleteUser(id)}>
      <Trash className={css['delete-icon']} fill="red" />
    </div>
  );
}
