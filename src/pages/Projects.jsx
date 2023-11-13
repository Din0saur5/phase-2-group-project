import { useState } from "react";
import Project from "../Components/Project";
import { useOutletContext } from "react-router-dom";
import Search from "../Components/Search";
import ProjectFilter from "../Components/ProjectFilter";
import NewProjectForm from "../Components/NewProjectForm";


function Projects() {
  // states
  const [input, setInput] = useState("");
  const [selection, setSelection] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [right,setRight] = useState(0)
  const[left,setLeft]=useState(0)
  const[move,setMove]=useState("")
  const [isRightClicked, setRightClicked] = useState(false);

  let xPos = 100
  
  const handleRightClick = () => {
     xPos += 100;
    setRightClicked(true);
    console.log(xPos)

  };
  const divStyle = {
    transform: isRightClicked ? `translate(${xPos}px, 0px)` : 'none',
  };

  
  
  // control the right and left click states
// let rightOne = right
//   function clickRight(e){
//     if(right<projects.length){
//       rightOne++
//       setRight(rightOne)
//     }
//     if(right<projects.length && right>0){
//       setMove("rightClicked")
      
//     }
    
//     console.log(right)
//     console.log(`move:${move}`)
//   }
  
  
//   function clickLeft(e){
//     if(right>0){
//       rightOne--
//       setRight(rightOne)
//     }
//     console.log(right)
//   }
// translating the class to move the inner div


  

  // fetch the data here
  const { user, projects, skills } = useOutletContext();
  console.log(projects);
  if (!projects.length) {
    return <img src="../src/assets/img/stefan-bonk.gif" />;
  }

  // text filter handler
  function inputHandler(e) {
    setInput(e.target.value);
  }

  let filteredProject = projects;
  if (input.length !== 0) {
    filteredProject = projects.filter(project => {
      return project.name.toLowerCase().includes(input.toLowerCase());
    });
  }

  // select menu filter
  function selectHandler() {}
  let filteredSelect = filteredProject;

  // mapping projects to the project list
  const project = filteredProject.map(project => {
    return (
      <Project
        id="projectsDiv"
        key={project.id}
        project={project}
        skills={skills}
      />
    );
  });

  return (
    <>
      <div>
        <h1>List of projects</h1>
        {!showForm && user ? (
          <button id="rightButton" onClick={() => setShowForm(true)}>Add your own</button>
        ) : (
          ""
        )}
        {showForm ? <NewProjectForm setShowForm={setShowForm} /> : ""}
        <Search inputHandler={inputHandler} input={input} />
        <ProjectFilter />
        <br/>
        <button onClick={e => {clickLeft(e);}}>left</button>
        <div id="scrollerDiv">
          <div id="projectContainer" className={isRightClicked ? 'rightClicked' : ''} style={divStyle} onContextMenu={handleRightClick}>
            {project}
          </div>
        </div>
        <br/>
      <button onClick={e => {handleRightClick(e)}}>right</button>
      <br/>
      </div>
      
    </>
  );
}

export default Projects;
