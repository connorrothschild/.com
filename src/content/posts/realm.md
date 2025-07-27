---
title: 'Integrated Security' 
date: 2024-09-12
category: "technical"
showToc: false
showTopImage: true
image: '/posts/realm/social.webp'
unlisted: false
synopsisForLlms: "Realm Alliance is a foundational physical security platform for critical industries, with a website built using React, Next.js (pages router), Tailwind CSS, Motion for animations, and TinaCMS for content management. The website showcases technical sophistication through a complex 3D scene created with Three.js and React Three Fiber, featuring custom shaders for grid visualization, building highlighting with edge detection, camera controls, and pulsating radial gradients. Additional notable features include an expanding menu leveraging Motion's layout animations for smooth transitions, and full internationalization support via i18next, organizing all copy in a locales/common.json file that effectively serves as a lightweight CMS. The result is a visually striking and technically advanced web experience that effectively communicates Realm's focus on integrated security solutions for critical infrastructure."
---

The team at Asimov Collective recently wrapped up a new brand identity for [Realm](https://x.com/realmalliance), the foundational physical security platform for critical industry.

You can find the site [here](https://www.realmalliance.com/).

[![Realm](/posts/realm/social.webp)](https://realmalliance.com/)

---

## The Stack

The site is built using our typical stack: 
* React, with [Next.js](https://nextjs.org/) as our meta-framework ([pages router](https://nextjs.org/docs/pages))
* [Tailwind CSS](https://tailwindcss.com/) for styling 
* [Motion](https://motion.dev/) for animations
* [TinaCMS](https://tina.io/) for content management

## Technical Highlights

### 3D Scene

We built out a complex 3D scene using [Three.js](https://threejs.org/) and [React Three Fiber](https://r3f.docs.pmnd.rs/). The scene uses a base GLTF model of mountains and a scene on top of a series of buildings. We built a complex grid shader that takes in the density as a parameter, allowing us to visualize depth. You can see the scene in action below:

<video controls className='w-full'>
    <source src="/posts/realm/3d-scene.mp4" type="video/mp4" />
</video>

Alongside the custom shader for the grid system, we also built out a system that orchestrated the highlighting the buildings one by one. This involved keeping track of the highlighted building in state, and lerping the color in a `useFrame` hook.

Some other stuff, that you would think would be trivial, but were actually somewhat complex:
* Highlighting visible edges of buildings using `<lineSegments />` and `<edgesGeometry />`.
* Adding camera controls within bounds for a semi-orbitable scene.
* Creating a custom `pulsatingRadialGradient` shader for the circle that appears under the center building.

### Expanding Menu

We leveraged `motion`'s [layout animations](https://motion.dev/docs/react-layout-animations) to create an expanding menu animation.

<video controls className='w-full'>
    <source src="/posts/realm/expanding-menu.mp4" type="video/mp4" />
</video>

Layout animations can always be tricky, especially when trying to prevent distortions, but after tweaking we ended up with a nice effect.

### Internationalization

This was our first project carrying out internationalization via [i18next](https://github.com/i18next/next-i18next)—a great tool. As a result, we moved all copy to a `locales/common.json` file, which had a side effect of becoming a lightweight CMS in a way.

<video controls className='w-full'>
    <source src="/posts/realm/internationalization.mp4" type="video/mp4" />
</video>

## Integrated Security

The project was a fun one to work on, and we're really proud of the result. Check out Realm [here](https://realmalliance.com/).