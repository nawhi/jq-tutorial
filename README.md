# jq tutorial

[jq][0] is an awesome command-line utility for processing JSON data. It has an [excellent manual][1] already, but--since there's no substitute for practice-- this tutorial provides an unofficial supplement for new users exploring its syntax and applications.

This version is a fork of rjz's [original][5] with a slightly expanded set of lessons and a few tweaks to the 'gameplay'.

### Running the tutorial  

1. [Download and install][2] jq. Make sure `jq --version` outputs `jq-1.6`.

2. Clone the repo:

    $ git clone https://github.com/nawhi/jq-tutorial 

3. On first download you will need to install the dependencies:

    $ yarn install --production
    
4. Run it with `yarn start`. You'll subsequently pass an argument to the same command to tell it which lesson you want to do.

5. Progress is saved in a file. If you want to start again, run `yarn erase-progress`.

### Attribution

  * jq copyright (C) 2012 [Stephen Dolan][3]
  * heavy inspiration from from Rod Vagg's [workshopper][4]
  * this tutorial originally released by [rjz][5] under MIT license

### License

MIT

[0]: http://stedolan.github.io/jq "jq"
[1]: http://stedolan.github.io/jq/manual "jq Manual"
[2]: http://stedolan.github.io/jq/download/ "Download jq"
[3]: https://github.com/stedolan
[4]: https://github.com/rvagg/workshopper "Workshopper"
[5]: https://github.com/rjz/jq-tutorial "rjz/jq-tutorial - GitHub"
