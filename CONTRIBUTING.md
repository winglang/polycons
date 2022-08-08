# Contributing to Polycons

Thank you for wanting to contribute to polycons! This will guide you through everything you need to know to make changes 
and submit Pull Requests to the GitHub repository.

## Opening Issues

One of the easiest ways to contribute to this project is by opening [Issues](https://github.com/monadahq/polycons/issues/new).
If you're reporting a bug, try to include detailed information including steps to reproduce it, and what you expected to happen.
If you're suggesting a feature or enhancement, please include information about your use case for it.

## Getting Started

Begin by forking the repository. You can do this using the [Fork](https://github.com/mbonig/so-notifier/fork) button in 
GitHub. If you already have a fork of the polycons repository that is out of sync, you can update it on your fork's 
GitHub page using [Sync Fork].

[Sync Fork]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork
Clone your fork locally using your favorite method. If you're using the git cli, you can do it like this:

```shell
$ git clone git@github.com:<your user>/polycons.git
```

## Installing Dependencies

Install the dependencies needed with NPM:

```shell
$ npm i
```

## Building

Building this project is accomplished by running the build script:

```shell
$ npm run build
```

This will build the project, generate the docs, lint the code, and run tests.

## Testing

Any changes that you make to this project should be covered with tests. If you are adding new constructs to the 
library create a new file under the `test/` directory.

This project uses [jest](https://jestjs.io/) testing framework. Please refer to the documentation on it if you are not 
familiar with it. 

When writing tests, group together common functionality under test using a `describe` function. Individual tests are 
written in `it` functions. For example:

```typescript
describe("a polycon", () => {

  it("cannot be instantiated without a factory", () => {
    const app = new App();
    expect(
      () => new Dog(app, "dog", { name: "piffle", treats: 5 })
    ).toThrowError(/Cannot find a Polycon factory \(directly or indirectly\)/);
  });

  it("cannot be instantiated if the registered factory does not support it", () => {
    const app = new App();
    Polycons.register(app, new PoodleFactory());
    expect(() => new Cat(app, "cat", { scritches: 5 })).toThrowError(
      /Type test\.cat not implemented/
    );
  });

});
```

All changes need to have tests. Feature changes should have full test coverage and bug fixes should be verified first
through new tests. 

All tests can be run using the `test` script:

```shell
$ npm run test
```

During a lot of active development you may find it useful to watch for changes and automatically re-run the tests:

```shell
$ npm run test:watch
```

## Updating the README

Changes in core functionality should include changes to the README.md file explaining the functional changes. Plesae 
consider this when submitting changes. If you feel there is no need to change the README or documentation,
state your reason when submitting the Pull Request. A lack of updates to the README may cause a delay in a Pull Request 
being merged.

## Submitting a Pull Request

To ensure Pull Requests are reviewed and accepted as quickly as possible, please make sure:

[ ] Tests are written for all changes.
[ ] README.md is updated if new features are being added.
[ ] `npm run build` has been run to lint, build, and update API docs.
[ ] Commit messages are clear and descriptive and pushed to your fork.
[ ] Your fork is in sync with the upstream repository.

Create a new Pull Request [here](https://github.com/monadahq/polycons/compare), selecting your fork for the 'compare' 
and `main` for the 'base'. 

The title of the Pull Request should adhere to [conventional commits](https://www.conventionalcommits.org). For example, 
if you're adding new features, the Pull Request title should start with `feat:`. If you are fixing a bug, then `fix:` 
should be the title prefix.

In the description reference any open Issues that the changes resolve. Describe the changes you made and include anything
you think would be useful for a reviewer to know.

## Getting Help

If you need help in contributing to this project please join our [Discord server](https://discord.gg/5KP9KNcB) where 
people are waiting to help in the #help channel.
