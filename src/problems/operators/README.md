Operators
========================================

`jq` has a variety of operators that will be familiar from most mainstream 
programming languages, including arithmetic:

    $ invoice='{
        "subtotal": 125,
        "tax": 12.5,
        "fee": 10
      }'
    
    $ jq '{ total: (.subtotal + .tax + .fee) }' <<< $invoice
    {
      "total": 147.5
    }
        
    $ jq '{ percentageTax: (.tax / .subtotal * 100) }' <<< $invoice
    {
      "percentageTax": 10
    }

Note the parentheses, without which you will get a syntax error.

The `+` operator can be used to merge objects and concatenate arrays:

    $ jq '. + [3, 4]' <<< '[1, 2]'
    [
      1,
      2,
      3,
      4
    ]

    $ jq '. + { "awesome": true }' <<< '{ "brilliant": "yes" }'
    {
      "brilliant": "yes",
      "awesome": true
    }

For objects, the `+` operator will override if a key conflict is encountered:

    $ jq '. + { "brilliant": true }' <<< '{ "brilliant": "yes" }'
    {
      "brilliant": true
    }

There are also the standard equality operators `==` and `!=` as well as
 inequality operators `>`, `<`, `>=`, `<=`, which do what you'd expect.
  
Another useful operator is `//`, which can be used to provide a default 
if a value is `false` or `null`:

    $ game='{"name": "Super Mario Bros"}'
    
    $ jq '{ name, description: (.description // "None provided") }' <<< $game
    {
      "name": "Super Mario Bros",
      "description": "None provided"
    }
