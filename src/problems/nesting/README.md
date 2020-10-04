Nesting
========================================

Recall that you can extract members from objects using the `.` operator, and
elements from arrays with the `[]` operators.

The two operators can also be combined:

    $ people='[ 
        { "name": "dave" }, 
        { "name": "alice" }
      ]'

    $ jq '[.[].name]' <<< $people
    [
      "dave",
      "alice"
    ]

    $ people2='{
        "dave": {"friends": ["alice", "jane"]},
        "alice": {"friends": ["jane", "dan"]}
      }'
    
    $ jq '.dave.friends[]' <<< $people2
    "alice"
    "jane"

This might come in handy when things get a bit more complicated.
