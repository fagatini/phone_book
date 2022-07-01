import React from "react";
import { useContext, useState, useRef } from "react";
// import { FirstStepContext } from "./context/firstStepContext";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { ThirdStepContext } from "../../context/thirdStepContext";
import Textarea from "../Textarea/Textarea";
import ThirdStepRstyle from './ThirdStepRstyle.css'
import profile from '../../pictures/profile.png';
import { click } from "@testing-library/user-event/dist/click";

function ThirdStepReg({ handleClick }) {
  const [department, setDepartment] = useState("");
  const [post, setPost] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [subData, setSubData] = useState({ department: '', post: '', workPlace: '', aboutMe: '', photoURL: '' });

  const filePath = useRef(null)
  const imgPath = useRef(null)

  function save() {
    // если сделать условный рендеринт этой картинки, то img не будет существовать
    let f = filePath.current.files[0];
    if (f) {
      setPhotoURL(URL.createObjectURL(f))
      imgPath.current.src = URL.createObjectURL(f);
    }
  }

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
            <div className="AppWrapperHor">
              <img className='PicStyle ColorStyle' src={profile} ref={imgPath} alt=''></img>
              <div className="horizontCenter">
                <Button onClick={() => filePath.current.click()}>choose file</Button>
                <Input
                  ref={filePath}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={() => save()}
                ></Input>
              </div>
            </div>
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

