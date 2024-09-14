export const url = (() => {
  switch (process.env.STAGE) {
    case 'prod':
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    case 'staging':
      return `https://${process.env.VERCEL_URL}`;
    case 'dev':
      return 'http://localhost:8080';
  }
})();
export const siteName = 'Kablamo!';
export const siteDescription =
  'A personal blog dedicated to sharing my programming projects, examples, news, and other oddities in technology.';
export const siteType = 'Person'; // schema
export const locale = 'en_EN';
export const lang = 'en';
export const skipContent = 'Skip to content';
export const author = {
  name: 'Rigoberto L. Perez',
  avatar: '/assets/images/blog/rlp-avatar.jpg',
  email: 'rlperez@kablamo.me',
  website: 'https://kablamo.me'
};
export const creator = {
  name: 'Rigoberto L. Perez',
  email: 'rlperez@kablamo.me',
  website: 'https://kablamo.me',
  social: 'https://github.io/rlperez'
};
export const pathToSvgLogo = 'src/assets/svg/misc/logo.svg'; // used for favicon generation
export const themeColor = '#ff4500'; //  Manifest: defines the default theme color for the application
export const themeBgColor = '#3e3e3e'; // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
export const opengraph_default = '/assets/images/template/opengraph-default.jpg'; // fallback/default meta image
export const opengraph_default_alt =
  'Visible content: An intro meta image to a blog entry about programming, technology, and news.'; // alt text for default meta image"
export const blog = {
  // RSS feed
  name: siteName,
  description: siteDescription,
  // feed links are looped over in the head. You may add more to the array.
  feedLinks: [
    {
      title: 'Atom Feed',
      url: '/feed.xml',
      type: 'application/atom+xml'
    },
    {
      title: 'JSON Feed',
      url: '/feed.json',
      type: 'application/json'
    }
  ],
  // Tags
  tagSingle: 'Tag',
  tagPlural: 'Tags',
  tagMore: 'More tags:',
  // pagination
  paginationLabel: 'Blog',
  paginationPage: 'Page',
  paginationPrevious: 'Previous',
  paginationNext: 'Next',
  paginationNumbers: true
};
export const details = {
  aria: 'section controls',
  expand: 'expand all',
  collapse: 'collapse all'
};
export const navigation = {
  navLabel: '',
  ariaTop: 'Main',
  ariaBottom: 'Complementary',
  ariaPlatforms: 'Platforms',
  drawerNav: true
};
export const themeSwitch = {
  title: 'Theme',
  light: 'light',
  dark: 'dark'
};
export const easteregg = true;
