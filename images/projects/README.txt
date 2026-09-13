Each project now supports MULTIPLE images (a cover shot + gallery), edited in src/data.ts
under that project's "images" array. Drop files into this folder using these exact names
(create as many or as few as you have — any missing file just shows a small placeholder
telling you its expected filename, it won't break the page):

BeverageHub:      beveragehub-01.webp   beveragehub-02.webp   beveragehub-03.webp   beveragehub-04.webp
Servify:          servify-01.png        servify-02.png (already included)   servify-03.png   servify-04.png
Pharmacy:         pharmacy-01.webp      pharmacy-02.webp      pharmacy-03.webp      pharmacy-04.webp
Travel Agency:    travel-01.webp        travel-02.webp        travel-03.webp        travel-04.webp
Task Manager:     task-manager-01.webp  task-manager-02.webp  task-manager-03.webp  task-manager-04.webp

The FIRST image listed for a project (…-01) is used as its cover photo in the WORK list.
ALL images in the array show up in that project's case-file "SCREENSHOTS" gallery.

Recommended: WebP or PNG, compressed, roughly 1600px wide or smaller.

Want more or fewer than 4 images for a project? Just add/remove entries in that project's
"images" array in src/data.ts — the gallery grid adapts automatically.
