import React, { useState, useEffect, memo } from 'react'
import profile_picture from "./assets/profile_picture.jpg"
import github from "./assets/github.png"
import linkedln from "./assets/linkedin.png"
import twitter from "./assets/twitter.png"
import onboardingai from "./assets/onboardingai.png"
import astroid from "./assets/astroid.png"
import route_planning from "./assets/route_planning.png"
import UseSpreadsheet from 'use-spreadsheet'
import './App.css'

/*
General Structure:
---> Single Page Structure <------
It should all be in one page but broken down into several pages as you scroll down to view them. 
1. Name:
2. Picture
  Chronological Structure:
    I envision both the name and picture appearing in some sort of animation with a "See more" button that drags down
3. Brief Bio
    No more than 200 words, font-family Inter 
    Another link that leads to Projects or "See What I've built"
4. Navigation Links
    On the side of every animation transition to redirect
5. Projects
    Arranged in rows, clicking on a project opens a pop up or another layer on top displaying the Project, and a brief summary 
    as well as links to the repo
6. Social Links
    I'll probably include these in the name and picture category, right under Name
7. Skills Page
    I'll associate the skills page with Projects, as a way of showcasing these skills through them as opposed to using it as a
    throw-away without proof -> Better for anyone else reading anyways.
8. Display CV/Resume
    I want to add this alongside the name and picture slides
9. Other links to other portions of the site.
    Undecided, but definitely part of the navigation bar to other stuff. 

Technologies:
  React, Tailwind


  Overall: Background should contain a grid-like pattern, maybe with the ocasisonal
  grid highlighting flowing randomly through the side with varying colors. 
*/

// https://docs.google.com/spreadsheets/d/e/2PACX-1vRwHUrNsa96jYumGIoK-eb1PTyZYqCWhF8ygzeWph4NTDk2TqLtHLlquPPe762k4i2fM2o0kMBxUeWE/pubhtml?gid=0&single=true


const sheet = '2PACX-1vRwHUrNsa96jYumGIoK-eb1PTyZYqCWhF8ygzeWph4NTDk2TqLtHLlquPPe762k4i2fM2o0kMBxUeWE';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  skills: string[];
  repoLink: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readLink: string;
  fullContent?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "OnboardingAI",
    description: "AI-caller that converses with users and schedules through phone as well as initiating calling campaigns for business needs",
    image: onboardingai,
    skills: ["React", "Node.js", "MongoDB"],
    repoLink: "https://github.com/AnikSingha/OnboardingAI/tree/main"
  },
  {
    id: 2,
    title: "Astroid",
    description: "Astroid Game built w/ Pygame",
    image: astroid,
    skills: ["Python","PyGame"],
    repoLink: "https://github.com/Salhudais/asteroids"
  },
  {
    id: 3,
    title: "Route Planning",
    description: "A Route Planning Visualizer built with C++ and IO2D using A*",
    image: route_planning,
    skills: ["React", "Node.js", "MongoDB"],
    repoLink: "https://github.com/OnePercentBetter/Route-Planning"
  },
]

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Weekly Dev Log: Full-Stack Journey & Learning Patterns",
    excerpt: "A week-long deep dive into frontend styling, portfolio development, database integration with Prisma & Docker, and building a full-stack survey application. Reflections on development practices and learning methodologies.",
    date: "February 8, 2025",
    readLink: "#",
    fullContent: false
  },
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/AnikSingha/OnboardingAI/tree/main', icon: github },
  { name: 'LinkedIn', url: '___', icon: linkedln },
  { name: 'X', url: 'https://x.com/Sal_KMA', icon: twitter  }
]

// Memoize the BlogPost component
const BlogPost = memo(({ post, isExpanded, onToggleExpand }: { 
  post: BlogPost; 
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
}) => {
  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggleExpand(post.id);
  };

  return (
    <article className="blog-post">
      <div className="blog-post-content">
        <time className="blog-date">{post.date}</time>
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        
        {isExpanded && (
          <div className="post-details">
            <h4>Weekly Progress Overview</h4>
            <ol className="progress-list">
              <li>Started with styling practice using CSS, Tailwind, and React for design reconstruction</li>
              <li>Developed personalized portfolio sites as foundation for future projects</li>
              <li>Explored database development using Prisma, Docker, and SQL, learning about ORMs and containerization</li>
              <li>Built an end-to-end survey application integrating all learned concepts</li>
            </ol>

            <h4>Key Development Insights</h4>
            <div className="learnings-grid">
              <div className="learning-card">
                <h5>Version Control</h5>
                <p>Commit changes frequently and document modifications. Changes can break applications - having restore points is crucial.</p>
              </div>
              <div className="learning-card">
                <h5>Documentation & Learning</h5>
                <p>Learn by doing - combine documentation reading with hands-on project development. Use LLMs as supplementary guides for understanding concepts.</p>
              </div>
              <div className="learning-card">
                <h5>Focus Management</h5>
                <p>Implement task queues to manage feature development. Avoid context switching by documenting ideas without interrupting current work.</p>
              </div>
              <div className="learning-card">
                <h5>Debugging Strategy</h5>
                <p>Use LLMs as a last resort for debugging. Focus on systematic troubleshooting and understanding the code manually.</p>
              </div>
            </div>

            <h4>Looking Forward</h4>
            <p className="outlook">
              Preparing for NextJS and serverless frameworks exploration. While documentation reliance is high,
              focus remains on building fundamental understanding through practical application.
            </p>
            <p className="reflection">
              Sunday's dedicated to breaking down and rebuilding applications for deeper comprehension.
              Current challenge: Building confidence in library utilization without heavy documentation dependence.
            </p>
          </div>
        )}
        
        <a href={post.readLink} className="read-more" onClick={handleReadMore}>
          {isExpanded ? '← Show Less' : 'Read More →'}
        </a>
      </div>
    </article>
  );
});

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());
  
  // const users = UseSpreadsheet(sheet);
  // const loading = !users.length;

  const NavLinks = () => (
    <nav className="nav-links">
      <a href="#home">Home</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
  )

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
      
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const ColorChangingBox = () => (
    <div
      style={{
        width: '20px',
        position: 'absolute',
        height: '20px',
        top: `${Math.random() * mousePosition.y * 2}px`,
        right:`${Math.random() * mousePosition.x}px`,
        backgroundColor: `rgb(${mousePosition.x % 256}, ${mousePosition.y % 256}, ${(mousePosition.x + mousePosition.y) % 256})`,
      }}
    />
  );

  const SocialLinks = () => (
    <div className="social-links">
      {socialLinks.map((link) => (
       <div>
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          ><img className="icons" src={link.icon}/></a>
       </div>
      ))}
    </div>
  )

  const ProjectCard = ({ project }: {project: Project}) => (
    <div 
      className="project-card"
      onClick={() => setSelectedProject(project)}
    >
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="skills-container">
        {project.skills.map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )

  const ProjectModal = ({ project, onClose }: {project: Project, onClose: () => void}) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">{project.title}</h2>
        <img className="project-img" src={project.image}/>
        <p className="modal-description">{project.description}</p>
        <div className="skills-container">
          {project.skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
        <a 
          href={project.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-link"
        >
          View Repository
        </a>
      </div>
    </div>
  )

  const handleTogglePost = (postId: number) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <NavLinks />
      <ColorChangingBox />
      <div className="app-container">
        <section id="home" className="profile-container">
          <div className={`profile-content ${isVisible ? 'visible' : ''}`}>
            <h1 className="profile-heading">Salah Alhudais</h1>
            
            <div className="profile-image-container">
              <img 
                src={profile_picture} 
                alt="Salah Alhudais"
                className="profile-image"
              />
            </div>

            <SocialLinks />
            
            
            <p className="profile-bio">
              Something interesting to say and witty enough to capture your attention and proclaim 
              myself as the copywriting & Direct Response God.
            </p>

            <div className="button-container">
              <button className="primary-button">See More</button>
              <button className="secondary-button">View CV</button>
            </div>
          </div>
        </section>
        <div className="projects-section" id="projects">
          <h2 className="projects-heading">Projects</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}

        <section className="blog-section" id="blog">
          <h2 className="section-heading">Dev Blog</h2>
          <div className="blog-posts">
            {blogPosts.map(post => (
              <BlogPost 
                key={post.id} 
                post={post}
                isExpanded={expandedPosts.has(post.id)}
                onToggleExpand={handleTogglePost}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default App
