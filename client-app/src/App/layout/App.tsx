import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Container, Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import { act } from '@testing-library/react';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
          setActivities(response.data);
    })
  }, [])

  function handleSelectActivity (id: string){
    setSelectActivity(activities.find(x => x.id === id))
  }

  function handleCancelActivity(){
    setSelectActivity(undefined);
  }

  function handleFormOpen(id? : string){
    id ? handleSelectActivity(id) : handleCancelActivity()
    setEditMode(true)
  }

  function handleFormClose(){
    setEditMode(false)
  }

  function handleCreateOrEditActivity(activity: Activity){
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) : 
    setActivities([...activities, activity])
    setEditMode(false)
    setSelectActivity(activity)
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard
         activities={activities}
         selectedActivity={selectedActivity}
         selectActivity={handleSelectActivity}
         cancelActivity={handleCancelActivity}
         editMode={editMode}
         openForm={handleFormOpen}
         closeForm={handleFormClose}
         createOrEdit={handleCreateOrEditActivity}
         />
      </Container>
    </>
  );
}

export default App;
