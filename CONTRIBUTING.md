# Contributor Guidelines

Welcome! We're glad you're interested in contributing! We welcome contributions from people of all backgrounds who are interested in making great software with us.

## Issues

### Feature Requests

If you have ideas or how to improve our projects, you can suggest features by opening a GitHub issue. Make sure to include details about the feature or change, and describe any uses cases it would enable.

Feature requests will be tagged as `enhancement` and their status will be updated in the comments of the issue.

### Bugs

When reporting a bug or unexpected behavior in a project, make sure your issue describes steps to reproduce the behavior, including the platform you were using, what steps you took, and any error messages.

Reproducible bugs will be tagged as `bug` and their status will be updated in the comments of the issue.

### Wontfix

Issues will be closed and tagged as `wontfix` if we decide that we do not wish to implement it, usually due to being misaligned with the project vision or out of scope. We will comment on the issue with more detailed reasoning.

## Contribution Workflow

### Open Issues

If you're ready to contribute, start by looking at our open issues tagged as [`help wanted`](../../issues?q=is%3Aopen+is%3Aissue+label%3A"help+wanted") or [`good first issue`](../../issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue").

You can comment on the issue to let others know you're interested in working on it or to ask questions.

### Making Changes

1. Fork the repository.

2. Create a new feature branch.


##### To start running the npm package locally:
```
npm run build
```
```
npm link
```
In another terminal:
```
cd demo
```
```
npm link nextjs-cli
```
```
nextjs-cli <command>
```

##### While developing, to see local changes you need to update the build. Go to root directory:
```
npm run build
```


3. Make your changes. Ensure that there are no build errors by running the project with your changes locally.

4. Open a pull request with a name and description of what you did. You can read more about working with pull requests on GitHub [here](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork).

5. A maintainer will review your pull request and may ask you to make changes.

## Code Guidelines

### JavaScript & TypeScript

We use [Prettier](https://prettier.io/) with the default settings to auto-format our JavaScript and TypeScript code.

## Licensing

Unless otherwise specified, all open source projects shall comply with the MIT license.

## Contributor Terms

Thank you for your interest in our open source project. By providing a contribution (new or modified code, other input, feedback or suggestions etc.) you agree to these Contributor Terms.

You confirm that each of your contributions has been created by you and that you are the copyright owner. You also confirm that you have the right to provide the contribution to us and that you do it under the MIT license.

If you want to contribute something that is not your original creation, you may submit it to us separately from any contribution, including details of its source and of any license or other restriction (such as related patents, trademarks,  agreements etc.)

Please also note that our projects are released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md) to ensure that they are welcoming places for everyone to contribute. By participating in any 10x AI open source project, you agree to keep to the Contributor Code of Conduct.
