import { motion, AnimatePresence, useCycle } from 'framer-motion'
import React, { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
} from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import calc_img from './img/calc.png'
import dom_img from './img/DOM.png'
import form_img from './img/form.png'
import im_img from './img/im.png'
import sq_img from './img/sq.png'
import wad_img from './img/wad.png'
import './App.css'

const PROJECTS = {
  msBDL0aK1diyEwqivi0LuQ: {
    //random base64 strings
    title: 'Wordpress Site',
    desc: 'First Project',
    url: 'https://tullux.se/wp2/',
    img: wad_img,
  },
  z4hgsiR4jSQWWKW9y2BXFg: {
    title: 'Register Form',
    desc: 'A form',
    url:
      'http://infomedia.orebro.se/xoleri24/projects/register%20form/registerform.html',
    img: form_img,
  },
  mFNiGxNWqrlBW4CuJijrdQ: {
    title: 'Grid Calculator',
    desc: 'A calculator design',
    url:
      'http://infomedia.orebro.se/xoleri24/projects/grid%20calculator%20js/calculator.html',
    img: calc_img,
  },
  sNPsncmyiPgsiRJMmBqpAg: {
    title: 'DOM',
    desc: 'DOM-script testing',
    url: 'http://infomedia.orebro.se/xoleri24/projects/Dom%20test/DOM.html',
    img: dom_img,
  },
  XfwyH12jU03LlmFjNjGmsw: {
    title: 'Infomedia',
    desc: 'Bootstrap recreation',
    url:
      'http://infomedia.orebro.se/xoleri24/projects/Bootstrap%20skeleton%20infomedia%20site/infomedia.html',
    img: im_img,
  },
  dpMbLhj7nnRvPdbWUMIq0w: {
    title: 'Speedrun Quiz',
    desc: 'Oliver, Emma, Francis & Robert',
    url: 'http://infomedia.orebro.se/xoleri24/projects/Colab/index.html',
    img: sq_img,
  },
}

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
}

/* const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
} */

const pageTransition = {
  type: 'spring',
  ease: 'anticipate',
  duration: 0.6,
}

const navBarTransition = {
  type: 'linear',
}

function App() {
  const location = useLocation()
  return (
    <>
      <Navigation />
      <div style={{ overflowX: 'hidden' }} className="app">
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/projects/:id" component={ItemDetail} />
            <Route path="/" component={Hero}></Route>
          </Switch>
        </AnimatePresence>
      </div>
    </>
  )
}

const Hero = () => {
  const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'pink',
    'brown',
    'magenta',
  ]

  const randomColors = colors[Math.floor(Math.random() * colors.length)]
  const [logo, setLogo] = useState({ color: randomColors })
  console.log(logo)

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1 className="hero">OLIVER</h1>

      <div style={{ textAlign: 'center' }}>
        <FaGithub
          size={70}
          style={logo}
          onClick={() => setLogo({ color: randomColors })}
        />
        <br></br>
        <a
          className="wutdis"
          href="https://github.com/SolaceMotion"
          style={logo.color !== 'blue' ? { visibility: 'hidden' } : {}} //else display block
        >
          wut dis?
        </a>
      </div>
    </motion.div>
  )
}

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    /* stroke="hsl(0, 0%, 18%)" */
    stroke="#fff"
    strokeLinecap="round"
    {...props}
  />
)
//Paths are kind of broken, taken from a tutorial and I messed up
const MenuToggle = ({ toggle }) => (
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
)

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
}

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.

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
}

/* const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 })

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth
    dimensions.current.height = ref.current.offsetHeight
  }, [])

  return dimensions.current
} */

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  /* const containerRef = useRef(null)
  const { height } = useDimensions(containerRef) */

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        /* variants={variants} */
        /* custom={height}
        ref={containerRef} */
      >
        <motion.div className="background" variants={sidebar}></motion.div>
        <SideNav
        /* handleStyle={isOpen ? { display: "block" } : { display: "none" }} */
        />
        {/* Display none if sidenav is not open, screws up the out animation*/}
        <MenuToggle toggle={() => setIsOpen(!isOpen)} />
      </motion.nav>
    </>
  )
}

const sideNavVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const SideNav = ({ handleStyle }) => {
  //Pass object to Navigation component

  return (
    <motion.ul variants={sideNavVariants} style={handleStyle}>
      {/* Attempt to fix out animation */}
      <motion.li
        variants={menuItemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/">Home</Link>
      </motion.li>
      {Object.keys(PROJECTS).map((item) => {
        console.log(item.title)
        return (
          <motion.li
            variants={menuItemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link key={item} to={`/projects/${item}`}>
              {PROJECTS[item].title}
            </Link>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}

const ItemDetail = () => {
  const { id } = useParams() //picks up the id that was clicked and grabs its properties
  console.log(PROJECTS[id])
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
          <h1 className="paragraph">{PROJECTS[id].title}</h1>
          <p className="margin paragraph">{PROJECTS[id].desc}</p>

          <motion.img width="500" height="256" src={PROJECTS[id].img} />
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
  )
}

export default App
