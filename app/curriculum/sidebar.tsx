
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { curriculum } from "./curriculum-data";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState<
    Record<string, boolean>
  >({
    "start-here": true,
    "using-my-own-work": true,
    "better-prompts": true,
  });

  return (
    <aside
      className={`shrink-0 border-r min-h-full p-3 transition-all ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full rounded p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label={
          collapsed ? "Expand sidebar" : "Collapse sidebar"
        }
      >
        {collapsed ? "☰" : "← Collapse"}
      </button>

      {!collapsed && (
        <nav className="mt-4 space-y-3">
          <Link
            href="/curriculum"
            className="block rounded p-2 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Curriculum Home
          </Link>

          {curriculum.map((section) => (
            <div key={section.slug}>
              <button
                onClick={() =>
                  setExpanded((previous) => ({
                    ...previous,
                    [section.slug]: !previous[section.slug],
                  }))
                }
                className="flex w-full items-center justify-between rounded p-2 text-left font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-expanded={!!expanded[section.slug]}
              >
                <span>{section.title}</span>
                <span>
                  {expanded[section.slug] ? "−" : "+"}
                </span>
              </button>

              {expanded[section.slug] && (
                <div className="ml-3 border-l pl-2">
                  {section.topics.map((topic) => {
                    const href =
                      `/curriculum/${section.slug}/${topic.slug}`;
                    const active = pathname === href;

                    return (
                      <Link
                        key={topic.slug}
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={`block rounded p-2 text-sm ${
                          active
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {topic.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </aside>
  );
}
