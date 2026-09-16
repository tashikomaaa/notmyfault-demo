# notmyfault demo

A tiny shop (cart, payments, search) with a real test suite, used to show [notmyfault](https://github.com/tashikomaaa/notmyfault) at work on real pull requests.

The test suite has the problems every project eventually has:

| Test | Problem |
|---|---|
| `payments > confirms card payments with the sandbox bank` | **Flaky.** The sandbox bank sometimes answers after the 100 ms timeout, so the test fails about one run in three. |
| `search > finds products regardless of accents` | **Broken on `main`**, by a commit that sped up the tokenizer and dropped accent handling. |
| `checkout > applies percentage discount codes` | Fine on `main`, **broken by [pull request #1](https://github.com/tashikomaaa/notmyfault-demo/pull/1)**. |
| `checkout > computes the total with VAT after the discount` | **Failed once** on `main`, when "Charge the reduced VAT rate on coffee beans" landed and was reverted. |

The [CI workflow](.github/workflows/ci.yml) runs the tests, then notmyfault in quarantine mode: the flaky test and the test already broken on `main` do not block pull requests, the real regression does.

## See it

Each open pull request shows a different state of the notmyfault comment:

| Pull request | What notmyfault says |
|---|---|
| [#1 Support fixed-amount discount codes](https://github.com/tashikomaaa/notmyfault-demo/pull/1) | A **new failure** caused by the change, next to the test already failing on `main` and the flaky test. Quarantine blocks the merge. |
| [#2 Charge the reduced VAT rate on coffee beans, again](https://github.com/tashikomaaa/notmyfault-demo/pull/2) | A **suspect** failure: the same change broke that test once on `main` before it was reverted. Quarantine blocks the merge. |
| [#3 Explain how to run the tests](https://github.com/tashikomaaa/notmyfault-demo/pull/3) | Failures, **none of them the change's fault**. Quarantine lets the check pass. |
| [#4 Find products regardless of accents again](https://github.com/tashikomaaa/notmyfault-demo/pull/4) | Fixes the test broken on `main`, which the comment lists as **fixed**. The flaky test failed, passed on a re-run, and the comment turned **green**. |
| [#6 Load search synonyms on every query](https://github.com/tashikomaaa/notmyfault-demo/pull/6) | Tests still pass, but one got much **slower** than on `main`: 1.2 s instead of 1 ms. |

The flaky payment test also has its own issue, [#5](https://github.com/tashikomaaa/notmyfault-demo/issues/5), which notmyfault opened and keeps up to date because the workflow sets `flaky-issues: true`.

- **[Workflow runs](https://github.com/tashikomaaa/notmyfault-demo/actions)**: the job summaries include the most unreliable tests.
- **[History branch](https://github.com/tashikomaaa/notmyfault-demo/tree/notmyfault-history)**: what notmyfault remembers.

## License

MIT
