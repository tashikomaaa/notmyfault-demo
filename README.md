# notmyfault demo

A tiny shop (cart, payments, search) with a real test suite, used to show [notmyfault](https://github.com/tashikomaaa/notmyfault) at work on real pull requests.

The test suite has the problems every project eventually has:

| Test | Problem |
|---|---|
| `payments > confirms card payments with the sandbox bank` | **Flaky.** The sandbox bank sometimes answers after the 100 ms timeout, so the test fails about one run in three. |
| `search > finds products regardless of accents` | **Broken on `main`**, by a commit that sped up the tokenizer and dropped accent handling. |
| `checkout > applies percentage discount codes` | Fine on `main`, **broken by a pull request**. |

The [CI workflow](.github/workflows/ci.yml) runs the tests, then notmyfault in quarantine mode: the flaky test and the test already broken on `main` do not block pull requests, the real regression does.

## See it

- **[Open pull requests](https://github.com/tashikomaaa/notmyfault-demo/pulls)**: each has a notmyfault comment explaining every failure.
- **[Workflow runs](https://github.com/tashikomaaa/notmyfault-demo/actions)**: the job summaries include the most unreliable tests.
- **[History branch](https://github.com/tashikomaaa/notmyfault-demo/tree/notmyfault-history)**: what notmyfault remembers.

## License

MIT
