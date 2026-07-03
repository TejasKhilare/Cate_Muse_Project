import SpinnerIcon from '@/assets/icons/SpinnerIcon.svg';
import classes from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={classes.spinner}>
      <SpinnerIcon />
    </div>
  );
};
