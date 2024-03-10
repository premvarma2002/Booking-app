import { Footer } from "@/components/client/footer";
import { Navbar } from "@/components/client/navbar";
import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="relative flex flex-col text-black bg-white"
      id="app-container"
    >
      <main className="flex flex-col relative">
        <Navbar />
        <section className="h-full flex-1">{children}</section>
        <Footer />
      </main>
    </div>
  );
};

export default PageLayout;
