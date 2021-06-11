import calc_img from './img/calc.png';
import dom_img from './img/DOM.png';
import form_img from './img/form.png';
import im_img from './img/im.png';
import sq_img from './img/sq.png';
import wad_img from './img/wad.png';
import na from './img/not_available.png';
import mapfind from './img/MapFind.png';
import { Project } from './Types';

const PROJECTS: Record<number, Project> = {
  1: {
    title: 'Wordpress Site',
    desc: 'First Project',
    url: 'https://tullux.se/wp2/',
    img: wad_img,
  },
  2: {
    title: 'DOM',
    desc: 'DOM-script testing',
    url: 'http://infomedia.orebro.se/xoleri24/projects/Dom%20test/DOM.html',
    img: dom_img,
  },
  3: {
    title: 'Infomedia',
    desc: 'Bootstrap recreation',
    url: 'http://infomedia.orebro.se/xoleri24/projects/Bootstrap%20skeleton%20infomedia%20site/infomedia.html',
    img: im_img,
  },
  4: {
    title: 'Speedrun Quiz',
    desc: 'Oliver, Emma, Francis & Robert',
    url: 'http://infomedia.orebro.se/xoleri24/projects/Colab/',
    img: sq_img,
  },
  5: {
    title: 'Cat Meme Generator',
    desc: 'Generic Impact Meme Generator',
    url: 'http://infomedia.orebro.se/xoleri24/projects/meme%20generator/',
  },
  6: {
    title: 'Jeopardy',
    desc: 'A jeopardy game',
    url: 'http://infomedia.orebro.se/xoleri24/projects/jeopardy',
  },
  7: {
    title: 'MapFind',
    desc: 'A great way to keep track of those you care for',
    url: 'http://infomedia.orebro.se/xoleri24/projects/vtprojekt',
    img: mapfind,
    new: true,
  },
  8: {
    title: 'Color Routing',
    desc: 'Statically generated pages',
    url: 'http://infomedia.orebro.se/xoleri24/projects/color-routing/',
    new: true,
  },
};

//check if img property exists
const propExists = Object.values(PROJECTS).map(item => item.hasOwnProperty('img'));

//Set img property
for (let i: number = 0; i < propExists.length; i++) {
  if (propExists[i] === false) {
    PROJECTS[i + 1].img = na;
  }
}

export { PROJECTS };
