import React from "react";
import Select from "react-select";
import { Editor, OnChangeParam } from 'slate-react'
import { Value } from 'slate'
import ToolBar from "./toolbar";
import Button from '@material-ui/core/Button';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import Code from '@material-ui/icons/Code';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';


interface IState {
    editorState: Value;
}

interface IProps {

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
                                text: 'Start creating your course here...'
                            }
                        ]
                    }
                ]
            }
        ]
    }
  })

const editorStyle = {
    border: '1px solid gray',
    minHeight: '6em',
    width: "50%"
  }
class CourseCreator extends React.Component<IProps, IState> {
    private _editorRef: React.RefObject<Editor>;

    constructor(props: any) {
        super(props);

        this.state ={
            editorState: initialValue
        };
        
        this._editorRef = React.createRef();
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

    render() {
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]

          
        const editor = (
            <React.Fragment>
                
                <input style = {{display: "block", border: "none"}} type = "text" name = "title" defaultValue = "Enter title here"/>

                <h3>Add Prerequisite courses here</h3>

                <Select options={options} isMulti = {true} />
                <ToolBar>
                    {this.renderMarkButton('bold',  <FormatBold />)}
                    {this.renderMarkButton('italic', <FormatItalic />)}
                    {this.renderMarkButton('underlined', <FormatUnderlined />)}
                    {this.renderMarkButton('code', <Code />)}
                    {this.renderImageButton(<AddPhotoAlternate />)}
                </ToolBar>
                <Editor 
                    placeholder="Enter some rich text..."
                    value = {this.state.editorState}
                    onChange = {this.updateEditorState}
                    onKeyDown = {this.onKeyDown}
                    renderBlock = {this.renderBlock}
                    renderMark = {this.renderMark}
                    ref = {this._editorRef}
                />
            </React.Fragment>
        )
        return editor;
    }


    renderImageButton = (icon: any) => {
        return (
            <Button 
                style = {{minWidth: "0px", borderRadius: "50px"}}>
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

}

export default CourseCreator;