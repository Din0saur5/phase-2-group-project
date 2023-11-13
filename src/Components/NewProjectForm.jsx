import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function NewProjectForm({ setShowForm }) {
  //bring in context data
  const { user, creators, skills } = useOutletContext();

  const emptyForm = {
    name: "",
    description: "",
    skills: [],
    image: "",
    creators: [user ? user.id : null],
  };
  //form states
  const [skillSearch, setSkillSearch] = useState("");
  const [creatorSearch, setCreatorSearch] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  /* * * * * * * * * *
   * Event Handlers  *
   * * * * * * * * * */
  function onSubmit(e) {
    e.preventDefault();
    fetch("https://ccserver-obi1.onrender.com/projects", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    }).then(res => res.json());
    setFormData(emptyForm);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleNewCont(e) {
    e.preventDefault();
    if (creators.find(cont => cont.id === creatorSearch)) {
      if (!formData.creators.find(cont => cont === creatorSearch)) {
        setFormData({
          ...formData,
          creators: [...formData.creators, creatorSearch],
        });
        setCreatorSearch("");
      }
    } else {
      alert("Creator not found!");
    }
  }

  function handleNewSkill(e) {
    e.preventDefault();
    //get actual DOM element because state is slow af and onChange doesn't always work
    const skillSelect = document.getElementById("skillSelect");
    if (!formData.skills.includes(skillSelect.value)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillSelect.value],
      });
    }
  }

  function handleDelete(e) {
    const key = e.target.parentNode.className;
    const value = e.target.parentNode.id;
    console.log(key, value);
    setFormData({
      ...formData,
      [key]: formData[key].filter(str => str !== value),
    });
  }

  /* * * * * * * * * *
   * form feedback   *
   * * * * * * * * * */
  let displayCreators = "Please sign in...";
  if (formData.creators[0]) {
    const projCreators = creators.filter(cont =>
      formData.creators.includes(cont.id)
    );
    displayCreators = projCreators.map(creator => (
      <div key={creator.id} className="creators">
        <h5 id={creator.id}>
          <span className="delete" onClick={handleDelete}>
            X
          </span>
          &emsp;{creator.name}
        </h5>
      </div>
    ));
  }

  const filteredSkills = skills.filter(skill =>
    skill.includes(skillSearch.toLowerCase())
  );
  const skillOptions = filteredSkills.map((skill, index) => (
    <option key={skill} value={index}>
      {skill}
    </option>
  ));
  const displaySkills = formData.skills.map(skill => (
    <div key={skill} id={skill} className="skills">
      <span className="delete" onClick={handleDelete}>
        X
      </span>
      &emsp;{skill}
    </div>
  ));

  return (
    <>
      <div>
        <form onSubmit={onSubmit} id="newProjectForm">
          <label>Project Name</label>
          <input
            id="name"
            name="name"
            placeholder=" Project Name here..."
            onChange={handleChange}
            value={formData.name}
            required
          ></input>
          <br></br>
          <label>Contributers:</label>
          <input
            name="creatorSearch"
            placeholder="Enter a username..."
            onChange={e => setCreatorSearch(e.target.value)}
            value={creatorSearch}
          ></input>
          <button onClick={handleNewCont}>add</button>
          <br />
          <div className = "creatorContainer">{displayCreators}</div>
          <br />
          <label>Description</label>
          <textarea
            placeholder="Description of project..."
            name="description"
            onChange={handleChange}
            value={formData.description}
            style={{ width: "300px", height: "150px" }}
          />
          <br />
          <br />
          <label>Project image</label>
          <input
            name="image"
            placeholder="image Url..."
            type="url"
            onChange={handleChange}
            value={formData.image}
          ></input>
          {formData.image ? (
            <img
              src={formData.image}
              alt="project image"
              style={{ maxWidth: "500px", maxHeight: "500px" }}
            ></img>
          ) : (
            ""
          )}
          <br />
          <br />
          <label>Skills Required</label>
          <div className="threeColumn">
            <div>
              <input
                name="skillSearch"
                onChange={e => setSkillSearch(e.target.value)}
                value={skillSearch}
                placeholder="search skills..."
              />
              <br />
              <select name="skillSelect" id="skillSelect">
                {skillOptions}
              </select>
            </div>
            <div>
              <button onClick={handleNewSkill}>add</button>
            </div>
            <div>{displaySkills}</div>
          </div>
          <br></br>
          <button type="submit">submit</button>
          <br />
          <button onClick={() => setShowForm(false)}>cancel</button>
        </form>
      </div>
    </>
  );
}

export default NewProjectForm;
