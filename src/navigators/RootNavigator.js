import React from 'react';
import { useSelector } from 'react-redux';
import FindNavigator from './search/FindNavigator';
import ManageNavigator from './manage/ManageNavigator';

export default React.memo(() => {
  const role = useSelector(state => state.role);
  return role === 'FINDER' ? <FindNavigator /> : <ManageNavigator />;
});
