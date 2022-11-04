//import { Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
//import { useNavigate } from 'react-router-dom';
// import { useHistory } from "react-router-dom";
// import { green } from "@material-ui/core/colors";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Profile = (props) => {
  const [stats, updatedStats]=useState(0);
  //const history = useHistory();
  const setLoginUser = props.setLoginUser;
  const [user, setUser] = React.useState({
    name: props.user.name,
    email: props.user.email,
    age: props.user.age,
    image_link: "",
    profession: props.user.profession,
    phone: props.user.phone,
  });

  // console.log("Original data, before updation")
  // console.log(user);
  const update_State = () => {
    const x = document.getElementById("profession");
    const y = document.getElementById("age");
    const z = document.getElementById("phone");
    if (
      x.contentEditable === "true" ||
      y.contentEditable === "true" ||
      z.contentEditable === "true"
    ) {
      x.contentEditable = "false";
      y.contentEditable = "false";
      z.contentEditable = "false";
      x.style.color = "green";
      y.style.color = "green";
      z.style.color = "green";
      const new_profession = document.getElementById("profession").innerText;
      const new_age = document.getElementById("age").innerText;
      const new_phone = document.getElementById("phone").innerText;
      // console.log("New Value");
      // console.log(new_value);

      setUser((previousState) => {
        //const temp=previousState;
        //updated="true";

        return {
          ...previousState,
          profession: new_profession,
          age: new_age,
          phone: new_phone,
        };
      });
      //updatedStats(stats+1);
     
    }
  };
  useEffect(() => {
    
    axios.post("http://localhost:9000/user/update", user).then((res) => {
      const resp = res.data;
      console.log("response from data base", res);
      console.log(resp);
      alert(resp);
    });
    // }
  }, [user]);

  const editProfession = (event) => {
    const x = document.getElementById("profession");
    x.contentEditable = "true";
    x.style.color = "red";
  };
  const editAge = (event) => {
    const x = document.getElementById("age");
    x.contentEditable = "true";
    x.style.color = "red";
  };
  const editContact = (event) => {
    const x = document.getElementById("phone");
    x.contentEditable = "true";
    x.style.color = "red";
  };

  return (
    <div className="profile__container">
      <div className="greetings">
        <h4 className="greeting"> Welcome to your profile section </h4>
        <i
          className="fas fa-sign-out-alt"
          title="log out"
          onClick={() => setLoginUser({})}
        ></i>
      </div>
      <div className="name--section">
        <h2 className="name"> {user.name} </h2>
      </div>
      <div className="content--body">
        <div className="info">
          <div className="info__text">
            <label>
              <h3> Profession: </h3>
              <h4
                id="profession"
                value={user.profession}
                contentEditable="false"
              >
                {props.user.profession}
              </h4>
            </label>
            <span>
              <i
                className="pen fas fa-pen"
                title="edit profession"
                onClick={editProfession}
              ></i>
            </span>
            <button
              className="update_button"
              title="done"
              onClick={update_State}
            >
              Update
            </button>
          </div>
          <div className="info__text">
            <label>
              <h3> Age: </h3>
              <h4 id="age" value={props.user.age} contentEditable="false">
                {props.user.age}
              </h4>
            </label>
            <span>
              <i
                className="pen fas fa-pen"
                title="edit age"
                onClick={editAge}
              ></i>
            </span>
            <button
              className="update_button"
              title="done"
              onClick={update_State}
            >
              Update
            </button>
          </div>
          <div className="info__text">
            <h3> email : {user.email} </h3>
          </div>
          <div className="info__text">
            <label>
              <h3> Phone: </h3>
              <h4 id="phone" value={user.phone} contentEditable="false">
                {props.user.phone}
              </h4>
            </label>
            <span>
              <i
                className="pen fas fa-pen"
                title="edit phone number"
                onClick={editContact}
              ></i>
            </span>
            <button
              className="update_button"
              title="done"
              onClick={update_State}
            >
              Update
            </button>
          </div>
        </div>
        <div className="image--holder">
          <img
            id="image" alt="pro_image"
            src="https://scontent.fisb7-1.fna.fbcdn.net/v/t1.6435-9/125562147_1231824410532469_8485449967569769022_n.jpg?stp=dst-jpg_p206x206&_nc_cat=109&ccb=1-7&_nc_sid=da31f3&_nc_eui2=AeFNPe3iMzPzC7HW9j8atyPcgWMsR3nCxPmBYyxHecLE-dtUzDAB8Xmc_xHF9kG8zv5DuiPG7c8d90bC1zh_eOEO&_nc_ohc=SusmTcnMMb4AX-8ChE0&tn=cOMGllkW0jQlfkeA&_nc_ht=scontent.fisb7-1.fna&oh=00_AT9jvvZtgKS2To8DufItOOU7Ku5SdG_qUlZHp7uWwFZhiQ&oe=63484798"
            className="img"
          />
          <h6 id="imgLink" contentEditable="false">
            {" "}
            {user.image_link}
          </h6>
          <i className="pen fas fa-pen" title="done" onClick={update_State}></i>
          <span>
            <i className="pen fas fa-pen" title="edit age"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
