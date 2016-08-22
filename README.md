# gist-snap

snapshot thumbnails for [bl.ocks.org](http://bl.ocks.org/)

# Usage 

Install:

    npm install -g gist-snap

Then, navigate to the directory with your gist and run: 

    gist-snap

This takes creates a `preview.png` and `thumbnail.png` of your `index.html` and commits/pushes them. 

gist-snap is conservative - if you don't have an `index.html` in your folder, if the images files already exist, or if your local files aren't in sync with origin/master, it will exit without modifying anything. 

If you've set up your bl.ocks to share common files, like [Let's Make a Block](https://bost.ocks.org/mike/block/) suggests, pass your user name to take a screen shot of bl.ocks directly:  

    gist-snap --user 1wheel

If you've got all of your gists in one folder, you can add images to all of them in one go with: 

    for d in ./*/ ; do (cd "$d" && printf '\n%s\n' "${PWD##*/}" && gist-snap); done

# More scripts

[gistup](https://github.com/mbostock/gistup) is super handy for creating gists from the command line. 

The gist webapp can be pretty clunky, particularly when it trys to display datasets or libraries. To clone a gist from its bl.ocks page and have to folder name match the gist name, you can run this snippet in the devtools console and paste to the command line:

    var name = document.getElementsByTagName('h1')[0].innerHTML
    var id = window.location.pathname.split('/')[2]
    var remote = 'git@gist.github.com:' + id + '.git'

    copy(['git clone', remote, name].join(' '))

To clone and rename:

    var name = 'new-name' 
    var id = window.location.pathname.split('/')[2]
    var remote = 'git@gist.github.com:' + id + '.git'

    copy(['git clone', remote, name, '&& cd', name, '&& gistup-rename', name, '&& cd ..'].join(' '))
