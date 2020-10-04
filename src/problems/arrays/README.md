Arrays
========================================

Declaring an array has analogous syntax to declaring an object. 
For instance, to construct a single-element array with the contents of `currency`:

     $ price='{ "amount": 123, "currency": "ZWD" }'
     
     $ jq '[.currency]' <<<$price
     [
       "ZWD"
     ]
     
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