import React from "react";
import { useContext, useState, useRef } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { ThirdStepContext } from "../../context/thirdStepContext";
import Textarea from "../Textarea/Textarea";
import ThirdStepRstyle from './ThirdStepRstyle.css'
import profile from '../../pictures/profile.png';
import { useEffect } from "react";

function ThirdStepReg({ handleClick }) {
  const context = useContext(ThirdStepContext)

  const [department, setDepartment] = useState(context.department || "");
  const [post, setPost] = useState(context.post || "");
  const [workPlace, setWorkPlace] = useState(context.workPlace || "");
  const [aboutMe, setAboutMe] = useState(context.aboutMe || "");
  const [photoURL, setPhotoURL] = useState(context.photoURL || profile);


  const filePath = useRef(null)
  const imgPath = useRef(null)

  function save() {
    let f = filePath.current.files[0];
    if (f) {
      setPhotoURL(URL.createObjectURL(f))
      imgPath.current.src = URL.createObjectURL(f);
    }
  }

  const confirmSubData = (func, arg) => {
    context.setFunction({ department, post, workPlace, aboutMe, photoURL })
    func(arg)
  }

  return (
    <>
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
            <img className='PicStyle ColorStyle' src={photoURL} ref={imgPath} alt=''></img>
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
            <Button onClick={() => confirmSubData(handleClick, 0)}>back</Button>
            <Button onClick={() => confirmSubData(handleClick, 2)}>create</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThirdStepReg;

