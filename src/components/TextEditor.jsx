import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor, NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, all } from 'lowlight';
import 'highlight.js/styles/atom-one-dark.css'
import './editor.css';
import { useContext } from 'react';
import { IdContext } from '../context/IdContext.jsx';
import { useNavigate } from 'react-router';

const lowlight = createLowlight(all);

const CustomCodeBlock = (props) => {
  const code = props.node.textContent;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };
  return (
    <NodeViewWrapper as="div" className="relative bg-neutral-900 text-white rounded overflow-auto my-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-sm bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
      >
        {copied ? 'Copied✔' : 'Copy 📝'}
      </button>
      <pre className="p-4 text-sm font-mono whitespace-pre">
        <code>
          <NodeViewContent as="code" />
        </code>
      </pre>
    </NodeViewWrapper>
  );
};

const TextEditor = () => {
  const { id } = useContext(IdContext);
  if(id){
    localStorage.setItem('currentpage',JSON.stringify(id))
  }
  const storagekey = JSON.parse(localStorage.getItem('currentpage'))

  const [localData, setLocalData] = useState({ id: storagekey, title: '', content: '' });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CustomCodeBlock);
        },
      }).configure({ lowlight }),
    ],
    content: '',
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          editor.commands.insertContent('\t');
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const updated = {
        ...localData,
        content: editor.getJSON(),
      };
      setLocalData(updated);
      localStorage.setItem(storagekey, JSON.stringify(updated));
    },
  });
  useEffect(() => {
    const saved = localStorage.getItem(storagekey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setLocalData(parsed);
      if (parsed.content) {
        editor?.commands.setContent(parsed.content);
      }
    }
  }, [editor]);

  const handleTitleChange = (e) => {
    const updated = {
      ...localData,
      title: e.target.value,
    };
    setLocalData(updated);
    localStorage.setItem(storagekey, JSON.stringify(updated));
  };

  const toggle = (type) => {
    editor.chain().focus()[`toggle${type}`]().run();
  };

  const getButtonClass = (isActive) =>
    `btn ${isActive ? 'bg-gray-300 text-black px-4 py-2 rounded-lg font-bold' : 'bg-white hover:bg-gray-300 px-4 text-black py-2 rounded-lg'}`;

  if (!editor) return null;

  const navigate = useNavigate()

  const handleViewall = () => {
    if (localData.title.length === 0 && localData.content.length === 0) {
      let notes = JSON.parse(localStorage.getItem('notes'))
      notes = notes.filter(item => item !== localData.id)
      localStorage.setItem('notes', JSON.stringify(notes))
    }
    navigate('/notes')
  }

  return (
    <>
      <div className='max-w-5xl mx-auto flex justify-between my-5'>
        <h1 className='text-3xl font-bold my-2'>🔒 CodeSafe</h1>
        <button onClick={handleViewall} className='bg-white text-black rounded-xl px-5 py-3 text-xl font-semibold'>View all notes 📝</button>
      </div>
      <div className="py-2 max-w-5xl mx-auto">
        <div className="flex gap-2 mb-4">
          <div className='w-full'>
            <input
              spellCheck={false}
              required={true}
              value={localData.title}
              onChange={handleTitleChange}
              placeholder="Add title..✏"
              className='max-w-3xl bg-transparent rounded-md text-2xl font-extrabold px-3 py-2 border border-gray-700 focus:outline-0'
            />
          </div>
          <button onClick={() => toggle('Bold')} className={getButtonClass(editor.isActive('bold'))}>Bold</button>
          <button onClick={() => toggle('Italic')} className={getButtonClass(editor.isActive('italic'))}>Italic</button>
          <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={getButtonClass(editor.isActive('codeBlock'))}>Code</button>
        </div>
        <EditorContent editor={editor} spellCheck={false} className="border border-gray-700 rounded-md p-5 text-lg" />
        <p className='text-xs font-light'>*changes are auto saved</p>
      </div>
    </>
  );
};

export default TextEditor;
