import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const plantList = useSelector(store => store.plantList);

        // on page load dispatch 'FETCH_PLANTS'
        // event to watcherSaga on index.js
    useEffect(() => {
        console.log('component did mount');
        dispatch({type:'FETCH_PLANTS'})
    }, []); 

    const deletePlant = (plantId) => {
        
        dispatch({type: 'DELETE_PLANT', payload: plantId})
    }
    return (
        <div>
            <h3>This is the plant list</h3>
            <pre>{JSON.stringify(plantList)}</pre><br />
            <ul>
                {plantList.map((plant) =>
                <li key={plant.id}>
                    Plant Name: {plant.name}  
                    <button onClick={(event) => deletePlant(plant.id)}>Delete</button>
                </li>
                )}
            </ul>
           
        </div>
    );
}

export default PlantList;
