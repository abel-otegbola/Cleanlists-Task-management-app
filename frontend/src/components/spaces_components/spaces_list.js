import { useEffect } from "react"

const SpaceList = ({ spaces, user, active, setActive }) => {

    const handleCreateSpace = (e) => {
        if(user === "" || user === undefined || user === null) {
            e.preventDefault()
        }
    }
    useEffect(() => {
        if(spaces !== [] && spaces !== undefined && spaces !== "") {
            console.log(spaces)
        }
    },[spaces, active, setActive])

    return (
        <div className="space-list">
            {
                spaces.filter(element => element.createdBy === user).map(space => { return (
                    <div key={space.id} className={`space ${(active === `${space.name}`) ? "active" : ""}`} onClick={() => setActive(space.name)} >
                        <p>{space.name}</p>
                    </div>
                ) })
            }
            
            <form className="space" action="/api/spaces/createSpace" method="post">
                <input type="text" name="name" placeholder="New space" />
                <input type="text" name="createdBy" value={user} readOnly style={{ display: "none" }}/>
                <button onClick={(e) => handleCreateSpace(e)}>Add</button>
            </form>
        </div>
    )
}

export default SpaceList;