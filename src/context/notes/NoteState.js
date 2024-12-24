import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    const initialNotes = [
        {
          "_id": "6767056985d53cb7d138a2a5",
          "user": "6765b84ea56d3e2d2b89f5e5",
          "title": "My title",
          "description": "This is description",
          "tag": "personal",
          "date": "2024-12-21T18:14:01.728Z",
          "__v": 0
        },
        {
          "_id": "6767330fa7f473997280ff2b",
          "user": "6765b84ea56d3e2d2b89f5e5",
          "title": "My title",
          "description": "This is description",
          "tag": "personal",
          "date": "2024-12-21T21:28:47.942Z",
          "__v": 0
        },
        {
            "_id": "6767056985d53cb7d138a2a5",
            "user": "6765b84ea56d3e2d2b89f5e5",
            "title": "My title",
            "description": "This is description",
            "tag": "personal",
            "date": "2024-12-21T18:14:01.728Z",
            "__v": 0
          },
          {
            "_id": "6767330fa7f473997280ff2b",
            "user": "6765b84ea56d3e2d2b89f5e5",
            "title": "My title",
            "description": "This is description",
            "tag": "personal",
            "date": "2024-12-21T21:28:47.942Z",
            "__v": 0
          },
          {
            "_id": "6767056985d53cb7d138a2a5",
            "user": "6765b84ea56d3e2d2b89f5e5",
            "title": "My title",
            "description": "This is description",
            "tag": "personal",
            "date": "2024-12-21T18:14:01.728Z",
            "__v": 0
          },
          {
            "_id": "6767330fa7f473997280ff2b",
            "user": "6765b84ea56d3e2d2b89f5e5",
            "title": "My title",
            "description": "This is description",
            "tag": "personal",
            "date": "2024-12-21T21:28:47.942Z",
            "__v": 0
          }
      ]
      const [notes,setNotes] = useState(initialNotes)
    return(
        <noteContext.Provider value = {{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;