import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loadin, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let Activities: Activity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0]
          Activities.push(activity)
        })
          setActivities(response.sort((a, b) => a.date > b.date ? 1 : -1));
          setLoading(false);
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
    setSubmitting(true);
    if(activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setEditMode(false);
        setSelectActivity(activity);
        setSubmitting(false);
      })
    } 
    else{
      activity.id = uuid();
      agent.Activities.create(activity).then(() =>{
        setActivities([...activities, activity])
        setEditMode(false)
        setSelectActivity(activity)
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity (id: string){
    setSubmitting(true)
    agent.Activities.del(id).then(() =>{
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false);
    })
    
  }

  if(loadin) return <LoadingComponent content='Loading app'/>


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
         submitting={submitting}
         />
      </Container>
    </>
  );
}

export default App;
