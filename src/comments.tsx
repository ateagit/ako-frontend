import React, { CSSProperties } from "react";
import { Card, Button } from "@material-ui/core";

interface IProps {
    comments: any;
    courseId: number
}


const cardStyling = {
    width: "80%",
    margin: "0 auto",
    marginTop: "50px",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 0 11px 0px #f1f1f1",
    border: "1px solid #ececec",
    textAlign: "center"
} as CSSProperties;

class CommentsBox extends React.Component<IProps, {}> {



    public postComment = () => {
        const url = "https://localhost:44383/api/Comments";

        const titleElement = document.getElementById("title") as HTMLInputElement;


        if(titleElement == null || titleElement.value == "") {
            alert("Please enter a title");
            return;
        }

        const _body:any = {
            courseId: this.props.courseId,
            message: titleElement.value,
            userId: 1
        };

        const jsonBody = JSON.stringify(_body);

        fetch(url,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "content-type": "application/json"
            },
            body: jsonBody
        }).then((response: Response) => {
            alert(response.statusText)
        });  
    }

    render() {
        return(

            <Card style = {cardStyling}>
                <h4> Comments </h4>
                {
                    this.props.comments != null ? this.props.comments.map((e: any, i: number) => {
                        return (
                            <div key = {"comment" + i}>
                                <h6>{i+1} : {e.message}</h6>
                            </div>
                        )
                    }) : <div>None</div>
                }
                <input id = "title" style = {{display: "block", border: "none", fontSize: "20px", width: "100%", marginBottom: "20px"}} type = "text" name = "title" placeholder = "Enter comment here..."/>

                <Button variant = "contained" color="primary" onClick = {this.postComment}> Post Comment </Button>
                
                
            </Card>
        )
    }
}

export default CommentsBox;