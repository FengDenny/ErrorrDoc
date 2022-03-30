import React from "react";
import HeroSection from "./Hero/HeroSection";
import ExploreDocs from "./ExploreDocs/ExploreDocs";
import ExploreSolution from "./ExploreSolution/ExploreSolution";
import BlogSection from "./Blog/BlogSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ExploreDocs />
      <ExploreSolution />
      <BlogSection />
    </>
  );
}
