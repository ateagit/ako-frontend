import React from "react";
import Select from "react-select";
import { Editor, getEventTransfer } from "slate-react";
import CourseCreator from "./coursecreator";
import { Button, Card } from "@material-ui/core";
import Video from "./embeddedvideo";

import { Value } from "slate";
import { valueContainerCSS } from "react-select/src/components/containers";
import CommentsBox from "../comments";

interface IState {
    selectedCourse: any,
    courseOptions: any,
    editorState: Value
}

interface IProps {
    match: any
}

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                object: 'leaf',
                                text: ''
                            }
                        ]
                    }
                ]
            }
        ]
    }
  })

const schema = {
    blocks: {
        image: {
        isVoid: true
        },
        video: {
        isVoid: true
        }
    },
}

const cardStyling = {
    width: "80%",
    margin: "0 auto",
    marginTop: "50px",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 0 11px 0px #f1f1f1",
    border: "1px solid #ececec"
}
class CourseViewer extends React.Component<IProps, IState> {

    private _editorRef: React.RefObject<Editor>;

    constructor(props: IProps) {
        super(props);

        this.state = {
            editorState: initialValue,
            selectedCourse: [],
            courseOptions: []
        }
        this._editorRef = React.createRef();
    }

    public componentDidMount() {
        this.getCourse();
    }

    private getCourse = () => {
        const url = "https://ako-api.azurewebsites.net/api/Courses/" + this.props.match.params.id;

        fetch(url,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }).then((response: any) => {
           return response.json();
        }).then((response: any) => {
            console.log(response);
            this.setState({
                selectedCourse: response,
                editorState: Value.fromJSON(JSON.parse(response.content))
            })
        });
    }
    
    private onCourseChange = (selectedOption: any) => {

        this.setState({
            selectedCourse: selectedOption,
        });
    }

    render() {
        return (
            <React.Fragment>
                <Card style = {cardStyling}>
                    <h4>{this.state.selectedCourse.title}</h4>
                    <h6>Creator: {this.state.selectedCourse.creatorName == null ? "anonymous" : this.state.selectedCourse.creatorName } </h6>

                    <h6>Prerequisite Courses:  </h6>
                    <ul>
                        {
                            this.state.selectedCourse.prerequisiteCourses != null ?
                            this.state.selectedCourse.prerequisiteCourses.map((prereq: any, i: number) => {
                                return (
                                    <li key = {"prereq-" + i}>
                                        {prereq.courseName}
                                    </li>
                                )
                            }): " "
                        }
                    </ul>
                    <Editor 
                        placeholder="Start writing your course here..."
                        value = {this.state.editorState}
                        schema = {schema}
                        readOnly = {true}
                        onKeyDown = {this.onKeyDown}
                        renderBlock = {this.renderBlock}
                        renderMark = {this.renderMark}
                        ref = {this._editorRef}
                        style = {{minHeight: "400px"}}
                    />

                    
                </Card>

                <CommentsBox courseId = {this.state.selectedCourse.courseId} comments = {this.state.selectedCourse.comments}/>
            </React.Fragment>
        )
    }
    onClickMark = (event: any, type: string) => {
        event.preventDefault();
        if(this._editorRef.current != null) {
            this._editorRef.current.toggleMark(type);
        }
    }

    // Function returns the correct block type.
    renderBlock = (props:any, editor:any, next:any) => {

        switch (props.node.type) {
            case 'block-quote':
                return <blockquote {...props.attributes}>{props.children}</blockquote>;
            case 'bulleted-list':
                return <ul {...props.attributes}>{props.children}</ul>;
            case 'list-item':
                return <li {...props.attributes}>{props.children}</li>;
            case 'numbered-list':
                return <ol {...props.attributes}>{props.children}</ol>;
            case 'image': {
                const src = props.node.data.get('src');
                const isFocused = props.isFocused;
                return (
                    <img
                      {...props.attributes}
                      src={src}
                      style = {{
                        display: "block",
                        maxWidth: "100%",
                        maxHeight: "20em",
                        boxShadow: isFocused ? '0 0 0 2px blue' : 'none'
                      }}
                      
                    />
                  )
            }
            case 'video': {
                console.log(props);
                return <Video {...props} />
            }
            default:
                return next();
        }
    }

    // Function returns the correct mark type.
    renderMark = (props:any, editor:any, next:any) => {
        switch (props.mark.type) {
            case 'bold':
                return  <strong {...props.attributes}>{props.children}</strong>;
            case 'code':
                return <code>{props.children}</code>;
            case 'italic':
                return <em {...props.attributes}>{props.children}</em>
            case 'underlined':
                return <u {...props.attributes}>{props.children}</u>
            default:
                return next();
        }
    }

    // onDropOrPaste = (event: any, editor: any, next: any) => {
    //     const target = editor.findEventRange(event)
    //     if (!target && event.type === 'drop') return next()
    
    //     const transfer = getEventTransfer(event)
        
    //     const { type } = transfer;
        
    //     if (type === 'files') {
    //       for (const file of transfer.files) {
    //         const reader = new FileReader()
    //         const [mime] = file.type.split('/')
    //         if (mime !== 'image') continue
    
    //         reader.addEventListener('load', () => {
    //           editor.command(insertImage, reader.result, target)
    //         })
    
    //         reader.readAsDataURL(file)
    //       }
    //       return
    //     }
        
        
    //     if (type === 'text') {
    //         if (!isUrl(transfer.text)) return next()
    //         if (!imageExtensions.includes(getExtension(transfer.text))) return next()
    //         editor.command(insertImage, transfer.text, target)
    //         return
    //     }
    
    //     next()
      
    // }
    private onKeyDown = (event: any, editor: any, next: () => any) => {

        if(!event.ctrlKey) {
            return next();
        }

        switch(event.key) {
            case 'b' : {
                event.preventDefault();
                editor.toggleMark('bold')
                break;
            }

            case 'i' : {
                event.preventDefault();
                editor.toggleMark('italic');
                break;
            } 

            case 'u' : {
                event.preventDefault();
                editor.toggleMark('underlined');
                break;
            } 
            
            case '`' : {
                event.preventDefault();
                editor.toggleMark('code');
                break;
            }   

            default: {
                return next()
            }
        }

        return next();
    }

}


export default CourseViewer;