// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchGroup } from '../../store/groups';
// // import GroupsIndex from './GroupsIndex'
// import './Groups.css'

// function GroupShow() {
//     const groupId = useParams().id
//     const dispatch = useDispatch();
//     const group = useSelector(state => state.groups.group);
    
//     useEffect(() => {
//         dispatch(fetchGroup(groupId));
//         // return () => dispatch(clearGroupErrors());
//     }, [dispatch])

//     // if (!group) {
//     //     return null;
//     // }
//     const groupFigures = [];
//     group.figures.forEach(figure => {

//         const groupFigure = (
//             <>
//             <img className="groups-index-items-icon" src="https://www.iconpacks.net/icons/2/free-folder-icon-1437-thumb.png"></img>
//             <div className="groups-index-items-details">
//                 <h1 className="groups-index-items-name">
//                     {figure.name}
//                 </h1>
//             </div>    
//             </>     
//         )
//         groupFigures.push(groupFigure);
//     })


//   return (

//     <div className="groups-container">
//         <div className="groups-user-profile">
//             <img className="groups-user-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxXj6tCpW_4LDNshUHKhTxsajwGNQPjfXj3A&usqp=CAU"></img>
//             <div className="groups-user-name">{group.name}</div>
//         </div>
//         {groupFigures}

//         <p>A Twitter Clone</p>
//         <footer>
//             Copyright &copy; 2022 Chirper
//         </footer>
//     </div>
    
//   );
// }


// export default GroupShow;