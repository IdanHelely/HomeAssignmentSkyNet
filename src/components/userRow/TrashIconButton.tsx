import css from './styles/trashIconButton.module.scss';
import Trash from '../../libs/svgs/trash';

export default function TrashIconButton() {
  return (
    <div className={css['delete-btn']}>
      <Trash className={css['delete-icon']} fill="red" />
    </div>
  );
}
