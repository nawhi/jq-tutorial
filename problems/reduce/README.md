Reduce
========================================

### Reduce a list of values

The reduce method in `jq` is used to reduce an input array down to a
single value. Summing an array's values using `reduce` might follow:

    $ jq 'reduce .[] as $n (0; . + $n)' <<< '[1,2,3,4]'
    10

In this example, we assign each element in the input array to a variable
named `$n`. Then, starting with an initial value of `0`, we add the value
of each `$n` to the current "memo" value.

Note that this will produce the same output as using `jq`'s native `add`
method. In fact, many named methods depend on `reduce`:

    $ jq 'add' <<< '[1,2,3,4]'
    10
    
    $ jq 'min' <<< '[1,2,3,4]'
    1
    
    $ jq 'length' <<< '[1,2,3,4]'
    4

