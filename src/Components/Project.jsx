import { useState } from "react";
import sound from "/audio/metalSound.mp3";
import JSConfetti from "js-confetti";
import { useOutletContext } from "react-router-dom";

function Project({ project }) {
  //const audio = new Audio("./audio.mp3");
  const { name, description, skillsRequired } = project;
  const { creators, skills } = useOutletContext();
  const [liked, setLiked] = useState(false);

  // skillsRequired.map((index)=>{return skills[index]})

  //loony wizard
  const jsConfetti = new JSConfetti();
  function fireConfetti() {
    jsConfetti.addConfetti({
      confettiRadius: 0,
      confettiColors: ["#000", "hotpink", "gold"],
      confettiNumber: 2,
      emojis: ["⚒️"],
      emojiSize: 100,
    });
  }
  let music = new Audio(sound)
  function likeClick(e) {
    setLiked(!liked);

     music.volume = 0.1
     music.play()
     fireConfetti();
   
  }
  let skillsList;
  if (skillsRequired) {
    skillsList = skillsRequired.map(skill => {
      return skills[skill];
    });
  }
  let creatorList;
  if (project.creators) {
    creatorList = project.creators.map(creator => {
      return creators.find(creatorObj => creatorObj.id === creator).name;
    });
  }
  return (
    <>
      <div className="projectCard">
        <h2>{name}</h2>
        <img className= "cardImg" src="https://imgs.search.brave.com/HK18d27GqHDPABVlQ3-7Xm0qRZ6Y2BU-_9tOZ5pWBr8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjgy/NzAzMTI2L3Bob3Rv/L3Rvb2xzLWluLXRo/ZS1mb3JnZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UFp3/aVA4aFBhcnI5ZnVx/c1V0djdmT2YxNkVE/eVgwT2x2eGNpSU9m/NC1qbz0" alt="" />

        <div id="cardTest">
          <h3>
            Contributors: {creatorList ? creatorList.join(", ") : "Loading..."}
          </h3>
          <p>Description: {description}</p>
          <h3>Skills needed: </h3>
          <h5> {skillsRequired ? skillsList.join(", ") : "Loading..."}</h5>
          <br></br>
        </div>
          <button
            onClick={e => {
              likeClick(e);
            }}
            className={liked ? "clicked" : ""}
            id="projectLikes"
          >
            ❤️
          </button>
      </div>
    </>
  );
}

export default Project;
