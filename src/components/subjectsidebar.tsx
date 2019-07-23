import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

interface IState {
    subjects: string[];
    collapsed: boolean;
}

interface IProps {
    title: string;
    style?: object;
    collapseSidebar: (title: string) => void
};

class SubjectSideBar extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            subjects: ["Mathematics", "Computer Science", "English", "Accounting"],
            collapsed: false
        }
    }

    collapseSideBar = (title: string) => {
        this.setState(
            {
                collapsed: !this.state.collapsed
            }
        );
        
        this.props.collapseSidebar(title);
    }

    render() {

        let subjects: any;

        if(this.state.collapsed) {
            subjects = null
        } else {
            subjects = (
            <ListGroup variant = "flush" style = {{height: "100%", border: "1px solid #f0f0f0", ...this.props.style}}>
                <ListGroup.Item style = {{fontWeight:500}}>
                    {this.props.title}
                    <Button style = {{float:"right"}} onClick = { () => this.collapseSideBar(this.props.title)}> {"<<"} </Button>
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