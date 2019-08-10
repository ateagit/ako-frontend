import React, { CSSProperties } from "react";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";


interface IState {
    open: boolean;
}

interface IProps {
    title: string;
    style: CSSProperties;
}

class NestedButton extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);

        this.state = {
            open: false
        }
    }
    public toggleOpen = () => {
        this.setState((prevState: IState) => {
            return {open: !prevState.open}
        })
    }

    render() {
        const nestedButton = (
            <React.Fragment>
                <Button style = {this.props.style} onClick = {this.toggleOpen}>
                    {this.props.title}
                    {this.state.open ? <ArrowDropDown style = {{marginLeft: "auto"}} /> : <ArrowRight style = {{marginLeft: "auto"}} /> }
                </Button>

                <Collapse in ={this.state.open} style = {{borderLeft: "1px solid #e6e1e1", paddingLeft: "5px", marginLeft: "10px"}}>
                    
                        {this.props.children}
                        
                </Collapse>

            </React.Fragment>
        );

        return nestedButton;
    }




}

export default NestedButton;