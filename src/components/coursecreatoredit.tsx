import React from "react";
import Select from "react-select";
import { Editor, OnChangeParam, getEventTransfer } from 'slate-react'
import { Value, CommandFunc, Text } from 'slate'
import ToolBar from "./toolbar";
import Button from '@material-ui/core/Button';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import Code from '@material-ui/icons/Code';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import isUrl from 'is-url';
import imageExtensions from 'image-extensions';
import Video from "./embeddedvideo";
import Card from "react-bootstrap/Card";
import CloudUploadIcon   from "@material-ui/icons/CloudUpload";

interface IState {
    editorState: Value;
    
    subjectOptions: any[],
    courseOptions: any[],
    
    selectedSubject: any,
    selectedCourses: any[],
    selectedCourse: any
}
    
interface IProps {
    match: any
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


// this is the initial value of the editor
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

const editorStyle = {
    border: '1px solid gray',
    minHeight: '6em',
    width: "50%"
}


let insertImage: CommandFunc;

insertImage  = (editor: any, src: any, target: any) => {
    if (target) {
        editor.select(target)
    }

    

    editor.insertBlock({
        type: 'image',
        data: { src },
    })

    return editor;
}

let insertVideo  = (editor: any, msrc: any, target: any) => {
    if (target) {
        editor.select(target)
    }
    const getYouTubeID = require('get-youtube-id');
    const id = getYouTubeID(msrc);
    const src:string = "http://www.youtube.com/embed/" + id;

    editor.insertBlock({
        type: 'video',
        data: {src},
    })

    return editor;
}



function getExtension(url: string) {
    const newUrl: string | undefined = new URL(url).pathname.split('.').pop();

    return newUrl === undefined ? "dummy" : newUrl;
}

class CourseCreatorEdit extends React.Component<IProps, IState> {
    private _editorRef: React.RefObject<Editor>;

    constructor(props: any) {
        super(props);

        this.state ={
            editorState: initialValue,

            subjectOptions: [],
            courseOptions: [],

            selectedSubject: null,
            selectedCourses: [],
            selectedCourse: []
        };
        
        this._editorRef = React.createRef();
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

    private updateCourse = () => {
        const url = "https://ako-api.azurewebsites.net/api/Courses/" + this.props.match.params.id;

        const titleElement = document.getElementById("title") as HTMLInputElement;


        if(titleElement == null || titleElement.value == "") {
            alert("Please enter a title");
            return;
        }

        const _title = titleElement.value;
        const _subjectId = this.state.selectedSubject.value;
        const _difficulty = 5;
        const _prerequisiteCourseId = this.state.selectedCourses.map(e => e.value);
        const _content = this.state.editorState.toJSON();

        const _body:any = {
            title:  _title,
            subjectId:_subjectId,
            difficulty: _difficulty,
            prerequisiteCourseId: _prerequisiteCourseId,
            content: _content,
            creatorId: 1
        };

        const jsonBody = JSON.stringify(_body);

        fetch(url,{
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                "content-type": "application/json"
            },
            body: jsonBody
        }).then((response: Response) => {
            alert(response.statusText)
        });  
    }

    private getSubjects = () => {
        const url = "https://ako-api.azurewebsites.net/api/Subjects";

        fetch(url,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "content-type":  'application/json'
            }
        }).then((response: any) => {
           return response.json();
        }).then((response: any) => {
            // if(!response.ok) {
            //     console.log("hi")
            //     return;
            // } else {
                let subjects: any[] = [];

            response.forEach((element:any) => {
                  subjects.push({label: element.name, value: element.id})
                  element.children.forEach((nestedElement: any) => {
                      subjects.push({label: element.name + " / " + nestedElement.name, value: nestedElement.id})
                  });
            });

            this.setState({
                subjectOptions: subjects
            })
            // }
            
        });
    }

    private getCourses = () => {
        const url = "https://ako-api.azurewebsites.net/api/Courses/"

        fetch(url,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }).then((response: any) => {
           return response.json();
        }).then((response: any) => {
            console.log(response)
            let courses: any[] = [];

            response.forEach((element:any) => {
                courses.push({value: element.courseId, label: element.title})
            });

            this.setState({
                courseOptions: courses
            })
        });
    }

    public componentDidMount() {
        this.getSubjects();
        this.getCourses();
    }

    private updateEditorState = (newState: OnChangeParam) => {
        this.setState(
            {
                editorState: newState.value
            }
        )
    }

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

    onClickImage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const src = window.prompt('Enter the URL of the image:')
        if (!src) return

        if(this._editorRef.current !== null) {
            this._editorRef.current.command(insertImage, src)
        }
    }

    onClickVideo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const src = window.prompt('Enter the URL of the video:')
        if (!src) return
        console.log(src);
        if(this._editorRef.current != null) {
            this._editorRef.current.command(insertVideo, src)
        }
    }


    private onSubjectChange = (selectedOption: any) => {

        this.setState({
            selectedSubject: selectedOption
        });
    }

    private onCourseChange = (selectedOption: any, action: any) => {
        let updatedCourseList: any[] = this.state.selectedCourses;

        switch(action.action) {
            case "select-option" : {
                updatedCourseList.push(selectedOption.pop());
                break;
            }
            case "remove-value" : {
                updatedCourseList = updatedCourseList.filter((e: any) =>  e.value !== action.removedValue.value);
                break;
            }
            case "clear" : {
                updatedCourseList = [];
                break;
            }
        }

        this.setState({
            selectedCourses: updatedCourseList
        });
    }

    render() {

          
        const editor = (
            <React.Fragment>
                <Card style = {cardStyling}>
                    <input id = "title" 
                    defaultValue = {this.state.selectedCourse.title}
                    
                    style = {{display: "block", border: "none", fontSize: "40px", marginBottom: "20px"}} type = "text" name = "title" placeholder = "Enter title here..."/>

                    <h4 style = {{color: "#403e3e"}} >Add Course Subject here</h4>
                    <Select 
                        value = {this.state.selectedSubject} 
                        options={this.state.subjectOptions} 
                        onChange = {this.onSubjectChange}
                    />
                    <h6 style = {{color: "#403e3e", marginTop: "20px"}} >Add Prerequisite courses here</h6>
                    
                    <Select 
                        value = {this.state.selectedCourses} 
                        options={this.state.courseOptions}
                        isMulti = {true} 
                        onChange = {this.onCourseChange}
                    />
                    <ToolBar>
                        {this.renderMarkButton('bold',  <FormatBold />)}
                        {this.renderMarkButton('italic', <FormatItalic />)}
                        {this.renderMarkButton('underlined', <FormatUnderlined />)}
                        {this.renderMarkButton('code', <Code />)}
                        {this.renderImageButton(<AddPhotoAlternate />)}
                        {this.renderVideoButton(<VideoLibrary />)}
                    </ToolBar>
                    <Editor 
                        placeholder="Start writing your course here..."
                        value = {this.state.editorState}
                        schema = {schema}
                        onChange = {this.updateEditorState}
                        onKeyDown = {this.onKeyDown}
                        renderBlock = {this.renderBlock}
                        renderMark = {this.renderMark}
                        ref = {this._editorRef}
                        onDrop = {this.onDropOrPaste}
                        onPaste = {this.onDropOrPaste}
                        style = {{minHeight: "400px"}}
                    />
                    <Button onClick = {this.updateCourse}  variant="contained" color="secondary"> <CloudUploadIcon style = {{marginRight: "10px"}} /> Update course</Button> 
                </Card>
                
            </React.Fragment>
        )
        return editor;
    }

    renderVideoButton = (icon: any) => {
        return (
            <Button 
                style = {{minWidth: "0px", borderRadius: "50px"}}
                onMouseDown = {this.onClickVideo}>
                {icon}
            </Button>
        );
    }

    renderImageButton = (icon: any) => {
        return (
            <Button 
                style = {{minWidth: "0px", borderRadius: "50px"}}
                onMouseDown = {this.onClickImage}>
                {icon}
            </Button>
        );
    }

    renderMarkButton = (type: string, icon: any) => {
        return (
            <Button 
                style = {{minWidth: "0px", borderRadius: "50px"}}
                onMouseDown = {(event) => this.onClickMark(event, type)}>
                {icon}
            </Button>
        );
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

    onDropOrPaste = (event: any, editor: any, next: any) => {
        const target = editor.findEventRange(event)
        if (!target && event.type === 'drop') return next()
    
        const transfer = getEventTransfer(event)
        
        const { type } = transfer;
        /*
        if (type === 'files') {
          for (const file of transfer.files) {
            const reader = new FileReader()
            const [mime] = file.type.split('/')
            if (mime !== 'image') continue
    
            reader.addEventListener('load', () => {
              editor.command(insertImage, reader.result, target)
            })
    
            reader.readAsDataURL(file)
          }
          return
        }
        */
        
        // if (type === 'text') {
        //     if (!isUrl(transfer.text)) return next()
        //     if (!imageExtensions.includes(getExtension(transfer.text))) return next()
        //     editor.command(insertImage, transfer.text, target)
        //     return
        // }
    
        next()
      
    }
    

}

export default CourseCreatorEdit;