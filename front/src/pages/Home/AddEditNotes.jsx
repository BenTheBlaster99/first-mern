import React, { useState } from "react";
import TagInput from "../../components/input/TagInput";
import { MdClose } from "react-icons/md";

function AddEditNotes({ noteData, onclose, type }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);
    
    // add note
    const addNewNote = async () => { }
    
    // edit note
    const editNote = async () => { }
    
    
  const handleAddNote = () => {
    if (!title) {
      setError("please enter the title");
      return;
    }
    if (!content) {
      setError("please enter the content");
      return;
    }
      setError("");
      if (type === "edit") {
          editNote()
      } else {
          addNewNote()
      }
  };
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onclose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label"> TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="do 100 pushups"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline bg-slate-50 p2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>
      </div>
      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-xs pt-5">{error}</p>}
      <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
        Add
      </button>
    </div>
  );
}

export default AddEditNotes;
