Pick
========================================

### Pick fields from an object

`jq` retrieves named properties from objects by using `.` syntax:

    $ obj='{"foo": { "bar": "a value" }}'
    
    $ jq '.foo' <<< '{"foo": { "bar": "a value" }}'
    {
      "bar": "a value"
    }

Nested values are accessible as well:

    $ jq '.foo.bar' <<< '{"foo": { "bar": "a value" }}' 
    "a value"

### Pick elements from an array:

Elements in an array may be extracted by index:

    $ jq '.[1]' <<< '["snap","crackle","pop"]' 
    "crackle"

More than one index? No problem!

    $ jq '.[1, 2]' <<< '["snap","crackle","pop"]'
    "crackle"
    "pop"

We can even extract *all* elements at once by omitting the indices:

    $ jq '.[]' <<< '["snap","crackle","pop"]'
    "snap"
    "crackle"
    "pop"
    
Notice that this just prints the elements. If valid JSON is needed,
the extraction can be surrounded with square brackets:

    $ jq '[.[]]' <<< '["snap","crackle","pop"]'
    [
      "snap",
      "crackle",
      "pop"
    ]

