import React, { CSSProperties } from "react";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { NavLink } from "react-router-dom";
import { Route } from "react-router";


interface IState {
    open: boolean;
}

interface IProps {
    title: string;
    parents: string;

}

const buttonStyle = {
    width: "100%", 
    justifyContent: "flex-start", 
    color: "#5a5a5a",
    textTransform: "none",
    fontSize: "16px"
} as CSSProperties;

const activeButtonStyle = {
    backgroundColor: "#ec7ca2",
    color: "#fffdfd",
    boxShadow: "#ca7393 0px 0px 0px 1px inset"
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
    const link:string = `/courses${this.props.parents}/${this.props.title}`.replace(/ /g,"-").toLowerCase();  
        const nestedButton = (
            <React.Fragment>
                <NavLink key = {this.props.title + "link"} to = {link} style = {{textDecoration: "none"}}>
                    <Route render={(match: any) => {
                        return (
                        <Button style = {Object.assign({}, buttonStyle, (match.location.pathname === link ? activeButtonStyle : {}))} onClick = {this.toggleOpen}>
                            {this.props.title}
                            {this.state.open ? <ArrowDropDown style = {{marginLeft: "auto"}} /> : <ArrowRight style = {{marginLeft: "auto"}} /> }
                        </Button>
                        );
                    }} />
                </NavLink>

                <Collapse in ={this.state.open} style = {{borderLeft: "1px solid  #e6e1e1", paddingLeft: "5px", marginLeft: "10px"}}>
                    
                        {this.props.children}
                        
                </Collapse>

            </React.Fragment>
        );

        return nestedButton;
    }




}

export default NestedButton;