
import './MainPage.css'
import NewsIndex from './NewsIndex'
import IndexSidebar from './IndexSidebar'

function MainPage() {
  return (
    <>
      <div className="index-container">
        <NewsIndex />
        <IndexSidebar />
      </div>

      <p>A Twitter Clone</p>
      <footer>
        Copyright &copy; 2022 Chirper
      </footer>
    </>
  );
}

export default MainPage;
