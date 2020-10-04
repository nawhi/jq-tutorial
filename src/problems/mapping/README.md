Mapping arrays
========================================

The `map` filter transforms each item of an input array to produce
an output array. For example, a simple map to select the price of
each entry in a list of products would look like:

    $ products='[
        {"name": "teapot", "price": 15}, 
        {"name": "spoon", "price": 4}
      ]'

    $ jq 'map(.price)' <<< $products
    [ 
        15, 
        4 
    ]

`map` functions may be built from other jq operators and methods.

    $ jq 'map({ name, isExpensive: (.price > 10) })' <<< $products
    [
      {
        "name": "teapot",
        "isExpensive": true
      },
      {
        "name": "spoon",
        "isExpensive": false
      }
    ]


