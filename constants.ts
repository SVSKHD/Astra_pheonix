import { Post } from './types';

export const INITIAL_POSTS: Omit<Post, 'id'>[] = [
  {
    title: 'The Future of AI in Web Development',
    content: `
Artificial intelligence is no longer a futuristic concept; it's a present-day reality transforming industries, and web development is no exception. From automated coding to intelligent testing and personalized user experiences, AI is reshaping how we build and interact with websites and applications.

One of the most exciting advancements is the use of AI-powered code assistants. These tools, often integrated directly into IDEs, can suggest code snippets, complete lines, and even identify potential bugs in real-time. This not only speeds up the development process but also helps developers write cleaner, more efficient code.

Another area where AI is making a significant impact is in user experience (UX) design. AI algorithms can analyze user behavior to provide personalized content, product recommendations, and dynamic layouts. This level of personalization was once the domain of large tech companies, but it's becoming increasingly accessible to developers of all sizes.

Finally, AI is revolutionizing testing and deployment. Automated testing tools can intelligently crawl an application, identify edge cases, and report bugs with a level of detail that would be tedious for a human to replicate. This ensures higher quality software and more reliable deployments.

The integration of AI into web development is just beginning. As the technology continues to evolve, we can expect even more innovative tools and techniques that will push the boundaries of what's possible on the web.
    `,
    imageUrl: 'https://picsum.photos/seed/ai/1200/600',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: 'Artificial Intelligence',
    views: 0,
  },
  {
    title: 'A Deep Dive into Modern CSS',
    content: `
CSS has come a long way from simple color and font changes. Modern CSS is a powerful language with features that can create complex layouts and animations that were once only possible with JavaScript. Let's explore some of these game-changing features.

**CSS Grid and Flexbox:** These two layout modules have completely changed the way we build web layouts. Flexbox is perfect for one-dimensional layouts (like navigation bars), while Grid excels at complex two-dimensional arrangements. Together, they provide a robust and flexible system for creating responsive designs without the need for cumbersome floats or positioning hacks.

**Custom Properties (CSS Variables):** CSS Variables allow you to store values in one place and reuse them throughout your stylesheets. This is incredibly useful for theming, making it easy to change colors, fonts, or spacing across an entire site with just a few lines of code.

**Advanced Selectors:** Selectors like \`:is()\`, \`:where()\`, and \`:has()\` are making our CSS more concise and powerful. The \`:has()\` selector, in particular, is often referred to as the "parent selector" and opens up new possibilities for styling elements based on their children.

The world of CSS is constantly evolving. By staying up-to-date with these modern features, developers can write cleaner, more maintainable, and more powerful stylesheets.
    `,
    imageUrl: 'https://picsum.photos/seed/css/1200/600',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Web Development',
    views: 0,
  },
  {
    title: 'Mastering React Hooks',
    content: `React Hooks have revolutionized how we write components. This post explores useState, useEffect, useContext, and custom hooks to build more maintainable and readable React applications. We'll look at common patterns and pitfalls when managing state and side effects in a functional way.`,
    imageUrl: 'https://picsum.photos/seed/react/1200/600',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Web Development',
    views: 0,
  },
  {
    title: 'Generative AI: Beyond Text and Images',
    content: `While text and image generation are the most well-known applications of generative AI, the technology is capable of much more. This article delves into AI-generated music, code, 3D models, and even its role in accelerating scientific discoveries, showcasing the broad potential of creative machines.`,
    imageUrl: 'https://picsum.photos/seed/genai/1200/600',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Artificial Intelligence',
    views: 0,
  }
];