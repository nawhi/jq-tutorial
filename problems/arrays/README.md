Arrays
========================================

Arrays in `jq` work similarly to objects. 
For instance, to construct a single-element array with the contents of `currency`:

     $ price='{ "amount": 123, "currency": "ZWD" }'
     
     $ jq '[.currency]' <<<$price
     [
       "ZWD"
     ]

Elements in an array may be extracted by index:
    
    $ sounds='["snap","crackle","pop"]'

    $ jq '.[1]' <<< $sounds
    "crackle"

More than one index? No problem!

    $ jq '.[1, 2]' <<< $sounds
    "crackle"
    "pop"

Python-style slicing is also supported:

    $ jq '.[-1]' <<< $sounds
    "pop"
   
    $ jq '.[1:]' <<< $sounds
    [
      "crackle",
      "pop"
    ]


We can even extract *all* elements at once by omitting the indices:

    $ jq '.[]' <<< $sounds
    "snap"
    "crackle"
    "pop"
    
Notice that this just prints the elements. If valid JSON is needed,
we can construct an array by surrounding the extraction with square brackets:

    $ jq '[.[]]' <<< $sounds
    [
      "snap",
      "crackle",
      "pop"
    ]
