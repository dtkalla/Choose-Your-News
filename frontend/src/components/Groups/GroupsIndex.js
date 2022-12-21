import './Groups.css'

function GroupsIndex({groups}) {

    const groupItems = groups.map((group) => {
        return (
          <div key={group._id} className="groups-index-items-container">
            <img className="groups-index-items-icon" src="https://www.iconpacks.net/icons/2/free-folder-icon-1437-thumb.png"></img>
            <div className="groups-index-items-details">
                <h1 className="groups-index-items-name">
                    {group.name}
                </h1>
                <h1 className="groups-index-items-figures">
                    {group.figures.length} {group.figures.length > 1 ? "figures" : "figure"}
                </h1>
            </div>         
          </div>
        )
    })

    return (
        <div className="groups-index-container">
            {groupItems}
        </div>
    );
}


export default GroupsIndex;