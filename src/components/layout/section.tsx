import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const Section: FC<Props> = (props: Props) => {
  return (
    <>
      <main className="w-full relative">
        <nav className="bg-blue-500 h-[50vh] items-center gap-5">
          <div className="mb-20 w-full flex flex-col h-full items-center justify-center gap-2">
            <h1 className="text-white text-4xl">TODO APP</h1>
            <p className="w-1/2 text-white text-center tracking-wide">
              "Organize Your Life, One Task at a Time."
            </p>
          </div>
        </nav>
        {props.children}
      </main>
    </>
  );
};

export { Section };
