import * as React from 'react';

import s from './styles.module.sass';

const Welcome: React.FC = () => (
  <div className={s.wrapper}>
    <div className={s.content}>
      <div className={s.text}>Hello there!</div>
    </div>
  </div>
);

export default React.memo(Welcome);