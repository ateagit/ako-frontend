import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

interface IState {

}

interface IProps {
    titles: string[];
}

class SidePillar extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }
    render() {
        let sidepillar: any;
        let headings: any[] = this.props.titles.map(t => 
            <ListGroup.Item key = {t} action = {true}>
                {t}
            </ListGroup.Item>
        );

        sidepillar = (
            <ListGroup variant = "flush" style = {{height: "100%", border: "1px solid #f0f0f0"}}>
                {headings}
            </ListGroup>
        );

        return sidepillar;
    }
}

export default SidePillar;