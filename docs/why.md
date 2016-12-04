The simple answer is "Because I need it". 

On a daily basis I'm copying back and forth qvw and data files between our dev server and prod and test environments. This doesn't consume a lot of time 
to be honest but it's boring. Also I wanted to be able to deploy to both environments at the same time and also wanted to have the option to "test" the scripts (mine and my colleagues ones) 
for some basic stuff (local paths for example [ths will be available in the next version])

Started with batch files but this have it's own disadvantages. And this is where `Gulp` came in the picture. With `Gulp` is much easier to set the workflow I've needed (and also was a good case to do something more bigger with `Gulp`) 