# Create Capri

The easiest way to get started with Capri is by using `@capri-js/create`. This CLI tool enables you to quickly start building a new Capri site, with everything set up for you. You can create a new site using the default template, or by using one of the [official examples](https://github.com/capri-js/capri/tree/main/examples). To get started, use the following command:

```bash
npm init @capri
# or
yarn create @capri
# or
```

To create a new project in a specific folder, you can pass a name as argument argument

```bash
npm init @capri -- my-capri-site
# or
yarn create @capri my-capri-site
```

## Options

`@capri-js/create` comes with the following options:

- **-e, --example [name]|[github-url]** - An example to bootstrap the project with. You can use an example name from the [Capri repo](https://github.com/capri-js/capri/tree/main/examples) or a GitHub URL. The URL can use any branch and/or subdirectory.
- **--example-path &lt;path-to-example&gt;** - In a rare case, your GitHub URL might contain a branch name with a slash (e.g. bug/fix-1) and the path to the example (e.g. foo/bar). In this case, you must specify the path to the example separately: `--example-path foo/bar`
