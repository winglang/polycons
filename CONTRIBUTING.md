# Contributing to Polycons

Thank you for wanting to contribute to polycons. This will guide you through everything you need to know to make changes 
and submit Pull Requests to the GitHub repository.

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

Install the dependencies needed using yarn.

> :orange_book: You can install yarn with `npm i -g yarn`

```shell
$ yarn
```

## Testing

Any changes that you make to the polycons library should be covered with tests. If you are adding new constructs to the 
library create a new file under the `test/` directory. The test's filename should match the file being tested but with 
a .test.ts suffix. For example, polycon-factory.ts would have all of its tests in polycon-factory.test.ts.

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

## Linting

To keep the code clean a set of eslint rules are in place. Linting errors can be found by running the eslint script:

```shell
$ yarn eslint
```

This will automatically fix any issues that it can and report any issues that it can't. Please fix all linting errors
before submitting Pull Requests. Linting errors will block Pull Requests from being merged.

## Updating the README

Changes in core functionality should include changes to the README.md file explaining the functional changes. Plesae 
consider this when submitting changes. If you feel there is no need to change the README or documentation,
state your reason when submitting the Pull Request. A lack of updates to the README may cause a delay in a Pull Request 
being merged.

## Updating the API docs

API docs are generated automatically from code. Make sure to run the update process before submitting a Pull Request:

```shell
$ yarn build
```

Failure to update the docs will cause a delay in merging the Pull Request.

## Getting Help

If you need help in contributing to this project please join our [Discord server](https://discord.gg/5KP9KNcB) where 
people are waiting to help in the #help channel.
