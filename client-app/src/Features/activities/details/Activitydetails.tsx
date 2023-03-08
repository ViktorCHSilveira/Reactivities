import { Button, Card,  Image } from 'semantic-ui-react'
import { Activity } from '../../../App/models/activity'

interface Props {
    activity: Activity
    cancelActivity: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails({ activity, cancelActivity, openForm }: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group>
                    <Button basic onClick={() => openForm(activity.id)} color='blue' content='Edit'/>
                    <Button onClick={cancelActivity} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}