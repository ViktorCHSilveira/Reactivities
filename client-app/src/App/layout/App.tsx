import React, { useEffect, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
          setActivities(response.sort((a: Activity, b: Activity) => a.date > b.date ? 1 : -1));
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
    setActivities([...activities, {...activity, id: uuid()}])
    setEditMode(false)
    setSelectActivity(activity)
  }

  function handleDeleteActivity (id: string){
    setActivities([...activities.filter(x => x.id !== id)])
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
         deleteActivity={handleDeleteActivity}
         />
      </Container>
    </>
  );
}

export default App;
