# Flow / TypeScript Auto-Type

Placeholder for future plans for automatically adding flowtypes / TypeScript declarations by using runtime introspection. Not even remotely close to being anywhere near functional.

The rough plan for an initial version is:

- A Babel plugin that adds calls on each method to capture all parameters, distilling them into their primitive types.
- A library that logs these types in an append-only log file (maybe just a .csv or SQLite database).
  - Balance here of avoiding millions of duplicate calls via argument hashing and duplicate removal, and extra overhead / memory usage.
- An analyzer that takes these calls and generates type information based off the common types passed in.
- A merge step that analyzes each new type discovered and sees if an existing type can be used for this.
  - This should be able to discover any existing types in a codebase.
- An output step that generates binding files for each file.

The next step would be to go beyond binding files -- the same concept would exist, but for all variable declarations and function expressions and such.
Then the output step would be rewriting the existing file with new TS type information.
