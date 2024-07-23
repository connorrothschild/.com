import Hero from "@/components/Sections/Hero";
import Intro from "@/components/Sections/Intro";
import Work from "@/components/Sections/Work";
import Contact from "@/components/Sections/Contact";
import Head from "next/head";
import Loader from "@/components/Loader";
import Footer from "@/components/Sections/Footer";
import Showreel from "@/components/Sections/Showreel";
import ProjectsScroll from "@/components/Sections/ProjectsScroll";
import Menu from "@/components/Menu";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

const META_TITLE = "Connor Rothschild";
const META_DESCRIPTION =
  "The portfolio of software & data visualization engineer, Connor Rothschild.";

export default function Home() {
  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CL_Rothschild" />
        <meta name="twitter:creator" content="@CL_Rothschild" />
        <meta name="twitter:title" content={META_TITLE} />
        <meta name="twitter:description" content={META_DESCRIPTION} />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
      </Head>

      <PageTransitionWrapper>
        {/* <Loader> */}
        {/* <Hero /> */}
        {/* <Showreel /> */}
        {/* <Menu /> */}
        <Intro />
        {/* <ProjectsScroll /> */}
        {/* <Work /> */}
        {/* <Contact /> */}
        {/* <Footer /> */}
        {/* </Loader> */}
      </PageTransitionWrapper>
    </>
  );
}
