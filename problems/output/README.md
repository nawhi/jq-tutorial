Output
========================================

`jq` doesn't have to return JSON. Other available formats include 
`@text` and `@base64`:

    $ jq '@text' <<<'{"hello": "world"}'
    "{\"hello\":\"world\"}"

    $ jq '@base64' <<<'{"hello": "world"}'
    "eyJoZWxsbyI6IndvcmxkIn0="

There is also an `@csv` output:

    $ products='[
        {"name": "Desk", "price": 75},
        {"name": "Sofa", "price": 200},
        {"name": "Bookshelf", "price": 40}
      ]'

    $ jq '.[] | [.name, .price] | @csv' <<<$products
    "\"Desk\",75"
    "\"Sofa\",200"
    "\"Bookshelf\",40"


Run by itself, this will still return each line as a string. To
produce valid CSV data, we would need to run `jq` with the `-r`
(`--raw-output`) option:

    $ jq -r '.[] | [.name, .price] | @csv' <<<$products
    "Desk",75
    "Sofa",200
    "Bookshelf",40


