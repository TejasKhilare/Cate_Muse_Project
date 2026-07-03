import classes from './PageLoader.module.css';
import { Spinner } from '@/components';

export const PageLoader = () => {
  return (
    <div className={classes.pageLoader}>
      <Spinner />
    </div>
  );
};
