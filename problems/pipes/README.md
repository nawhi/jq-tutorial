Pipes (work-in-progress)
========================================

Being a stream-based processor, the area where `jq` gets really
powerful is in its ability to compose successive transformations
using the pipe operator (`|`).

In this example we take the `name` field from every element of:

    $ people='[
      { "name": "Dave", "age": 34, "occupation": "engineer" },
      { "name": "Ann", "age": 28, "occupation": "data scientist" },
    ]'
    
    $ jq '.[] | .name' <<< $person
    "Dave"
