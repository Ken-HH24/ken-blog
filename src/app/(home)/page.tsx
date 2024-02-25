import Link from 'next/link'

import { getEnPosts, getPostURL, sortPosts } from '@/utils/post'

const HomePage = () => (
  <section>
    <h1 className="font-medium text-2xl mb-8 tracking-tighter">hi, I&apos;m Ken 👋</h1>
    <p className="leading-8 text-gray-600 prose prose-neutral dark:prose-invert">
      I&apos;m a frontend developer. I&apos;m currently developing some projects using React.
      <br />
      I&apos;m interested in web development. I like to build things on my own and learn how it
      works.
    </p>
    <div className="mt-16 sm:mt-32">
      <span className="text-lg mb-5 block font-medium sm:mb-4">Article</span>
      <div className="flex flex-col gap-7 sm:gap-4">
        {getEnPosts()
          .sort(sortPosts)
          .slice(0, 3)
          .map((post) => (
            <Link
              key={post._id}
              href={getPostURL(post)}
              className="-mx-3 flex flex-col rounded-md px-3 no-underline hover:bg-gray-100/60 dark:hover:bg-gray-200 sm:py-4"
            >
              <span className="mb-1">{post.title}</span>
              <span className="text-gray-600">{post.description}</span>
            </Link>
          ))}
      </div>
    </div>
    <div className="mt-16 sm:mt-32">
      <span className="text-lg mb-5 block font-medium sm:mb-4">More</span>
      <span>
        {'You can see more of my code on '}
        <Link
          href="https://github.com/Ken-HH24"
          className="underline underline-offset-2 text-gray-600"
        >
          GitHub
        </Link>
      </span>
    </div>
  </section>
)

export default HomePage
