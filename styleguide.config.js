module.exports = {
  // set your styleguidist configuration here
  title: "Symphonia Documentation",
  // components: 'src/components/**/[A-Z]*.vue',
  // defaultExample: true,
  sections: [
    {
      name: "Views",
      description: "Documentation for the views",
      components: ["src/views/**/*.vue"]
    },

    {
      name: "Components",
      description: "Documentation for the components",
      components: ["src/components/**/*.vue"]
    },

    {
      name: "Helpers",
      description: "Documentation for global helper functions",
      components: ["src/mixins/**/*.js"]
    }
  ],
  theme: {
    color: {
      base: "black"
    }
  },
  // webpackConfig: {
  //   // custom config goes here
  // },
  exampleMode: "expand"
};
