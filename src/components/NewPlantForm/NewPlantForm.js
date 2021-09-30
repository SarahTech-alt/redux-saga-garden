import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const NewPlantForm = () => {
    const dispatch = useDispatch();

    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState({ id: 4, name: '', kingdom: '', clade: '', order: '', family: '', subfamily: '', genus: '' });

    // const handleNameChange = (event) => {
    //     event.preventDefault();
    //     console.log('event happened');
    //     //Similar to in redux -- we dont want to get rid of the id field when we update name
    //     setPlant({ ...newPlant, name: event.target.value })
    // }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'ADD_PLANT', payload: newPlant });
        //updates the next plant to have a new id
        setPlant({ id: newPlant.id + 1, name: '' });
    }
    return (
        <div>
            <h3>This is the form</h3>
            <pre>{JSON.stringify(newPlant)}</pre>
            <form onSubmit={addNewPlant}>
                <input type='text' value={newPlant.name} 
                placeholder='Name' onChange={(event) => setPlant({ ...newPlant, name: event.target.value })} />

                <input type='text' value={newPlant.kingdom} placeholder='Kingdom' onChange={(event) => setPlant({ ...newPlant, kingdom: event.target.value })} />

                <input type='text' value={newPlant.clade} placeholder='Clade' onChange={(event) => setPlant({ ...newPlant, clade: event.target.value })} />

                <input type='text' value={newPlant.order} placeholder='Order' onChange={(event) => setPlant({ ...newPlant, order: event.target.value })} />

                <input type='text' value={newPlant.family} placeholder='Family' onChange={(event) => setPlant({ ...newPlant, family: event.target.value })} />

                <input type='text' value={newPlant.subfamily} placeholder='Subfamily' onChange={(event) => setPlant({ ...newPlant, subfamily: event.target.value })} />

                <input type='text' value={newPlant.genus} placeholder='Genus' onChange={(event) => setPlant({ ...newPlant, genus: event.target.value })} />

                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default NewPlantForm;
