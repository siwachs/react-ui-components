"use client";

import { useState, memo } from "react";
import DATA from "@/data/confuenceTreeSidebar";
import Link from "next/link";

import { FaChevronRight } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

import { AnimatePresence, motion } from "framer-motion";

type Node = { id: number; label: string; link: string; children?: Node[] };

const Node: React.FC<{
  node: Node;
}> = memo(({ node }) => {
  const [isNodesExpanded, setIsNodesExpanded] = useState(false);
  const haveChildren = node?.children && node.children.length > 0;

  function expandNodes() {
    setIsNodesExpanded((prev) => !prev);
  }

  return (
    <li>
      <div className="flex items-center gap-2.5 text-white">
        {node?.children?.length ? (
          <button
            className={`${isNodesExpanded && "rotate-90"} transition-transform`}
            type="button"
            onClick={expandNodes}
          >
            <FaChevronRight />
          </button>
        ) : (
          <GoDotFill />
        )}

        <Link href={`/?link=${node.link}`} className="text-lg text-blue-500">
          {node.label}
        </Link>
      </div>

      <AnimatePresence>
        {haveChildren && isNodesExpanded && (
          <motion.div
            className="pl-4"
            transition={{ duration: 0.5 }}
            variants={{
              collapsed: { height: 0, opacity: 0 },
              open: { height: "auto", opacity: 1 },
            }}
            initial="collapsed"
            animate="open"
            exit="collapsed"
          >
            <NodeList nodeList={node.children!} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
});

Node.displayName = "Node";

const NodeList: React.FC<{ nodeList: Node[] }> = ({ nodeList }) => {
  return (
    <ul>
      {nodeList.map((node) => (
        <Node key={node.id} node={node} />
      ))}
    </ul>
  );
};

const ConfluenceLikeTreeStructure = () => {
  return (
    <aside className="flex h-screen max-w-96 flex-col bg-gray-800 p-4">
      <NodeList nodeList={DATA} />
    </aside>
  );
};

export default ConfluenceLikeTreeStructure;
