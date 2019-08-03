import React from "react";
import { RenderBlockProps } from "slate-react";


class Video extends React.Component<RenderBlockProps, {}> {
    
    render() {
        return (
        <div {...this.props.attributes}>
            {this.renderVideo()}
        </div>
        )
    }
    renderVideo = () => {

        const { node, isFocused } = this.props
        const video = node.data.get('src');
        
        const wrapperStyle = {
          position: 'relative',
          outline: isFocused ? '2px solid blue' : 'none',
        } as React.CSSProperties;
    
        const maskStyle = {
          display: isFocused ? 'none' : 'block',
          position: 'absolute',
          top: '0',
          left: '0',
          height: '100%',
          width: '100%',
          cursor: 'cell',
          zIndex: 1,
        } as React.CSSProperties;
    
        const iframeStyle = {
          display: 'block',
        }
    
        return (
          <div style={wrapperStyle}>
            <div style={maskStyle} />
            <iframe
              id="ytplayer"
              width="640"
              height="476"
              src={video}
              frameBorder="0"
              style={iframeStyle}
            />
          </div>
        )
      }

}

export default Video;