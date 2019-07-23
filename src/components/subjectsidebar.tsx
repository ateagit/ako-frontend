import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

interface IState {
    subjects: string[];
    collapse: boolean;
}

interface IProps {
    title: string;
    style?: object;
    collapseSidebar: () => void
};

class SubjectSideBar extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            subjects: ["Mathematics", "Computer Science", "English", "Accounting"],
            collapse: false
        }
    }

    collapseSideBar = () => {
        this.setState(
            {
                collapse: !this.state.collapse
            }
        );
        this.props.collapseSidebar();
    }

    render() {

        let subjects: any;

        if(this.state.collapse) {
            subjects = (
                <ListGroup style = {{height: "100%", border: "1px solid #f0f0f0"}}>
                    <ListGroup.Item> 
                        <Button style = {{float:"right"}} onClick = {this.collapseSideBar}> 
                            Open
                        </Button> 
                    </ListGroup.Item>
                </ListGroup>
            );
        } else {
            subjects = (
            <ListGroup variant = "flush" style = {{height: "100%", border: "1px solid #f0f0f0", ...this.props.style}}>
                <ListGroup.Item style = {{fontWeight:500}}>
                    {this.props.title}
                    <Button style = {{float:"right"}} onClick = {this.collapseSideBar}> Close </Button>
                </ListGroup.Item>
                <ListGroup.Item action = {true}>
                    Subject 1
                </ListGroup.Item>
                <ListGroup.Item action = {true}>
                    Subject 2
                </ListGroup.Item>
                <ListGroup.Item action = {true}>
                    Subject 3
                </ListGroup.Item>
                <ListGroup.Item action = {true}>
                    Subject 4
                </ListGroup.Item>
            </ListGroup>
            );
        }

        return subjects;
    }
}

export default SubjectSideBar;