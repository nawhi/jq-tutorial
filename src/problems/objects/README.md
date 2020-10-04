Constructing objects
========================================

`jq` can also be used to transform data. For instance, to construct a
single-element array with the contents of `currency`:

     $ price='{ "amount": 123, "currency": "ZWD" }'
     
     $ jq '[.currency]' <<<$price
     [
       "ZWD"
     ]

Constructing objects is very similar:

    $ jq '{ value: .amount } <<< $price
    {
      "value": 123
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


