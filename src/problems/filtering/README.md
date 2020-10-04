Filtering arrays
========================================

The `select` filter helps separate the wheat from the chaff. The
rule is simple: when an item passes, `select` returns it; when it
fails, no output comes back.

It is useful when applied to arrays:

    $ products='[
       {"name": "teapot", "price": 15}, 
       {"name": "spoon", "price": 4}, 
       {"name": "bowl", "price": 9}
      ]'

    $ jq '.[] | select(.price < 10)' <<<$products
    {
      "name": "spoon",
      "price": 4
    }
    {
      "name": "bowl",
      "price": 9
    }


When valid JSON is needed, it can be combined with `map`:
    
    $ jq 'map(select(.price < 10))' <<<$products
    [
      {
        "name": "spoon",
        "price": 4
      },
      {
        "name": "bowl",
        "price": 9
      }
    ]

