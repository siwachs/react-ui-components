"use client";

import { useCallback } from "react";
import { photosData } from "@/data/reactWindow";
import { FixedSizeList as List } from "react-window";

// Implementation of React Window | Reduce DOM Size | React Performance | npm library
// React components for efficiently rendering large lists and tabular data

// Window is the subset of large list that are currently aactive ie. into the viewport

// Impact on SEO (using SSR)
// Can not do Text search (ctrl + F in browser)

// Better use Lazy Load and React Suspense

const Card: React.FC<{
  id: number;
  title: string;
  thumbnailUrl: string;
}> = ({ id, title, thumbnailUrl }) => {
  return (
    <div className="flex h-[150px] cursor-pointer p-[25px] hover:rounded-[10px] hover:bg-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        loading="lazy"
        src={thumbnailUrl}
        alt={title}
        className="mr-10 size-[100px] rounded-[50%]"
      />

      <div className="my-2.5">
        <div>{id}</div>
        <div>{title}</div>
      </div>
    </div>
  );
};

const ReactWindow = () => {
  const Row = useCallback<
    React.FC<{ index: number; style: React.CSSProperties }>
  >(({ index, style }) => {
    const { id, title, thumbnailUrl } = photosData[index];

    return (
      <div style={style}>
        <Card id={id} title={title} thumbnailUrl={thumbnailUrl} />
      </div>
    );
  }, []);

  return (
    <div className="grid h-screen place-items-center">
      <div className="border-[10px] border-dotted">
        <List
          width={400}
          height={400}
          itemSize={150}
          itemCount={photosData.length}
        >
          {Row}
        </List>
      </div>
    </div>
  );
};

export default ReactWindow;
