import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, clearUserErrors } from '../../store/users';
import './MainPage.css'
import NewsIndex from './NewsIndex'
import IndexSidebar from './IndexSidebar'

function MainPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const user = useSelector(state => state.users.user);

  useEffect(() => {
    dispatch(fetchUser());
    return () => dispatch(clearUserErrors());
  }, [dispatch])

  if (!user) {
    return null
  }

  return (
    <>
      <div className="index-container">
        {user.fetchedArticles &&
          // <NewsIndex newsFeed={user.fetchedArticles}/>
          <NewsIndex user={user}/>
        }

        {user.groups &&
          <IndexSidebar groups={user.groups}/>
        }
      </div>

      <p>A Twitter Clone</p>
      <footer>
        Copyright &copy; 2022 Chirper
      </footer>
    </>
  );
}


export default MainPage;