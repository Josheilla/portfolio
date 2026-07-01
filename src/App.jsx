import { useState, useEffect } from "react";
import "./App.css";

const awards = [
  {
    id: 1,
    title: "CHEC Awards 2024 Scholarship",
    subtitle: "2nd Winner",
    period: "18 June 2026",
    images: [
      "/awards/CHEC/foto chec 2024.jpeg",
      "/awards/CHEC/foto ber3 chec.jpeg",
      "/awards/CHEC/foto anak is chec.jpeg",
    ],
    desc: "Awarded as the 2nd Winner of the CHEC Awards 2024 Scholarship, presented through the collaboration between China Harbour Engineering Company (CHEC) and President University in recognition of academic excellence and outstanding achievement.",
  },
];

const internships = [
  {
    id: 1,
    title: "Digital Product Intern",
    place: "PT Bank Ina Perdana Tbk",
    period: "February 2026 - June 2026",
    image: "/internships/images/DPI/intern1-1.png",
    file: "/internships/internship-1.json",
    desc: "Supporting digital product development through UAT execution, active user analysis, and strategy recommendations to improve feature adoption and user engagement.",
  },
  {
    id: 2,
    title: "Business Analyst Intern",
    place: "Digistar Class Intern, Telkom Indonesia",
    period: "August 2025 - January 2026",
    image: "/internships/images/BAI/intern2-1.png",
    file: "/internships/internship-2.json",
    desc: "Focused on digital product analysis, competitor research, and strategic insight development.",
  },
  {
    id: 3,
    title: "Business and Development Staff",
    place: "Kunci Hukum Indonesia (Remote)",
    period: "May 2025 - August 2025",
    image: "/internships/images/BDS/intern3-1.png",
    file: "/internships/internship-3.json",
    desc: "Contributed to business idea development, strategy support, and competitor analysis in a remote digital work environment.",
  },
];

const projects = [
  {
    id: 1,
    title: ["Non-Ordinary Transaction", "ERP EPICOR"],
    previewImage: "/projects/images/ERP/1.png",
    file: "/projects/project-1.json",
    period: "May 2025 - July 2025",
    desc:
      "Simulated customer-specific sales transactions using ERP Epicor to analyze non-standard business scenarios.",
  },
  {
    id: 2,
    title: ["Online Grocery Store", "Analysis and Design"],
    previewImage: "/projects/images/OGS/class diagram.png",
    file: "/projects/project-2.json",
    period: "November 2024 - December 2024",
    desc:
      "Designed an online grocery shopping system through system analysis, UML diagrams, and software architecture.",
  },
  {
    id: 3,
    title: ["FromHeart Application", "Admin Management System"],
    previewImage: "/projects/images/FHA/start.png",
    file: "/projects/project-3.json",
    period: "November 2024 - December 2024",
    desc:
      "Developed an admin management system for online tea ordering with product management features.",
  },
  {
    id: 4,
    title: ["LMGA Supermarket", "Supplier Management"],
    previewImage: "/projects/images/LMGA/list of supplier.png",
    file: "/projects/project-4.json",
    period: "April 2024 - May 2024",
    desc:
      "Built a supplier management system to streamline supplier tracking and procurement communication.",
  },
];

const organizations = [
  {
    id: 1,
    title: "HoD Secretary",
    place: "PUMA Information Systems 2025",
    period: "October 2024 - October 2025",
    image: "/organizations/images/HOD/grand inauguration 2025.jpg",
    file: "/organizations/organization-1.json",
    desc: "Led the Secretary Division of PUMA IS 2025, supporting administration and organizational coordination.",
  },
  {
    id: 2,
    title: "Event Organizer Member",
    place: "Golden Code: Hackathon 2025 PUMA Information Systems",
    period: "14-16 May 2025",
    image: "/organizations/images/GC/dokum hackathon.JPG",
    file: "/organizations/organization-2.json",
    desc: "Contributed to Golden Code: Hackathon 2025 through event planning, coordination, and presentation support.",
  },
  {
    id: 3,
    title: "Food & Beverage x Fund Raising Member",
    place: "Company Visit to BCA PUMA IS x PUMA IT",
    period: "25 April 2024",
    image: "/organizations/images/BCA/compvis.jpg",
    file: "/organizations/organization-3.json",
    desc: "Contributed to the BCA Company Visit through food & beverage management and fundraising support.",
  },
  {
    id: 4,
    title: "Secretary",
    place: "PUMA Information Systems 2024",
    period: "November 2023 - October 2024",
    image: "/organizations/images/SEC/dokum TA.jpg",
    file: "/organizations/organization-4.json",
    desc: "Handled secretarial and administrative tasks for PUMA IS 2024 and multiple student events.",
  },
];

const courses = [
  {
    id: 1,
    title: "Introduction to Project Management",
    company: "MySkill",
    period: "October 2025",
    images: [
      "/courses/PM/38.png",
      "/courses/PM/39.png",
      "/courses/PM/40.png"
    ],
    desc: "Learned <strong>project management fundamentals</strong>, including <strong>project flow, planning, and key influencing factors</strong>, while developing a <strong>project brief case study</strong> to simulate real-world project planning.",
  },
  {
    id: 2,
    title: "Proficient Business Assessment for Product Manager",
    company: "Pijar Mahir",
    period: "September 2025",
     images: [
      "/courses/BA/35.png",
      "/courses/BA/36.png",
      "/courses/BA/37.png"
    ],
    desc: "Learned <strong>business potential analysis</strong> and <strong>product feasibility assessment</strong> through practical case studies, including <strong>market sizing</strong>, <strong>problem-solution-market fit</strong>, competitor analysis, and <strong>financial projection</strong> development to support business strategy.",
  },
  {
    id: 3,
    title: "Introduction to Business Development",
    company: "MySkill",
    period: "June 2025",
     images: [
      "/courses/BD/32.png",
      "/courses/BD/33.png",
      "/courses/BD/34.png"
    ],
    desc: "Learned <strong>business development fundamentals</strong> and <strong>strategic planning</strong>, including branding strategy, <strong>market research</strong>, opportunity identification, and target market analysis through practical mini tasks.",
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
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [projectImageIndex, setProjectImageIndex] = useState({
    top: 0,
    bottom: 0,
  });
  const [courseImageIndexes, setCourseImageIndexes] = useState({});

  const [awardImageIndexes, setAwardImageIndexes] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setAwardImageIndexes((prev) => {
        const updated = {};

        awards.forEach((award) => {
          const total = award.images?.length || 0;

          updated[award.id] =
            total > 0
              ? ((prev[award.id] || 0) + 1) % total
              : 0;
        });

        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!selectedInternship?.images?.length) return;

    const interval = setInterval(() => {
      setModalImageIndex((prev) =>
        prev === selectedInternship.images.length - 1
          ? 0
          : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedInternship]);

  useEffect(() => {
    if (!selectedProject) return;

    const interval = setInterval(() => {
      setProjectImageIndex((prev) => ({
        top:
          selectedProject.topImages?.length > 0
            ? prev.top === selectedProject.topImages.length - 1
              ? 0
              : prev.top + 1
            : 0,

        bottom:
          selectedProject.bottomImages?.length > 0
            ? prev.bottom === selectedProject.bottomImages.length - 1
              ? 0
              : prev.bottom + 1
            : 0,
      }));
    }, 2500); // 2,5 detik

    return () => clearInterval(interval);
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedOrganization?.images?.length) return;

    const interval = setInterval(() => {
      setModalImageIndex((prev) =>
        prev === selectedOrganization.images.length - 1
          ? 0
          : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [selectedOrganization]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCourseImageIndexes((prev) => {
        const updated = {};

        courses.forEach((course) => {
          const total = course.images?.length || 0;

          updated[course.id] =
            total > 0
              ? ((prev[course.id] || 0) + 1) % total
              : 0;
        });

        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

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

  const handleViewOrganization = async (file) => {
    try {
      setLoadingMessage("Loading organization detail...");
      setSelectedInternship(null);
      setSelectedProject(null);

      const response = await fetch(file);

      if (!response.ok) {
        throw new Error("Failed to fetch organization detail");
      }

      const data = await response.json();
      setModalImageIndex(0);
      setSelectedOrganization(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load organization detail.");
    } finally {
      setLoadingMessage("");
    }
  };

  const closeModal = () => {
    setSelectedInternship(null);
    setSelectedOrganization(null);
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
          <a href="#award">Award</a>
          <a href="#internship">Internship</a>
          <a href="#project">Project</a>
          <a href="#organization">Organization</a>
          <a href="#course">Course</a>

          <a
            href="https://www.linkedin.com/in/joanessa-ansheilla-sarwoto"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
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
        <p className="sectionLabel">Introduction</p>
        <h2>About Me</h2>
        <p>
          Enthusiastic about business analysis, business development, and system administration. 
        </p>
        <p> 
          Skilled in analysis, workflow design, web development, interactive media, and ERP Epicor, 
          with a strong foundation in system analysis and development.
        </p>
      </section>

      <section id="award" className="section awardSection">
        <p className="sectionLabel">Recognition</p>
        <h2>Award</h2>

        <div className="awardContainer">
          <div className="awardContent">
            <h3>{awards[0].title}</h3>
            <h4>{awards[0].subtitle}</h4>

            <p className="awardPeriod">{awards[0].period}</p>

            <p className="awardDesc">
              {awards[0].desc}
            </p>
          </div>

          <div className="awardCarousel">
            <img
              src={awards[0].images[awardImageIndexes[1] || 0]}
              alt={awards[0].title}
            />

            <span className="awardCounter">
              {(awardImageIndexes[1] || 0) + 1} / {awards[0].images.length}
            </span>
          </div>
        </div>
      </section>

      <section id="internship" className="section">
        <p className="sectionLabel">Experience</p>
        <h2>Internship Experiences</h2>
        <p className="projectSubtitle">
          From May 2025 to the present, I have participated in several internship experiences that 
          strengthened my skills in business analysis, digital product development, strategic thinking, 
          and cross-functional collaboration.
        </p>

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
          From April 2024 to July 2025, I was involved in multiple projects
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

                <span className="projectNumber">
                  0{project.id}
                </span>
              </div>

              <h3>
                <MultiLineTitle title={project.title} />
              </h3>

              <p className="projectPeriodCard">
                {project.period}
              </p>

              <p className="projectDesc">
                {project.desc}
              </p>

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

      <section id="organization" className="section">
        <p className="sectionLabel">Leadership</p>
        <h2>Organizational Experiences</h2>

        <p className="projectSubtitle">
          Through organizational experiences, I strengthened my leadership,
          teamwork, communication, and coordination skills.
        </p>

        <div className="organizationGrid">
          {organizations.map((item, index) => (
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
                onClick={() => handleViewOrganization(item.file)}
              >
                View More
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="course" className="section">
        <p className="sectionLabel">Learning</p>
        <h2>Course Activities</h2>

        <p className="projectSubtitle">
          Completed several courses to strengthen my knowledge in project management, business assessment, and business development through practical case studies and hands-on learning.
        </p>

        <div className="courseGrid">
          {courses.map((course, index) => (
            <div className="courseCard" key={course.id}>
              <div className="courseImageWrap">
                <img
                  src={
                    course.images?.[
                      courseImageIndexes[course.id] || 0
                    ]
                  }
                  alt={course.title}
                />
                <span className="courseNumber">0{index + 1}</span>
              </div>

              <h3>{course.title}</h3>

              <h4 className="courseCompany">
                {course.company}
              </h4>

              <p className="coursePeriod">
                {course.period}
              </p>

              <p
                dangerouslySetInnerHTML={{
                  __html: course.desc,
                }}
              />
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

            <h3>Key Responsibilities</h3>
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

              {selectedProject.period && (
                <p className="projectPeriod">
                  {selectedProject.period}
                </p>
              )}
            </div>

            <div className="projectDetailContent">
              {/* Row 1 */}
              <div className="projectDetailText">
                <h3>Project Overview</h3>

                {Array.isArray(selectedProject.background) ? (
                  selectedProject.background.map((item, index) => (
                    <p
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: item,
                      }}
                    />
                  ))
                ) : (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: selectedProject.background,
                    }}
                  />
                )}
              </div>

              <ProjectImageCarousel
                images={selectedProject.topImages}
                index={projectImageIndex.top}
                onPrev={() => prevProjectImage("top")}
                onNext={() => nextProjectImage("top")}
              />

              {/* Row 2 (full width banner) */}
              {selectedProject.teamNote && (
                <div className="projectTeamBanner">
                  {selectedProject.teamNote}
                </div>
              )}

              {/* Row 3 */}
              <ProjectImageCarousel
                images={selectedProject.bottomImages}
                index={projectImageIndex.bottom}
                onPrev={() => prevProjectImage("bottom")}
                onNext={() => nextProjectImage("bottom")}
              />

              <div className="projectDetailText">
                <h3>Key Responsibilities</h3>
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
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="deliverableBtn"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedOrganization && (
        <div className="modalOverlay">
          <div className="modalBox">
            <button className="closeBtn" onClick={closeModal}>
              ×
            </button>

            <div className="modalHeader">
              <div>
                <p className="sectionLabel">
                  Organization Detail
                </p>

                <h2>{selectedOrganization.title}</h2>
                <h4>{selectedOrganization.place}</h4>

                <p className="modalPeriod">
                  {selectedOrganization.period}
                </p>
              </div>
            </div>

            <p
              className="modalIntro"
              dangerouslySetInnerHTML={{
                __html: selectedOrganization.intro,
              }}
            />

            <h3>Key Responsibilities</h3>

            <ul className="modalList">
              {selectedOrganization.jobdesk.map(
                (item, index) => (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: item,
                    }}
                  />
                )
              )}
            </ul>

            <h3>Documentation</h3>

            <div className="documentationCarousel">
              <div className="documentationImageWrap">
                <img
                  src={
                    selectedOrganization.images[
                      modalImageIndex
                    ]
                  }
                  alt="Documentation"
                  className="documentationMainImage"
                />

                {selectedOrganization.images.length >
                  1 && (
                  <>
                    <button
                      className="documentationBtn left"
                      onClick={prevModalImage}
                    >
                      ‹
                    </button>

                    <button
                      className="documentationBtn right"
                      onClick={nextModalImage}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              <p className="documentationCounter">
                {modalImageIndex + 1} /{" "}
                {selectedOrganization.images.length}
              </p>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default App;