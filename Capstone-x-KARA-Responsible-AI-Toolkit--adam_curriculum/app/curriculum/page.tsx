
import Link from "next/link";
import { curriculum } from "./curriculum-data";

export default function CurriculumPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold">
        Curriculum
      </h1>

      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Choose a unit.
      </p>

      <div className="mt-8 space-y-10">
        {curriculum.map((section) => (
          <section key={section.slug}>
            <h2 className="mb-4 text-2xl font-semibold">
              {section.title}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/curriculum/${section.slug}/${topic.slug}`}
                  className="group block rounded-xl border p-5 transition hover:border-blue-500 hover:shadow-md"
                >
                  {/* Unit number */}
                  <span className="inline-block rounded-md bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                    Unit {topic.unit}
                  </span>

                  {/* Topic name */}
                  <h3 className="mt-4 text-xl font-semibold group-hover:text-blue-600">
                    {topic.title}
                  </h3>

                  {/* Topic description */}
                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {topic.description}
                  </p>

                  <div className="mt-4 text-sm font-medium text-blue-600">
                    View topic →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
