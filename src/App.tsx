import { motion, AnimatePresence, useCycle } from 'framer-motion';
import { useState } from 'react';
import { Switch, Route, Link, useParams, useLocation } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import './App.css';

/* import * as T from "three" */
import DrawerLinks from './components/drawer-links';
import { PROJECTS } from './projects-data';
import ThreeJs from './components/threejs';
/* import $ from "jquery" */

import { Project } from './Types';

const pageVariants = {
  initial: {
    opacity: 0,
    x: '-100vw',
    scale: 0.8,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: '100vw',
    scale: 1.2,
  },
};

/* const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
} */

const pageTransition = {
  type: 'spring',
  ease: 'anticipate',
  duration: 0.6,
};

const navBarTransition = {
  type: 'linear',
};

function App() {
  const location = useLocation();

  return (
    <>
      <ThreeJs />
      <Navigation />
      <div style={{ overflowX: 'hidden' }} id="d" className="app">
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/projects/:id" component={ItemDetail} />
            <Route path="/" component={Hero}></Route>
          </Switch>
        </AnimatePresence>
      </div>
    </>
  );
}

const Hero = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  window.addEventListener('resize', () => setWidth(window.innerWidth));

  const colors: Array<string> = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'brown', 'magenta'];

  const randomColors: string = colors[Math.floor(Math.random() * colors.length)];
  const [logo, setLogo] = useState<{ color: string }>({ color: randomColors });

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <div style={{ textAlign: 'center' }}>
        <FaGithub
          size={width > 600 ? 90 : 11.5 + 'vmin'}
          style={logo}
          onClick={() => setLogo({ color: randomColors })}
        />
        <br></br>
        <a
          className="wutdis"
          target="_blank"
          href="https://github.com/SolaceMotion"
          style={logo.color !== 'blue' ? { visibility: 'hidden' } : {}} //else display block
        >
          ?
        </a>
      </div>
    </motion.div>
  );
};

const Path = props => (
  <motion.path
    /* stroke="hsl(0, 0%, 18%)" */
    fill="transparent"
    strokeWidth="3"
    stroke="#fff"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <button onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
);

const menuItemVariants = {
  open: {
    display: 'block',
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    /* y: 50, */
    display: 'none', //Attempt to fix out animation, looks better than passing handleStyle object
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to return null for unmeasured states.

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

/* const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 })

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth
    dimensions.current.height = ref.current.offsetHeight
  }, [])

  return dimensions.current
} */

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  /* 
    const containerRef = useRef(null)
    const { height } = useDimensions(containerRef)
  */
  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        /* variants={variants} */
        /* custom={height}
        ref={containerRef} */
      >
        <motion.div className="burger-background" variants={sidebar}></motion.div>
        <SideNav projectObject={PROJECTS} handleStyle={isOpen ? { display: 'block' } : { display: 'none' }} />
        {/* Display none if sidenav is not open, screws up the out animation*/}
        <MenuToggle toggle={() => setIsOpen(prevState => !prevState)} />
      </motion.nav>
    </>
  );
};

const sideNavVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const SideNav = ({
  handleStyle,
  projectObject,
}: {
  handleStyle: any;
  projectObject: Record<number, Project>;
}) => {
  //Pass object to Navigation component
  return (
    <motion.ul variants={sideNavVariants} style={handleStyle}>
      {/* Attempt to fix out animation */}
      <motion.li variants={menuItemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link to="/">Home</Link>
      </motion.li>
      {Object.keys(projectObject).map((item, i) => {
        return (
          <motion.li
            variants={menuItemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            key={i}
          >
            <DrawerLinks
              isNew={projectObject[item].new}
              item={item}
              key={i}
              title={projectObject[item].title}
            />
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>(); //picks up the id that was clicked and grabs its properties
  /* console.log(PROJECTS[id]) */
  /* console.log(match) */

  //Check images using match
  //const IMAGE = match.params.id == "Wordpress Site" ? wad_img : (match.params.id == "Register Form" ? form_img : (match.params.id == "Grid Calculator" ? calc_img : (match.params.id == "DOM" ? dom_img : (match.params.id == "Infomedia" ? im_img : (match.params.id == "Speedrun Quiz" ? sq_img: "")))))
  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="card">
          <h1 className="title">{PROJECTS[id].title}</h1>
          <p className="margin paragraph">{PROJECTS[id].desc}</p>

          <motion.img className="jumboimg" width="500" height="256" src={PROJECTS[id].img} />
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button paragraph"
            href={PROJECTS[id].url}
          >
            Go to project
          </motion.a>
        </div>

        {/* {match.params.id}
      <img height="100" src={IMAGE}></img>
      <a href={match.url}>dd</a> */}
      </motion.div>
    </>
  );
};

export default App;
