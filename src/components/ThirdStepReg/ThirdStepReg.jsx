import React from "react";
import { useContext, useState } from "react";
// import { FirstStepContext } from "./context/firstStepContext";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { ThirdStepContext } from "../../context/thirdStepContext";
import Textarea from "../Textarea/Textarea";

function ThirdStepReg({ handleClick }) {
  const [department, setDepartment] = useState("");
  const [post, setPost] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [subData, setSubData] = useState({ department: '', post: '', workPlace: '', aboutMe: '', photoURL: '', subData: {} });

  return (
    <>
      <ThirdStepContext.Provider value={{ ...subData, setF: setSubData }}>
        <div className="App">
          <div className="AppWrapperVert">
            <h1 style={{ textAlign: "center" }}>Registration: step 3</h1>
            <Input
              type="text"
              placeholder="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            ></Input>
            <Input
              type="text"
              placeholder="work place"
              value={workPlace}
              onChange={(e) => setWorkPlace(e.target.value)}
            ></Input>
            <Textarea
              placeholder="about me"
              rows='5'
              cols='33'
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}>
            </Textarea>
            <Input
              type="image"
              placeholder="photo URL"
              src={"https://www.regina.ac/cache/51150d6eee240ae0e542288754180e3e.jpeg"}
              // src={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            ></Input>
            <div className="AppWrapperHor">
              <Button onClick={() => handleClick(0)}>back</Button>
              <Button onClick={() => handleClick(1)}>create</Button>
            </div>
          </div>
        </div>
      </ThirdStepContext.Provider>
    </>
  );
}

export default ThirdStepReg;

