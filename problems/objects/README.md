Constructing objects
========================================

`jq` retrieves named properties from JSON objects by using `.` syntax:

    $ json='{"foo": { "bar": "a value" }}'
    
    $ jq '.foo' <<< $json
    {
      "bar": "a value"
    }

Nested values are accessible as well:

    $ jq '.foo.bar' <<< $json
    "a value"

`jq` can also be used to transform data. For instance, to construct a
single-element object with the contents of `currency`:

    
    $ jq '{ myval: .foo.bar } <<< $json
    {
      "myval": "a value"
    }

There's a handy shortcut for carrying a key-value pair to the output
object: if a key is referenced *without* a value or the `.` selector,
it will be copied into the output object:

    $ dave='{ "name": "Dave", "height": 180, "age": 34 }'
    
    $ jq '{ name, height }' <<< $dave
    {
      "name": "Dave",
      "height": 180,
    }
    


