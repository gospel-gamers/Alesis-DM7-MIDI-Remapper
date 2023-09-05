# Alesis DM7 MIDI Remapper

**License**

The source code is public under the MIT License. 

**About**

The recording DAW Logic Pro X allows its users write custom JavaScript code into their MIDI FX to change the behaviour of incoming MIDI notes.
I wrote this custom-script to use my electronic drum set with a `tongue drum` **VST (Virtual Studio Plugin)**. Now I can use my electronic kit 
to play any scale I programmed in any key that I want. Customize this however you like for any MIDI capable device within Logic Pro X!

**What does this code script do?**

This custom-script remaps incoming MIDI notes from the Alesis DM7 electronic drum kit so that I can use my kit to play meaningful scales with `VST plugins` 
that do not have a MIDI remapping feature. Currently I use this to play a handpan with this free `VST`:

- https://www.amplesound.net/en/pro-pd.asp?id=27

**For the future**
Long term I want to turn this into an actual `VST plugin` itself in `C#` code, but for now just adjust the incoming notes to whatever your MIDI device puts in. 
Adjust the outgoing notes and kit that I created however you want to make it work for you.
