# Software IDs

A small project for tracking known software ID specifications.

## Data format

Entries live in [`static/data/software_ids.json`](static/data/software_ids.json).
Each entry has the following fields:

- `name`: The full name of the scheme.
- `aliases`: Other names and abbreviations it's known by (may be empty).
- `derivation`: How an identifier is arrived at. Either `defined`, meaning it's
  assigned by a producer or a third party, or `inherent`, meaning it's derived
  from the thing being identified.
- `granularity`: What the scheme identifies, as a list, since several schemes
  identify more than one kind of thing. See the values below.
- `definition_url`: Where the scheme is specified.
- `description`: A short prose description.

The `granularity` values are:

| Value       | Meaning                                                        |
| ----------- | -------------------------------------------------------------- |
| `file`      | The contents of a single file                                  |
| `directory` | A file tree, such as a source tree                             |
| `revision`  | A single commit in a version control history                   |
| `snapshot`  | The state of a repository or collection at a point in time     |
| `release`   | A named release of a project, independent of how it's packaged |
| `build`     | A specific build output, such as a compiled binary             |
| `package`   | A versioned package as distributed by a package ecosystem      |
| `image`     | A container or system image                                    |
| `product`   | A product or product line, spanning versions                   |
| `install`   | Software as installed on a particular system                   |
| `bom`       | A bill of materials, or a component within one                 |

`derivation` and `granularity` are closed sets; adding a value to either means
also adding a case to `derivationName` or `granularityName` in
[`static/scripts/main.mjs`](static/scripts/main.mjs), or the site will render it
as "Unknown."
