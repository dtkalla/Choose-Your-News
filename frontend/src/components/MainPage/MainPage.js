import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearGroupErrors, fetchUserGroups } from '../../store/groups';
import './MainPage.css'
import NewsIndex from './NewsIndex'
import IndexSidebar from './IndexSidebar'

function MainPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userGroups = useSelector(state => state.groups.user);

  useEffect(() => {
    dispatch(fetchUserGroups(currentUser._id));
    return () => dispatch(clearGroupErrors());
  }, [dispatch])

  if (!(userGroups.length > 0)) {
    return null
  }

  return (
    <>
      <div className="index-container">
        <NewsIndex />
        <IndexSidebar groups={userGroups}/>
      </div>

      <p>A Twitter Clone</p>
      <footer>
        Copyright &copy; 2022 Chirper
      </footer>
    </>
  );
}


export default MainPage;