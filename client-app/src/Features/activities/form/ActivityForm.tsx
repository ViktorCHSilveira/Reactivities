import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";

interface Props{
    activity: Activity | undefined
    closeForm:() => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit, submitting}: Props){
    
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city:'',
        venue:''
    };

    const [activity, setActivity] = useState(initialState);

    function handleSubmit(){
        createOrEdit(activity)
        
    }

    function handleImputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target
        
        setActivity({...activity, [name] : value})

    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleImputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleImputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleImputChange}/>
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleImputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleImputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleImputChange}/>
                <Button loading={submitting} floated="right" positive type="submit" content="Submit"/>
                <Button floated="right" onClick={closeForm} type="submit" content="Cancel"/>
            </Form>
        </Segment>
    )

}