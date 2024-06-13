import React, { useEffect, useMemo, useState } from "react";
import Dot from "@/components/Elements/Dot";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/router";

const projects = [
  {
    title: "Inside the BJP’s WhatsApp machine",
    year: 2024,
    url: "https://restofworld.org/2024/bjp-whatsapp-modi/",
    type: "Chart",
    filterCategory: "visualization",
    featured: false,
  },
  {
    title: "Rainmaker",
    year: 2024,
    url: "https://www.makerain.com/",
    type: "Web",
    filterCategory: "web",
    featured: true,
  },
  {
    title: "LaDataViz",
    year: 2024,
    url: "https://www.ladataviz.com/",
    type: "Web",
    filterCategory: "web",
  },
  {
    title: "The Changing Face of Protest",
    year: 2024,
    url: "https://restofworld.org/2024/facial-recognition-government-protest-surveillance/",
    type: "Chart",
    filterCategory: "visualization",
    featured: true,
  },
  {
    title: "Praxis Portal",
    year: 2024,
    url: "https://portal.praxisnation.com/",
    type: "App, web",
    filterCategory: "web",
  },
  {
    title: "Vana Portrait",
    year: 2024,
    url: "https://portrait.vana.com/",
    type: "App, web",
    filterCategory: "web",
  },
  {
    title: "Riders in the Smog",
    year: 2024,
    url: "https://restofworld.org/2024/riders-in-the-smog-gig-workers-pollution/",
    type: "Chart",
    filterCategory: "visualization",
  },
  {
    title: "Dressed to Express",
    year: 2024,
    url: "https://www.aclutx.org/en/publications/dressed-express-how-dress-codes-discriminate-against-texas-students-and-must-be-changed",
    type: "Chart",
    filterCategory: "visualization",
  },
  {
    title: "Hinge Copilot",
    year: 2024,
    url: "https://www.dating-copilot.com/",
    type: "App, web",
    filterCategory: "web",
  },
  {
    title: "Svelte Charts",
    year: 2023,
    url: "https://www.sveltecharts.com/",
    type: "App, web",
    filterCategory: "web",
  },
  {
    title: "How China took over the world’s online shopping carts",
    year: 2023,
    url: "https://restofworld.org/2023/china-shopping-shein-temu-global-rise/",
    type: "Chart",
    filterCategory: "visualization",
  },
  {
    title: "Causative Labs",
    year: 2023,
    type: "App",
    filterCategory: "web",
  },
  {
    title: "Roadwise",
    year: 2023,
    url: "https://roadwisedss.com/",
    type: "App, web",
    filterCategory: "web",
  },
  {
    title: "Minerva",
    year: 2023,
    url: "https://minervadata.xyz/",
    type: "App",
    filterCategory: "web",
    featured: true,
  },
  {
    title: "Absolute Rest",
    year: 2023,
    type: "App",
    filterCategory: "web",
  },
  {
    title: "Better Data Visualizations with Svelte",
    year: 2023,
    url: "https://www.newline.co/courses/better-data-visualizations-with-svelte",
    type: "Course",
    filterCategory: "visualization",
    featured: true,
  },
  {
    title: "A Visual Introduction to Prompt Engineering",
    year: 2023,
    url: "https://www.learnpromptengineering.org/",
    type: "Story",
    filterCategory: "visualization",
    featured: true,
  },
  {
    title: "What languages dominate the internet?",
    year: 2023,
    url: "https://restofworld.org/2023/internet-most-used-languages/",
    type: "Chart",
    filterCategory: "visualization",
  },
  {
    title: "Vana",
    year: 2022,
    url: "https://vana.com",
    type: "App, web",
    filterCategory: "web",
  },
  {
    title: "Tech's very bad year, in numbers",
    year: 2023,
    url: "https://restofworld.org/2023/techs-bad-year-global-layoffs-data/",
    type: "Story",
    filterCategory: "visualization",
    featured: true,
  },
  {
    title: "babby.xyz",
    year: 2022,
    url: "https://opensea.io/collection/babbys",
    type: "App, web",
    filterCategory: "web",
  },
  {
    title: "Painting Attention: How Asphalt Art Saves Lives",
    year: 2022,
    url: "https://mokshadata.studio/projects/asphalt-art/",
    type: "Story",
    filterCategory: "visualization",
  },
  {
    title: "Get to Know the Houston Budget",
    year: 2022,
    url: "https://houstonbudget.cool/",
    type: "Story",
    filterCategory: "visualization",
  },
  {
    title: "Praxis",
    year: 2022,
    url: "https://cityofpraxis.org",
    type: "App, web",
    filterCategory: "web",
    featured: true,
  },
  {
    title: "Gallery",
    year: 2022,
    url: "https://gallery.so",
    type: "App, web",
    filterCategory: "web",
  },
  {
    title: "In the Dark",
    year: 2022,
    url: "https://restofworld.org/2022/blackouts/",
    type: "Story",
    filterCategory: "visualization",
    featured: true,
  },
  {
    title: "An Interactive History of Impact Investing",
    year: 2022,
    url: "https://impact.collabfund.com/",
    type: "Microsite",
    filterCategory: "visualization",
    featured: true,
  },
  {
    title: "COVID vulnerability scores vs. vaccination rates across the U.S.",
    year: 2021,
    url: "https://www.axios.com/2021/06/21/coronavirus-vaccines-vulnerability-states-outbreaks-variants",
    type: "Chart",
    filterCategory: "visualization",
  },
  {
    title: "Olympic winners, over time",
    year: 2021,
    url: "https://www.axios.com/2021/07/23/olympic-winners",
    type: "Chart",
    filterCategory: "visualization",
    featured: true,
  },
  {
    title: "The U.S. college population, visualized as 100 students",
    year: 2021,
    url: "https://www.axios.com/2021/08/21/hard-truths-deep-dive-higher-education-affirmative-action",
    type: "Chart",
    filterCategory: "visualization",
  },
  {
    title: "Olympics medal tracker",
    year: 2021,
    url: "https://www.axios.com/2021/07/27/olympics-medal-count-usa-tokyo",
    type: "Chart",
    filterCategory: "visualization",
  },
  {
    title: "Non-white share of population by county",
    year: 2021,
    url: "https://www.axios.com/2021/08/15/diversity-majority-minority-white-american-census",
    type: "Charts",
    filterCategory: "visualization",
  },
  {
    title: "Axios",
    year: 2021,
    url: "https://muckrack.com/connor-rothschild-1/portfolio",
    type: "Chart",
    filterCategory: "visualization",
  },
  {
    title: "Beat Foundry",
    year: 2021,
    url: "https://fontsinuse.com/uses/47829/beat-foundry-visual-identity",
    type: "App, web",
    filterCategory: "web",
  },
  {
    title: "Texas School District COVID-19 Monitoring Dashboard",
    year: 2021,
    url: "https://news.rice.edu/2021/05/05/dashboard-developed-at-rice-will-help-texas-schools-open-safely-amid-pandemic/",
    type: "Story",
    filterCategory: "visualization",
  },
  {
    title: "Changes in Federal and State Minimum Wages",
    year: 2021,
    url: "https://twitter.com/CL_Rothschild/status/1366879233935564803",
    type: "Chart",
    filterCategory: "visualization",
  },
  {
    title: "The Bob Ross Virtual Art Gallery",
    year: 2021,
    url: "https://connorrothschild.github.io/bob-ross-art-gallery/",
    type: "Story",
    filterCategory: "visualization",
    featured: true,
  },
  {
    title: "One Line Hacks",
    description:
      "A collection of random utilities that I find myself Googling too often.",
    year: 2021,
    archived: true,
    url: "https://connorrothschild.github.io/one-line-hacks/",
    type: "Story",
    filterCategory: "web",
  },
  {
    title: "USSOCOM",
    year: 2020,
    // url: "https://twitter.com/CL_Rothschild/status/1328746973952942081",
    type: "App",
    filterCategory: "visualization",
  },
  {
    title: "When COVID Peaked",
    year: 2020,
    url: "https://twitter.com/CL_Rothschild/status/1328746973952942081",
    type: "Chart",
    filterCategory: "visualization",
  },
  {
    title: "COVID on Campus",
    year: 2020,
    url: "https://twitter.com/CL_Rothschild/status/1315353704388866048",
    type: "Story",
    filterCategory: "visualization",
  },
  {
    title: "Mask Wearing in Your County",
    description: "Visualizing COVID-19 mask usage in your county.",
    year: 2020,
    url: "https://observablehq.com/@connorrothschild/mask-wearing-in-your-county",
    type: "Story",
    filterCategory: "visualization",
  },
  {
    title: "I Can Guess What You're Doing Right Now",
    description:
      "Using the American Time Use Survey to predict your daily activities.",
    year: 2020,
    archived: true,
    url: "https://connorrothschild.github.io/what-are-you-doing/",
    type: "Story",
    filterCategory: "visualization",
  },
  {
    title: "Are You Smarter Than COMPAS?",
    description:
      "A quick game to see if you are more intelligent than an algorithm used to sentence millions of Americans.",
    year: 2020,
    audience: "The world!",
    archived: true,
    url: "https://connorrothschild.github.io/compas/",
    type: "Story",
    filterCategory: "visualization",
  },
  {
    title: "How Much Does Kid Cudi Hum?",
    description: "An extensive analysis of music's most famous hum.",
    year: 2020,
    url: "https://connorrothschild.github.io/cudi-hums/",
    type: "Story",
    filterCategory: "visualization",
    featured: true,
  },
  {
    title: "Mapping Houston Homicides",
    description: "An exploration of homicides in Houston.",
    year: 2020,
    url: "https://connorrothschild.github.io/datathon-2020/source",
    type: "Story",
    filterCategory: "visualization",
  },
  {
    title: "Mapping Police Killings",
    description: "Visualizing officer-involved deaths since 2013.",
    year: 2020,
    url: "https://mokshadata.studio/projects/police-force/",
    type: "Story",
    filterCategory: "visualization",
    featured: true,
  },
  {
    title: "Quarantunes",
    description: "Explore your listening history during COVID-19.",
    year: 2020,
    url: "https://quarantune.netlify.app",
    type: "Story",
    filterCategory: "visualization",
  },
  {
    title: "How Much Does Your State Spend on Police?",
    year: 2020,
    url: "https://connorrothschild.github.io/state-police-spending/",
    type: "Story",
    filterCategory: "visualization",
  },
  {
    title: "Spikes in Firearm Background Checks during COVID-19",
    year: 2020,
    url: "https://twitter.com/CL_Rothschild/status/1283412638618341376",
    type: "Chart",
    filterCategory: "visualization",
  },
  {
    title: "Mapping Missing Migrants",
    description:
      "Documenting migrants who have lost their lives while seeking refuge.",
    year: 2019,
    url: "https://connorrothschild.github.io/map-missing-migrants",
    type: "Story",
    filterCategory: "visualization",
  },
  {
    title: "The Race for Media Attention",
    description:
      "Visualizing media coverage of 2020 presidential candidates over time.",
    year: 2019,
    archived: true,
    url: "https://observablehq.com/@connorrothschild/bar-chart-race",
    type: "Story",
    filterCategory: "visualization",
  },
].reverse();

const prefixNumberWithZeroes = (number: number) => {
  if (number < 10) {
    return `00${number}`;
  } else if (number < 100) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
};

export default function Archive() {
  const DARK_MODE = false;

  const CATEGORIES = [
    { name: "Visualization", slug: "visualization" },
    { name: "Web", slug: "web" },
  ];

  // Initialize state based on URL query
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(() => {
    const { filter } = router.query;
    if (filter) {
      return filter as string;
    }
    return "";
  });

  // Check URL query string for filter
  useEffect(() => {
    const { filter } = router.query;
    if (filter) {
      setSelectedFilter(filter as string);
    }
  }, [router.query]);

  // Actual filtering logic
  const projectsFiltered = useMemo(() => {
    const filterOutArchivedAndAddNumbers = (projects: any[]) =>
      projects
        .filter((project) => !project.archived)
        // .sort((a, b) => a.year - b.year)
        .map((project, i) => ({
          id: i + 1,
          ...project,
        }))
        .sort((a, b) => a.id - b.id);

    if (!selectedFilter) {
      return filterOutArchivedAndAddNumbers(projects);
    }

    return filterOutArchivedAndAddNumbers(
      projects.filter((project) => project.filterCategory === selectedFilter)
    );
  }, [selectedFilter]);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <section className="w-full min-h-screen relative">
      <div className="relative flex flex-col items-start justify-start py-24 w-full min-h-screen text-black px-[20px]">
        <div className="max-w-5xl mx-auto w-full">
          <h1 className="text-7xl font-sans font-extralight text-gray-700 mb-2">
            All Projects
          </h1>
          <p className="text-lg font-sans font-light leading-snug text-gray-700">
            Everything I have worked on.
          </p>
          <div className="flex flex-row gap-2 mb-12 mt-4">
            {CATEGORIES.map((filter) => (
              <p
                key={filter.slug}
                onMouseDown={() => {
                  if (selectedFilter === filter.slug) {
                    setSelectedFilter("");
                    router.push(
                      {
                        // pathname: "/archive",
                        pathname: router.pathname,
                      },
                      undefined,
                      {
                        scroll: false,
                      }
                    );
                  } else {
                    setSelectedFilter(filter.slug);
                    router.push(
                      {
                        pathname: router.pathname,
                        query: { filter: filter.slug },
                      },
                      undefined,
                      {
                        scroll: false,
                      }
                    );
                  }
                }}
                className={`select-none cursor-pointer text-sm font-sans font-light leading-snug text-gray-700 transition ${
                  selectedFilter === filter.slug
                    ? "underline underline-offset-8"
                    : "opacity-50"
                }`}
              >
                {filter.name}
              </p>
            ))}
          </div>
          <div className="hidden w-full max-w-5xl md:flex flex-row justify-between items-center gap-2 mb-2">
            <p className="min-w-[40px] text-sm uppercase text-left font-light">
              No.
            </p>
            <p className="w-full text-sm uppercase font-light">Title</p>
            <p className="w-full md:w-[100px] text-sm uppercase font-light">
              Type
            </p>
            <p className="w-full md:w-[100px] text-sm uppercase font-light">
              Year
            </p>
            <p className="w-12"></p>
          </div>

          {hasMounted ? (
            projectsFiltered
              .sort((a, b) => b.id - a.id)
              .map((project) => (
                <TableRow
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  type={project.type}
                  year={project.year}
                  url={project.url}
                  featured={project.featured}
                />
              ))
          ) : (
            <div className="h-screen" />
          )}
        </div>
      </div>
    </section>
  );
}

function TableRow({
  id,
  title,
  type,
  year,
  url,
  featured,
}: {
  id: number;
  title: string;
  type: string;
  year: number;
  url?: string;
  featured?: boolean;
}) {
  const [isActive, setIsActive] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      key={id}
      className="group w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-1.5 md:gap-2 border-t py-3 border-gray-400"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{
        cursor: url ? "pointer" : "default",
      }}
    >
      <p className="hidden md:block min-w-[40px] text-left text-xs font-sans font-light text-gray-500">
        {prefixNumberWithZeroes(id)}.
      </p>
      <div className="w-full text-left text-lg font-sans font-medium text-gray-700">
        <TableTitle label={title} featured={featured} isActive={isActive} />
      </div>
      <p className="w-full md:w-[100px] text-left text-xs leading-none font-sans uppercase font-medium text-gray-500">
        {type}
        <span className="md:hidden font-sans inline">, {year}</span>
      </p>
      <p className="hidden md:block w-full md:w-[100px] text-left text-xs leading-none font-sans uppercase font-medium text-gray-500">
        {year}
      </p>
      <div
        className={`hidden h-[18px] md:block w-12 text-right text-sm font-sans font-light text-gray-700`}
      >
        {featured && <HoverableDot />}
      </div>
    </a>
  );
}

function HoverableDot() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <Dot />
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={6}>
          <p>Featured project</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function TableTitle({
  label,
  featured,
  isActive,
}: {
  label: string;
  featured: boolean | undefined;
  isActive: boolean;
}) {
  return (
    <div
      className="relative flex flex-row items-start gap-2"
      style={{
        perspective: "100px",
      }}
    >
      <div
        className="leading-none overflow-hidden relative group h-full w-full flex flex-row items-center gap-2"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 800ms cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <p
          className="font-normal duration-500 ease-in-out pointer-events-none"
          style={{
            opacity: isActive ? 0 : 1,
            transform: isActive ? "translateY(-100%)" : "translateY(0)",
            transitionProperty: "opacity, transform",
          }}
        >
          {label}
        </p>
        <p
          className="absolute font-light transform duration-500 font-serif ease-in-out pointer-events-none"
          style={{
            transform: isActive ? "none" : "rotateX(-90deg)",
            opacity: isActive ? 1 : 0,
            transformOrigin: "bottom center",
            transitionDelay: isActive ? "100ms" : "0ms",
            fontStyle: "italic",
            letterSpacing: ".4px",
            transitionProperty: "opacity, transform",
          }}
        >
          {label}
        </p>
      </div>
      <div className="md:hidden flex items-center">
        {featured && <HoverableDot />}
      </div>
    </div>
  );
}
