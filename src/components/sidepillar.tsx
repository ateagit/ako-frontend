import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

interface IState {
    selectedNav: number;
}

interface IProps {
    depth: number;
    titles: string[];
    collapsePillar: (depthToCollapseFrom: number) => void;
    selectNav: (navIndex: number, depth: number) => void;
}

class SidePillar extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            selectedNav: 0
        };
    }

    selectNav = (navIndexSelected: number) => {
        this.setState({
            selectedNav: navIndexSelected
        })

        this.props.selectNav(navIndexSelected, this.props.depth);
    }
    render() {
        let sidepillar: any;
        // Map each title to a list-group item.
        let headings: any[] = this.props.titles.map((t, i) => 
            <ListGroup.Item key = {t} action = {true} onClick = {() => this.selectNav(i)}>
                {t}
            </ListGroup.Item>
        );

        sidepillar = (
            <ListGroup variant = "flush" style = {{height: "100%", border: "1px solid #f0f0f0"}}>
                {headings}
                <Button onClick = {() => this.props.collapsePillar(this.props.depth)}>Back</Button>
            </ListGroup>
        );

        return sidepillar;
    }
}

export default SidePillar;