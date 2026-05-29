import { useState } from "react";
import "./App.css";

const internships = [
  {
    id: 1,
    title: "Digital Product Intern",
    place: "PT Bank Ina Perdana Tbk",
    period: "February 2026 - Present",
    image: "/internships/images/intern1-1.png",
    file: "/internships/internship-1.json",
    desc: "Supported digital product development through UAT execution, active user analysis, and strategy recommendations to improve feature adoption and user engagement.",
  },
  {
    id: 2,
    title: "Business Analyst Intern",
    place: "Digistar Class Intern, Telkom Indonesia",
    period: "August 2025 - January 2026",
    image: "/internships/images/intern2-1.png",
    file: "/internships/internship-2.json",
    desc: "Focused on digital product analysis, competitor research, and strategic insight development.",
  },
  {
    id: 3,
    title: "Business and Development Staff",
    place: "Kunci Hukum Indonesia (Remote)",
    period: "May 2025 - August 2025",
    image: "/internships/images/intern3-1.png",
    file: "/internships/internship-3.json",
    desc: "Contributed to business idea development, strategy support, and competitor analysis in a remote digital work environment.",
  },
];

const projects = [
  {
    id: 1,
    title: ["Non-Ordinary Transaction", "ERP EPICOR"],
    previewImage: "/projects/images/project1-1.png",
    file: "/projects/project-1.json",
  },
  {
    id: 2,
    title: ["Online Grocery Store", "Analysis and Design"],
    previewImage: "/projects/images/project2-1.png",
    file: "/projects/project-2.json",
  },
  {
    id: 3,
    title: ["LGMA Supermarket", "Supplier Management"],
    previewImage: "/projects/images/project3-1.png",
    file: "/projects/project-3.json",
  },
  {
    id: 4,
    title: "HR Workflow Diagram",
    previewImage: "/projects/images/project4-1.png",
    file: "/projects/project-4.json",
  },
];

const courses = [
  {
    id: 1,
    title: "Web Development",
    image: "/courses/images/course1/cover.png",
    desc: "Learned the fundamentals of website development, layout structure, and responsive interface implementation.",
  },
  {
    id: 2,
    title: "UI/UX Design",
    image: "/courses/images/course2/cover.png",
    desc: "Studied user interface design, user flow, wireframing, prototyping, and visual design principles.",
  },
  {
    id: 3,
    title: "Data Science",
    image: "/courses/images/course3/cover.png",
    desc: "Explored data analysis, data visualization, and basic analytical thinking to support decision making.",
  },
  {
    id: 4,
    title: "Digital Marketing",
    image: "/courses/images/course4/cover.png",
    desc: "Learned digital strategy, audience analysis, campaign planning, and online brand communication.",
  },
];

function MultiLineTitle({ title }) {
  if (Array.isArray(title)) {
    return (
      <>
        {title.map((line, index) => (
          <span className="titleLine" key={index}>
            {line}
          </span>
        ))}
      </>
    );
  }

  return title;
}

function getPlainTitle(title) {
  return Array.isArray(title) ? title.join(" - ") : title;
}

function ProjectImageCarousel({ images = [], index, onPrev, onNext }) {
  if (!images.length) return null;

  return (
    <div className="projectImageCarousel">
      <img src={images[index]} alt={`Project documentation ${index + 1}`} />

      {images.length > 1 && (
        <>
          <button
            className="projectCarouselBtn left"
            onClick={onPrev}
            type="button"
          >
            ‹
          </button>

          <button
            className="projectCarouselBtn right"
            onClick={onNext}
            type="button"
          >
            ›
          </button>
        </>
      )}

      <span className="projectImageCounter">
        {index + 1} / {images.length}
      </span>
    </div>
  );
}

function App() {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [projectImageIndex, setProjectImageIndex] = useState({
    top: 0,
    bottom: 0,
  });

  const handleViewInternship = async (file) => {
    try {
      setLoadingMessage("Loading internship detail...");
      setSelectedProject(null);

      const response = await fetch(file);

      if (!response.ok) {
        throw new Error("Failed to fetch internship detail");
      }

      const data = await response.json();
      setModalImageIndex(0);
      setSelectedInternship(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load internship detail. Please check the JSON file path.");
    } finally {
      setLoadingMessage("");
    }
  };

  const handleViewProject = async (file) => {
    try {
      setLoadingMessage("Loading project detail...");
      setSelectedInternship(null);

      const response = await fetch(file);

      if (!response.ok) {
        throw new Error("Failed to fetch project detail");
      }

      const data = await response.json();
      setProjectImageIndex({ top: 0, bottom: 0 });
      setSelectedProject(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load project detail. Please check the JSON file path.");
    } finally {
      setLoadingMessage("");
    }
  };

  const closeModal = () => {
    setSelectedInternship(null);
    setSelectedProject(null);
  };

  const nextModalImage = () => {
    if (!selectedInternship?.images?.length) return;

    setModalImageIndex((prev) =>
      prev === selectedInternship.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevModalImage = () => {
    if (!selectedInternship?.images?.length) return;

    setModalImageIndex((prev) =>
      prev === 0 ? selectedInternship.images.length - 1 : prev - 1
    );
  };

  const nextProjectImage = (type) => {
    if (!selectedProject) return;

    const images =
      type === "top" ? selectedProject.topImages : selectedProject.bottomImages;

    if (!images?.length) return;

    setProjectImageIndex((prev) => ({
      ...prev,
      [type]: prev[type] === images.length - 1 ? 0 : prev[type] + 1,
    }));
  };

  const prevProjectImage = (type) => {
    if (!selectedProject) return;

    const images =
      type === "top" ? selectedProject.topImages : selectedProject.bottomImages;

    if (!images?.length) return;

    setProjectImageIndex((prev) => ({
      ...prev,
      [type]: prev[type] === 0 ? images.length - 1 : prev[type] - 1,
    }));
  };

  return (
    <main className="page">
      <nav className="navbar">
        <h2>Sheilla's Portfolio</h2>

        <div className="navLinks">
          <a href="#about">About</a>
          <a href="#internship">Internship</a>
          <a href="#project">Project</a>
          <a href="#course">Course</a>
        </div>
      </nav>

      <header className="hero">
        <div className="heroText">
          <p className="badge">Hello, welcome to my portfolio</p>
          <h1>Joanessa Ansheilla Sarwoto</h1>
          <h3>Final-year Information Systems Student at President University</h3>
          <p>
            This portfolio showcases my internship experience, project
            activities, and learning journey in digital development.
          </p>

          <a href="#about" className="btn">
            Explore Portfolio
          </a>
        </div>

        <div className="photoCard">
          <img src="/profile.png" alt="Profile" />
        </div>
      </header>

      <section id="about" className="section">
        <p className="sectionLabel">About Me</p>
        <p>
          Enthusiastic about business analysis, business development, and system administration. 
          Skilled in analysis, workflow design, web development, interactive media, and ERP Epicor, 
          with a strong foundation in system analysis and development.
        </p>
      </section>

      <section id="internship" className="section">
        <p className="sectionLabel">Experience</p>
        <h2>Internship Experiences</h2>

        <div className="internGrid">
          {internships.map((item, index) => (
            <div className="internCard" key={item.id}>
              <div className="internImageWrap">
                <img src={item.image} alt={item.title} className="internImg" />
                <span className="internNumber">0{index + 1}</span>
              </div>

              <div className="internContent">
                <h3>{item.title}</h3>
                <h4>{item.place}</h4>
                <p className="internPeriod">{item.period}</p>
                <p className="internDesc">{item.desc}</p>
              </div>

              <button
                className="viewMoreBtn"
                onClick={() => handleViewInternship(item.file)}
              >
                View More
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="project" className="section projectSection">
        <p className="sectionLabel">Works</p>
        <h2>Projects</h2>
        <p className="projectSubtitle">
          From January 2024 to July 2025, I was involved in multiple projects
          that enhanced my skills in system analysis, development, and
          cross-functional collaboration.
        </p>

        <div className="projectGrid">
          {projects.map((project) => (
            <div className="projectCard" key={project.id}>
              <div className="projectImageWrap">
                <img
                  src={project.previewImage}
                  alt={getPlainTitle(project.title)}
                />
              </div>

              <h3>
                <MultiLineTitle title={project.title} />
              </h3>

              <button
                className="projectBtn"
                onClick={() => handleViewProject(project.file)}
              >
                View Project
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="course" className="section">
        <p className="sectionLabel">Learning</p>
        <h2>Course Activities</h2>

        <div className="courseGrid">
          {courses.map((course, index) => (
            <div className="courseCard" key={course.id}>
              <div className="courseImageWrap">
                <img src={course.image} alt={course.title} />
                <span className="courseNumber">0{index + 1}</span>
              </div>

              <h3>{course.title}</h3>
              <p>{course.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <h2>Thank You</h2>
        <p>
          Thank you for visiting my portfolio.
        </p>
        <p>
          I am open to collaboration, internship opportunities, and digital projects.
        </p>
        <p className="copyright">
          © 2026 Joanessa Ansheilla Sarwoto. All rights reserved.
        </p>
      </footer>

      {loadingMessage && (
        <div className="modalOverlay">
          <div className="loadingBox">{loadingMessage}</div>
        </div>
      )}

      {selectedInternship && (
        <div className="modalOverlay">
          <div className="modalBox">
            <button className="closeBtn" onClick={closeModal}>
              ×
            </button>

            <div className="modalHeader">
              <div>
                <p className="sectionLabel">Internship Detail</p>
                <h2>{selectedInternship.title}</h2>
                <h4>{selectedInternship.place}</h4>
                <p className="modalPeriod">{selectedInternship.period}</p>
              </div>
            </div>

            <p className="modalIntro">{selectedInternship.intro}</p>

            <h3>My Jobdesk</h3>
            <ul className="modalList">
              {selectedInternship.jobdesk.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3>Documentation</h3>

            <div className="documentationCarousel">
              <div className="documentationImageWrap">
                <img
                  src={selectedInternship.images[modalImageIndex]}
                  alt={`Documentation ${modalImageIndex + 1}`}
                  className="documentationMainImage"
                />

                {selectedInternship.images.length > 1 && (
                  <>
                    <button
                      className="documentationBtn left"
                      onClick={prevModalImage}
                      type="button"
                    >
                      ‹
                    </button>

                    <button
                      className="documentationBtn right"
                      onClick={nextModalImage}
                      type="button"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              <p className="documentationCounter">
                {modalImageIndex + 1} / {selectedInternship.images.length}
              </p>

              <div className="documentationThumbs">
                {selectedInternship.images.map((img, index) => (
                  <button
                    key={index}
                    className={
                      modalImageIndex === index
                        ? "documentationThumb active"
                        : "documentationThumb"
                    }
                    onClick={() => setModalImageIndex(index)}
                    type="button"
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedProject && (
        <div className="modalOverlay">
          <div className="projectModalBox">
            <button className="closeBtn" onClick={closeModal}>
              ×
            </button>

            <div className="projectDetailHero">
              <p className="projectDetailLabel">Project Detail</p>
              <h2>
                <MultiLineTitle title={selectedProject.title} />
              </h2>
              <p>Tools: {selectedProject.tools}</p>
            </div>

            <div className="projectDetailContent">
              <div className="projectDetailText">
                <h3>Background</h3>
                <p>{selectedProject.background}</p>
              </div>

              <ProjectImageCarousel
                images={selectedProject.topImages}
                index={projectImageIndex.top}
                onPrev={() => prevProjectImage("top")}
                onNext={() => nextProjectImage("top")}
              />

              <ProjectImageCarousel
                images={selectedProject.bottomImages}
                index={projectImageIndex.bottom}
                onPrev={() => prevProjectImage("bottom")}
                onNext={() => nextProjectImage("bottom")}
              />

              <div className="projectDetailText">
                <h3>My Contributions</h3>
                <ul>
                  {selectedProject.contributions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="deliverables">
              <h3>Deliverables</h3>

              <div className="deliverableBtns">
                {selectedProject.deliverables.map((item, index) => (
                  <button key={index}>{item}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;