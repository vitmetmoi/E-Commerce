import React from 'react';
import './MarkdownEditor.scss';
import MDEditor from '@uiw/react-md-editor';
function MarkdownEditor(props) {
    return (
        <div
        // data-color-mode="dark"  
        >
            <MDEditor
                value={props.contentMarkdown}
                onChange={props.setContentMarkDown}
            />
        </div>
    );
}

export default MarkdownEditor;