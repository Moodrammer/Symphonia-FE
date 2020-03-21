module.exports = {
  // set your styleguidist configuration here
  title: "Symphonia Documentation",
  // components: 'src/components/**/[A-Z]*.vue',
  // defaultExample: true,
  sections: [
    {
      name: 'Views',
      description: 'Documentation for the views',
      components: ['src/views/**/*.vue']
    },

    {
      name: 'Components',
      description: 'Documentation for the components',
      components: ['src/components/**/*.vue']
    }
  ],
  // webpackConfig: {
  //   // custom config goes here
  // },
  exampleMode: "expand"
};
