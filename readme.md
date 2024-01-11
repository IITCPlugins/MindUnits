Mindunits
=========
An IITC-Plugin for the game Ingress.

This is an experimental Plugin. Maybe someday it will be useable out-of-the-box but not now!


What it does
============
Estiminate Field MUs.

It stores known fields in a database by checking for "created field" messages. Searches for the matching field on the map and stores it in a DB. 
Based on this data a density-map is created.
And finally this map is used to estiminate field MUs for any field.


Initialize
==========
Before it is usable it need some training data.  
It passivly collects data while your using IITC.
So this step isn't necessary but user usually want quick results even on a fresh start.

## To get some initial data
Find a "agent x create field " chat message with more than 100MUs. 
Make sure the field is visible on the map. Multilayers or double field can be tricky so best choice is a single field.

You can check if data was recognized by enable the "Field MUs" Layer or by checking the debug-dialog.
The "Field MUs" layer will display a small black number in the center of any known field.

the final step:
reload iitc or force a "train" in the debug dialog


Usage
=====
Activate the tool button.
When you move the mouse cursor over a field or a drawtool polygon you'll get popups like:  
![Screenshot](/assets/screenshot.png)

Values without a prefix were taken from DB. These are known fields.
"~" values are calculated. Hopefully with more testing we get closer to the real values.

It will show the calculated values next to the real values to check how good or bad current algorithm is.


Debug
=====
This is still just an experiment how to calculate mindunits.
There is a small dialog purposed for debugging. It shows how many "Known field" are in the database, how much S2Cells values were calculated. You can also display all stored field and learn s2-cells.
You should never need the "train" button but maybe the export list can be usfull for some experiments?

There are some more prefixes in the tooltip for debugging:
- "\~" calculated by trained cells
- "\~ \~" some cells were missing but approximations exists
- "\~ >" some covered cells had no value, real MU will be higher than this value
- "\~ ?" a mix of these before, so this value is most like to be false
- "\~ ? (x Mu)" no real data


Contribution
============
to build this plugin by yourself you need [yarn]

- open the folder in a terminal
- install required libraries with `yarn install`  (will be installed in a local subfolder)
- build the plugin: `yarn build`  
- result can be found in the "dist" folder
- or you use `yarn start` to run a local web-server. Open "http://localhost:8100" in your browser to install the local plugin

- while developing you can use the helper `yarn autobuild`. It will run the webserver and continuously rebuild the plugin on every change
(when using violentmonkey you don't even need to update it everytime)

- release builds (`yarn build:prod`) won't include log messages or source-maps.