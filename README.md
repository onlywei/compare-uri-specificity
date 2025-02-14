# compare-uri-specificity

A helper function to compare the specificity of URIs, routes, and paths.

## Installation

```bash
npm install compare-uri-specificity
```

## Usage

```ts
import { compareUriSpecificity } from 'compare-uri-specificity';

// Different segment lengths
compareUriSpecificity('/foo/bar', '/foo');     // 1 (first is more specific)
compareUriSpecificity('/foo', '/foo/bar');     // -1 (first is less specific)
compareUriSpecificity('/a/b/c', '/x/y');       // 1 (first is more specific)

// Wildcards vs concrete paths
compareUriSpecificity('/foo/bar', '/foo/*');   // 1 (concrete path is more specific)
compareUriSpecificity('/foo/*', '/foo/bar');   // -1 (wildcard is less specific)

// Partial segment matches
compareUriSpecificity('/foo', '/food');        // -1 (shorter segment is less specific)
compareUriSpecificity('/food', '/foo');        // 1 (longer segment is more specific)

// Equal specificity
compareUriSpecificity('/foo/bar', '/foo/baz'); // 0 (equal specificity)
compareUriSpecificity('/foo/', '/foo');        // 0 (trailing slashes ignored)

// Error handling
compareUriSpecificity('foo//bar', '/foo');     // throws Error: Invalid URI format
compareUriSpecificity('/foo', null);           // throws Error: URI must be a string
```
