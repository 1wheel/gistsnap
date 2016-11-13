# gist-snap

snapshot thumbnails for [bl.ocks.org](http://bl.ocks.org/)

# Usage 

Install:

    npm install -g gist-snap

Then, navigate to the directory with your gist and run: 

    gist-snap

This takes creates a `preview.png` and `thumbnail.png` of your `index.html`, overwriting any existing images. 

Options: 

    --delay <delay> - milliseconds to wait before screenshot

# More scripts

[gistup](https://github.com/mbostock/gistup) is super handy for creating gists from the command line. 

The gist webapp can be pretty clunky, particularly when it trys to display datasets or libraries. To clone a gist from its bl.ocks page and have the folder name match the gist name, you can run this snippet in the devtools console and paste to the command line:

    var name = document.getElementsByTagName('h1')[0].innerHTML
    var id = window.location.pathname.split('/')[2]
    var remote = 'git@gist.github.com:' + id + '.git'

    copy(['git clone', remote, name].join(' '))

To clone and rename:

    var name = 'new-name' 
    var id = window.location.pathname.split('/')[2]
    var remote = 'git@gist.github.com:' + id + '.git'

    copy(['git clone', remote, name, '&& cd', name, '&& gistup-rename', name, '&& cd ..'].join(' '))

If you've got all of your gists in one folder, you can add images to all of them in one go with: 

    for d in ./*/ ; do (cd "$d" && printf '\n%s\n' "${PWD##*/}" && gist-snap); done