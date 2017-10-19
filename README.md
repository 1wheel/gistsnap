# gistsnap

snapshot thumbnails for [bl.ocks.org](http://bl.ocks.org/)

# Usage 

Install:

    npm install -g gistsnap

Then, navigate to the directory with your gist and run: 

    gistsnap

This takes creates a `preview.png` and `thumbnail.png` of your `index.html`, overwriting any existing images. 

Options: 

    --delay <delay> - milliseconds to wait before screenshot
    --hidden - start nightmarejs with {show: false}

# More scripts

- [gistup](https://github.com/mbostock/gistup) is super handy for creating gists from the command line. 
- [gistclone](https://github.com/1wheel/gistclone) clone bl.ocks without waiting for the clucky gist webapp. 