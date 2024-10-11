"use client";

import { useRef, useState, useEffect } from "react";
import "./style.css";

const images = [
  "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1532664189809-02133fee698d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1524473994769-c1bbbf30e944?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1492136344046-866c85e0bf04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMjU4fQ&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1511200016789-e7b694d91f81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1513415564515-763d91423bdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1517309246852-c500628fefad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
];

const LazyImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const loaderRef = useRef<HTMLSpanElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const current = loaderRef?.current;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      });
    });

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return loaded ? (
    // eslint-disable-next-line
    <img
      src={src}
      alt={alt}
      className="block size-56 h-auto max-w-full flex-shrink-0"
    />
  ) : (
    <span
      ref={loaderRef}
      className="size-56 flex-shrink-0 animate-pulse bg-gray-500"
    />
  );
};

const Section: React.FC<{ image: string }> = ({ image }) => {
  return (
    <section className="my-5 flex gap-5">
      <LazyImage src={image} alt="Coontent Thumbnail" />

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
        perspiciatis placeat officiis earum. Omnis voluptatem minima suscipit
        placeat ad qui reprehenderit quos vel sed, eos hic similique numquam
        sint corporis?
      </div>
    </section>
  );
};

const LazyLoadImage = () => {
  return (
    <div className="p-16">
      <h1 className="my-[30px] text-center text-3xl font-bold">
        Lazy Loading Images
      </h1>

      {images.map((image) => (
        <Section key={image} image={image} />
      ))}
    </div>
  );
};

export default LazyLoadImage;
