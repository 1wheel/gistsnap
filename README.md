# gist-snap

snapshot thumbnails for bl.ocks.org

Install with 

    npm install -g gist-snap

Then, navigate to the directory with your gist and run: 

    gist-snap

This takes creates a `preview.png` and `thumbnail.png` of your `index.html` and commits/pushes them. 

gist-snap trys to play it safe - if you don't have an `index.html` in your folder, if the images files already exist in the folder, or if your local files aren't in sync origin/master, it will exit without modifying anything. 

If you've set up your bl.ocks to share common files, like [Let's Make a Block](https://bost.ocks.org/mike/block/) suggests, pass your user name to take a screen shot of bl.ocks directly:  

    gist-snap --user 1wheel

If you've got all of your gists in one folder, you can add images to all them in one go with: 

    for d in ./*/ ; do (cd "$d" && printf '\n%s\n' "${PWD##*/}" && gist-snap); done

