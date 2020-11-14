/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

export const onRouteUpdate = ({ location }) => {
  const { hash } = location;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) {
      const elemRect = el.getBoundingClientRect();
      const topPos = elemRect.top + window.pageYOffset;

      window.scrollTo({
        top: topPos - 50, // scroll so that the element is at the top of the view
        // behavior: 'smooth' // smooth scroll
      });
    }
  }
};
